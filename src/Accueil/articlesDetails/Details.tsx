import {format} from 'date-fns';
import {fr} from "date-fns/locale";
import "./Details.css";
import {Avatar} from "@mui/material";


function Details(article: Annonce) {


    const {title, images, description, price, date, location, profilUser} = article;



    const formattedDate = format(new Date(), 'd MMMM yyyy, HH:mm', {locale: fr});
    return (
        <>
            <h2 className="dateAnnonce">{formattedDate}</h2>
            <img src={"data:image/png;base64," + images[0].image} />
            <div className="headDetails">
                <h2 className="titleDetails">{title.toLowerCase()}</h2>
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
                    <Avatar>{Array.from(profilUser.username)[0].toUpperCase()}</Avatar>
                {/*)}*/}
                <h2>{location}</h2>
            </div>
        </div>
        </>
    )
}

export default Details
