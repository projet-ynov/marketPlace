import './navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function NavBar() {
const image = "";

    return (
        <>
            <div className="header">
                <div className="search">
                    <input type="text" placeholder="Chaussures, Maison, Meubles ..."/>
                    <input type="text" placeholder="Bordeaux, Paris, Marseille ..."/>
                    <IconButton  >
                    <FilterAltIcon style={{ color: "white" }}/>
                    </IconButton>
                    <IconButton  >
                    <SearchIcon style={{ color: "white" }}/>
                    </IconButton>
                </div>
                <div className="profil">
                {image !== "" ? (
                    <Avatar alt="Remy Sharp" src={image} />
                ) : (
                    <Avatar>H</Avatar>
                )}
                </div>
            </div>

        </>
    )
}

export default NavBar
