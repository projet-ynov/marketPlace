import './Articles.css'
import Details from "../articlesDetails/Details.tsx";
import NavBar from "../../components/navBar/NavBar.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Articles() {


    const [data, setData] = useState<Annonce[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const articles: Articles = await axios(
                'http://localhost:3000/annonces',
            );
            setData(articles.data)
        };

        fetchData();
    },[]);

    const handleClick = (detailsId: string) => {
        navigate(`/details/${detailsId}`);
    };

    return (
        <>
            <NavBar/>
            <div className="container">
                {data.map((article, index) => (
                    <div key={index} className="articles" onClick={() => handleClick(article._id)} >
                        <Details{...article}/>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Articles
