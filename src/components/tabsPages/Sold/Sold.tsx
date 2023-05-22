import "../myAnnonces/MyAnnonces.css"
import {useEffect, useState} from "react";
import {getVendu} from "../../../services/req.tsx";

function Sold() {

    const [articles, setData] = useState<AnnoncesVendu[]>([]);
    const [loading, setLoading] = useState(true);



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
                                    src={"data:image/png;base64," + article.annonce.images[0].image}/>
                                    <p className={"title"}>{article.annonce.title} </p>
                                    <p className={"price"}>{article.annonce.price} €</p>
                                    <p className={"title"}>acheteur: {article.user.username}</p>
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

export default Sold;


