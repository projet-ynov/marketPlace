import './navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from "react";

function NavBar() {
    const navigate = useNavigate();
    const image = "";
    const [isConnected, setConnected] = useState(Boolean(sessionStorage.getItem('id')));

    const goProfile = () => {

        navigate("/profil")
    }

    const logout = () => {
        sessionStorage.removeItem("id")
        setConnected(false)
        navigate("/")
    }

    return (
        <>
            <div className="header">
                {isConnected ? (
                    <div className="add">
                        <button type={"button"}>Ajouter</button>
                    </div>): ''}
                <div className="search">
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
                ): ""}
            </div>

        </>
    )
}

export default NavBar
