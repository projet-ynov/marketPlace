import "../myAnnonces/MyAnnonces.css"
import {useEffect, useState} from "react";
import {getAcheter} from "../../../services/req.tsx";

function BuyTabs() {

    const [articles, setData] = useState<AnnoncesVendu[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            const annonceAcheter = await getAcheter()
            if (annonceAcheter) {
                setData(annonceAcheter);
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
                articles  ? (
                    <div className={"containerMyAnnonces"}>
                        {articles.map((article) => (
                            <div className={"flexMyAnnonces"}>
                                <div className={"divAnnonceListe"} ><img
                                    src={"data:image/png;base64," + article.annonce.images[0].image}/>
                                    <p className={"title"}>{article.annonce.title} </p>
                                    <p className={"price"}>{article.annonce.price} €</p>
                                    <p className={"title"}>vendeur : {article.annonce.profilUser.username}</p>
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

export default BuyTabs;


