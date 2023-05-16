import "./Profil.css"
import NavBarProfil from "../../components/navBarProfil/NavBarProfil.tsx";
import Tabs from "../../components/tabs/Tabs.tsx"
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Avatar} from "@mui/material";

function Profil() {

    const [user, setUser] = useState<User>();
    const [idUser, setIdUser] = useState("");
    const {id} = useParams();



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<User>(`http://localhost:3000/user/${id}`);
            setUser(response.data);
        };
        fetchData();
    }, []);

    const loadId = () => {
        const idUserSession = sessionStorage.getItem("idUser");
        if (idUserSession !== null) {
            setIdUser(JSON.parse(idUserSession));
        }
    }

    if (!user) {
        return null
    }

    return (
        <>
            <NavBarProfil/>
            <div className={"containerProfil"}>
                <div className={"headerProfil"}>
                    <div className={"headerComponent"}>
                        <div className={"profilPic"}>
                            {user.photo != "" ? (
                                <img src={"data:image/png;base64," + user.photo}/>
                            ) : (
                                <Avatar style={{height: '152px', width: '152px', fontSize: '50px'}}
                                        className={"iconUser"}>{Array.from(user.username)[0].toUpperCase()}</Avatar>
                            )}
                        </div>

                        <div className={"profilInfo"}>
                            <p>Nom : {user.username}</p>
                            <p>Ville : {user.city}</p>
                        </div>
                    </div>
                    <div className={"baseLine"}></div>
                </div>
                <div className={"contentProfil"}>
                    <Tabs idUser={user._id}/>
                </div>
            </div>
        </>
    );
}

export default Profil;