import "./Profil.css"
import NavBarProfil from "../../components/navBarProfil/NavBarProfil.tsx";
import Tabs from "../../components/tabs/Tabs.tsx"
import axios from "axios";
import {useEffect, useState} from "react";

function Profil() {

    const [user, setUser] = useState<Vendeur>();



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<Vendeur>('http://localhost:3000/user/645c03f76c1b7ac715f4232c');
            setUser(response.data);
        };
        fetchData();
    }, []);


    if(!user){
        return null
    }

    return (
        <>
            <NavBarProfil/>
            <div className={"containerProfil"}>
                <div className={"headerProfil"}>
                    <div className={"headerComponent"}>
                        <div className={"profilPic"}>
                            <img
                                src={user.image}/>
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