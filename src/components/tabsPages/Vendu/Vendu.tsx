import "../myAnnonces/MyAnnonces.css"
import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {getAcheter, getVendu} from "../../../services/req.tsx";

function Vendu() {

    const [articles, setData] = useState<Annonce[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const annonceVendu = await getVendu()
            if (annonceVendu) {
                setData(annonceVendu);
            }
            setLoading(false)

        }
        fetchData()

    }, []);


    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                articles && articles.length > 0 ? (
                    <div className={"containerMyAnnonces"}>
                        {articles.map((article) => (
                            <div className={"flexMyAnnonces"}>
                                <div className={"divAnnonceListe"} ><img
                                    src={"data:image/png;base64," + article.images[0].image}/>
                                    <p className={"title"}>{article.title} </p>
                                    <p className={"price"}>{article.price} €</p>
                                </div>


                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune annonce trouvée.</p>
                )
            )}


        </>
    )
}

export default Vendu;


