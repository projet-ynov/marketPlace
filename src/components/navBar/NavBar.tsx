import './Navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';

function NavBar() {
    const navigate = useNavigate();
    const image = "";
    const [isConnected, setConnected] = useState(Boolean(sessionStorage.getItem('token')));

    const goProfile = () => {
        const idUser = sessionStorage.getItem("idUser");
        if (idUser !== null) {
            navigate(`/profil/${JSON.parse(idUser)}`)
        }
    }

    const logout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("idUser")
        setConnected(false)
        navigate("/")
    }


    const navigateHome = () => {
        navigate("/")
    }

    const navigateAjout = () => {
        navigate("/ajouter")
    }

    const navigateLogin = () => {
        navigate("/login")
    }

    const navigateSignin = () => {
        navigate("/inscription")
    }


    return (
        <>
            <div className="header">
                {isConnected ? (
                    <div className="add">
                        <button type={"button"} onClick={navigateAjout}>Ajouter</button>
                    </div>) : ''}
                <div className="search">
                    <IconButton onClick={() => navigateHome()}>
                        <HomeIcon style={{fontSize: '30px', color: 'white'}}/>
                    </IconButton>
                    <input type="text" placeholder="Chaussures, Maison, Meubles ..."/>
                    <input type="text" placeholder="Bordeaux, Paris, Marseille ..."/>
                    <IconButton>
                        <FilterAltIcon style={{color: "white"}}/>
                    </IconButton>
                    <IconButton>
                        <SearchIcon style={{color: "white"}}/>
                    </IconButton>
                </div>
                {isConnected ? (
                    <div className={"contentHeaderR"}>
                        <div className={"logout"}>
                            <LogoutIcon onClick={logout}/>
                        </div>
                        <div className="profil">
                            {image !== "" ? (
                                <Avatar alt="Remy Sharp" src={image} onClick={goProfile}/>
                            ) : (
                                <Avatar onClick={goProfile}>D</Avatar>
                            )}
                        </div>
                    </div>
                ) : (<div className={"contentHeaderR"}>
                        <div className={"logout"}>
                            <button type={"button"} onClick={navigateLogin} className={"buttonLogs"}>Se connecter</button>
                        </div>
                        <div className="profil">
                            <button type={"button"} onClick={navigateSignin} className={"buttonLogs"}>S'inscrire</button>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default NavBar
