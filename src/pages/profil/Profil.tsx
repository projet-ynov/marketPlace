import "./Profil.css"
import NavBarProfil from "../../components/navBarProfil/NavBarProfil.tsx";
import Tabs from "../../components/tabs/Tabs.tsx"
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Avatar} from "@mui/material";

function Profil() {

    const [user, setUser] = useState<Vendeur>();
    const {id} = useParams();


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<Vendeur>(`http://localhost:3000/user/${id}`);
            setUser(response.data);
        };
        fetchData();
    }, []);


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
                            {user.image != "" ? (
                                <img src={user.image}/>
                            ) : (
                                <Avatar style={{height: '152px',width: '152px'}} className={"iconUser"}>{Array.from(user.username)[0].toUpperCase()}</Avatar>
                            )}
                        </div>

                        <div className={"profilInfo"}>
                            <p>{user.username}</p>
                            <p>{user.city}</p>
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