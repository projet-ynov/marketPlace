import "../MyAnnonces/MyAnnonces.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getMyFavorites, removeFavorite} from "../../../services/req.tsx";

function MyFavorites() {
    const [articles, setData] = useState<Annonce[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMyFavorites();
            if(response){
                setData(response);
            }
            setLoading(false)
        };
        setLoading(true)
        fetchData();
    }, []);

    if(!articles){
        return null
    }

    const handleClick = (detailsId: string) => {
        navigate(`/details/${detailsId}`);
    };

    const handleDelFav = (idAnnonce: string) => {
        removeFavorite(idAnnonce)
    }

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                articles && articles.length > 0 ? (
                    <div className={"containerMyAnnonces"}>
                        {articles.map((article) => (
                            <div className={"flexMyAnnonces"}  >
                                <div className={"divAnnonceListe"} onClick={() => handleClick(article._id)}>
                                    <img src={"data:image/png;base64," + article.images[0].image}/>
                                    <p className={"title"}>{article.title} </p>
                                    <p className={"price"}>{article.price}</p>
                                </div>
                                <button type={"button"} onClick={() => handleDelFav(article._id)}>Supprimer</button>
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

export default MyFavorites;