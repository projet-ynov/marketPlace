import {format} from 'date-fns';
import {fr} from "date-fns/locale";
import "./details.css";
import {Avatar} from "@mui/material";
import {useParams} from "react-router-dom";


function Details(article: Article) {


    // const {title, image, description, price, date, location, vendeur} = article;
    const {name, photo, description, price, categorie} = article;


    // const formattedDate = format(date, 'd MMMM yyyy, HH:mm', {locale: fr});
    return (
        <>
            {/*<h2 className="dateAnnonce">{formattedDate}</h2>*/}
            <img src={photo}/>
            <div className="headDetails">
                {/*<h2>{title}</h2>*/}
                <h2 className="title">{name.toLowerCase()}</h2>
                <h2>{price} €</h2>
            </div>
            <div className="divider"></div>
            <div className="content">
            <div className="description">
                <h2>{description}</h2>
            </div>
            <div className="footer">
                {/*{vendeur.image !== "" ? (*/}
                {/*    <Avatar alt="Remy Sharp" src={vendeur.image}/>*/}
                {/*) : (*/}
                    <Avatar>{Array.from(name)[0].toUpperCase()}</Avatar>
                {/*// )}*/}
                <h2>{categorie}</h2>
            </div>
        </div>
        </>
    )
}

export default Details
