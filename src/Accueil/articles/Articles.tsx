import './Articles.css'
import Details from "../articlesDetails/Details.tsx";
import NavBar from "../../navBar/NavBar.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Articles() {


    const [data, setData] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const articles: Articles = await axios(
                'http://localhost:8080/api/products',
            );


            setData(articles.data)
        };

        fetchData();
    },[]);

    const handleClick = (detailsId: number) => {

        navigate(`/details/${detailsId}`);

    };



    return (
        <>
            <NavBar/>
            <div className="container">
                {data.map((article, index) => (
                    <div key={index} className="articles" onClick={() => handleClick(article.product_id)} >
                        <Details{...article}/>
                    </div>
                ))}

            </div>

        </>
    )
}

export default Articles
