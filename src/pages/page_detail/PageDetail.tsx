import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "../../navBar/NavBar.tsx";
import "./pageDetail.css";
import {Avatar} from "@mui/material";
import {deepOrange} from '@mui/material/colors';
import Carousel from 'react-material-ui-carousel'
import {Paper} from "@mui/material";

function PageDetail() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Article>();
    const { detailsId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const article = await axios(`http://localhost:8080/api/products/${detailsId}`);
            setData(article.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        if (data && data.photo) {
            const img = new Image();
            img.onload = () => setLoading(false);
            img.src = data.photo;
        }
    }, [data]);

    const photo = [{photo:"https://www.maisons-france-confort.fr/wp-content/uploads/2021/03/20210304-maisons-france-confort-realisation-maison-contemporaine4.jpg"},{photo:"https://www.maisons-pierre.com/wp-content/uploads/2022/07/1920x740_Boreal.jpg"},{photo:"https://www.maisons-open.fr/wp-content/uploads/2021/06/20210630-maisons-open-home.jpg"}]

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="flex1">
                    <div className="flex1-1">
                        <Carousel
                            autoPlay={false}
                            navButtonsAlwaysVisible={true}
                            next={() => {/*next*/ }}
                            prev={() => {/*prev*/ }}
                            className="tu"
                                >
                            {photo.map( (item, i) => <Item className="slideer" key={i} item={item} loading={loading}/> )}
                        </Carousel>
                    </div>
                    <div className="flex1-2">
                        <div className="flex1-2-top">
                            <h2>{data?.name}</h2>
                            <h2>{data?.price} €</h2>
                        </div>
                        <div className="flex1-2-bottom">
                            <h3>Description</h3>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="content2">
                    <div className="flex2">
                        <div className="flex2-top">
                            <Avatar sx={{ height: '50px', width: '50px', bgcolor: deepOrange[500] }}>H</Avatar>
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

                <img src={props.item.photo} />

        </Paper>
    );
}

export default PageDetail;
