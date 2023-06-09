import "./MyAnnonces.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {deleteAnnonce, getMyAnnonce} from "../../../services/req.tsx";

function MyAnnonces({idUser}: { idUser: string }) {

    const [articles, setData] = useState<Annonce[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [idAnnonce, setIdAnnonce] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const myAnnonces = await getMyAnnonce()
            if (myAnnonces) {
                setData(myAnnonces);
            }
            setLoading(false)
        };
        setLoading(true)
        fetchData();
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("idUser")) {
            const token = sessionStorage.getItem("idUser")
            if (token) {
                if (JSON.parse(token) == idUser) {
                    setIsConnected(true)
                } else {
                    setIsConnected(false)
                }
            }
        }
    }, []);

    if (!articles) {
        return null
    }

    const handleClick = (detailsId: string) => {
        navigate(`/details/${detailsId}`);
    };

    const handleEdit = (annonce: Annonce) => {
        if (sessionStorage.getItem('annonce') == null) {
            sessionStorage.setItem('annonce', JSON.stringify(annonce))
            navigate(`/edit`);
        } else {
            sessionStorage.removeItem('annonce');
            sessionStorage.setItem('annonce', JSON.stringify(annonce))
            navigate(`/edit`);
        }
    };

    const handleDeleteConfirmOpen = (idAnnonce: string) => {
        setIdAnnonce(idAnnonce);
        setOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
            deleteAnnonce(idAnnonce)
            window.location.reload()
        }

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                articles && articles.length > 0 ? (
                    <div className={"containerMyAnnonces"}>
                        {articles.map((article) => (
                            (article.status == 0 && (
                                <div className={"flexMyAnnonces"}>
                                    <div className={"divAnnonceListe"} onClick={() => handleClick(article._id)}><img
                                        src={"data:image/png;base64," + article.images[0].image}/>
                                        <p className={"title"}>{article.title} </p>
                                        <p className={"price"}>{article.price} €</p>
                                    </div>
                                    {isConnected ? (
                                        (<div>
                                            <button type={"button"} onClick={() => handleEdit(article)}>Edit</button>
                                            <button type={"button"}
                                                    onClick={() => handleDeleteConfirmOpen(article._id)}>Supprimer
                                            </button>
                                        </div>)
                                    ) : ""}

                                </div>
                            ))
                        ))}
                    </div>
                ) : (
                    <p>Aucune annonce trouvée.</p>
                )
            )}

            <Dialog
                open={open}
                onClose={handleDeleteConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer l'annonce ?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleDeleteConfirmClose}>Annuler</Button>
                    <Button onClick={handleConfirmDelete}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default MyAnnonces;