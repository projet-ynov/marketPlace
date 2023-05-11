import './navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const image = "";

    const goProfile = () => {

        navigate("/profil")
    }

    return (
        <>
            <div className="header">
                <div className="add">
                    <button type={"button"}>Ajouter</button>
                </div>
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
                <div className="profil">
                    {image !== "" ? (
                        <Avatar alt="Remy Sharp" src={image} onClick={goProfile}/>
                    ) : (
                        <Avatar onClick={goProfile}>H</Avatar>
                    )}
                </div>
            </div>

        </>
    )
}

export default NavBar
