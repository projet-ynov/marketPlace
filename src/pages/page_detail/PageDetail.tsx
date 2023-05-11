import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar.tsx";
import "./pageDetail.css";
import {Avatar} from "@mui/material";
import {deepOrange} from '@mui/material/colors';
import Carousel from 'react-material-ui-carousel'
import {Paper} from "@mui/material";

function PageDetail() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Article>();
    const { detailsId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const article = await axios(`http://localhost:3000/annonce/${detailsId}`);
            setData(article.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        if (data && data.images) {
            const img = new Image();
            img.onload = () => setLoading(false);
            img.src = data.images[0].image;
        }
    }, [data]);


    const checkProfil = (id: string) => {
        navigate(`/profil/${id}`)
    }

if(!data){
    return null
}


    return (
        <>
            <NavBar />
            <div className="container1">
                <div className="flex1">
                    <div className="flex1-1">
                        <Carousel
                            autoPlay={false}
                            navButtonsAlwaysVisible={true}
                            next={() => {/*next*/ }}
                            prev={() => {/*prev*/ }}
                            className="tu"
                                >
                            {data.images.map( (item, i) => <Item className="slideer" key={i} item={item} loading={loading}/> )}
                        </Carousel>
                    </div>
                    <div className="flex1-2">
                        <div className="flex1-2-top">
                            <h2>{data.title}</h2>
                            <h2>{data.price} €</h2>
                        </div>
                        <div className="flex1-2-bottom">
                            <h3>Description</h3>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </div>

                <div className="content2">
                    <div className="flex2">
                        <div className="flex2-top" onClick={() => checkProfil(data.profilUser._id)}>
                            <Avatar sx={{ height: '50px', width: '50px', bgcolor: deepOrange[500] }}>{Array.from(data.profilUser.username)[0].toUpperCase()}</Avatar>
                            <p>Valentin</p>
                        </div>
                        <div className="flex2-bottom">
                            <p>Bordeaux</p>
                            <button type="submit">Message</button>
                        </div>
                    </div>
                    <div className="buttonAchat">
                        <button type="submit">Acheter</button>
                        <button type="submit" className="fav">Favorite</button>
                    </div>
                </div>
            </div>
        </>
    );
}

function Item(props: any) {

    return (
        <Paper>

                <img src={props.item.image} />

        </Paper>
    );
}

export default PageDetail;
