import './Articles.css'
import Details from "../articlesDetails/Details.tsx";
import NavBar from "../../components/navBar/NavBar.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getArticles} from "../../services/req.tsx";

function Articles() {


    const [data, setData] = useState<Annonce[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const articles = await getArticles()
            setData(articles)
        };

        fetchData();
    }, []);

    const handleClick = (detailsId: string) => {
        navigate(`/details/${detailsId}`);
    };


    const handleSearch = (data:any) => {
        if (data[0].data !== undefined) {
            setData(data[0].data);
        } else {
            setData(data)
        }
    };


    return (
        <>
            <NavBar handleSearch={handleSearch} dataRes={data}/>
            <div className="container">
                {data.map((article, index) => (
                    (article.status == 0 && (
                        <div key={index} className="articles" onClick={() => handleClick(article._id)}>
                            <Details{...article}/>
                        </div>
                    ))
                ))}
            </div>
        </>
    )
}

export default Articles
