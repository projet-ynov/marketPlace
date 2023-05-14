import "./MyAnnonces.css"
import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {useNavigate} from "react-router-dom";


function MyAnnonces({idUser}: { idUser: string }) {

    const [articles, setData] = useState<Annonce[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            const fetchData = async () => {
                const response = await axios.get<Annonce[]>(`http://localhost:3000/myAnnonces/${idUser}`,
                    {
                        headers: {
                            Authorization: token,
                        }
                    });
                setData(response.data);
                setLoading(false)
            };

        setLoading(true)
        fetchData();
        }
    }, [idUser]);

    if (!articles) {
        return null
    }

    const handleClick = (detailsId: string) => {
        navigate(`/details/${detailsId}`);
    };

    const handleEdit = (annonce: Annonce) => {
            if(sessionStorage.getItem('annonce') == null){
                sessionStorage.setItem('annonce', JSON.stringify(annonce))
                navigate(`/edit`);
            }else {
                console.log("yuhnji")
                sessionStorage.removeItem('annonce');
                sessionStorage.setItem('annonce', JSON.stringify(annonce))
                navigate(`/edit`);
            }

    };


    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                articles && articles.length > 0 ? (
                    <div className={"containerMyAnnonces"}>
                        {articles.map((article) => (
                            <div className={"flexMyAnnonces"}>
                                <div className={"test"} onClick={() => handleClick(article._id)}><img
                                    src={"data:image/png;base64," + article.images[0].image}/>
                                    <p className={"title"}>{article.title} </p>
                                    <p className={"price"}>{article.price}</p>
                                </div>
                                <button type={"button"} onClick={() => handleEdit(  article)}>Edit</button>
                                <button type={"button"}>Supprimer</button>
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

export default MyAnnonces;