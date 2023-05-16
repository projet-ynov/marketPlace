import './Navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton, Menu, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect, useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";

function NavBar({handleSearch ,dataRes}) {
    const navigate = useNavigate();
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [city, setCity] = useState('')
    const [isConnected, setConnected] = useState(Boolean(sessionStorage.getItem('token')));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            const fetchData = async () => {
                await axios.get(`http://localhost:3000/imgUser`, {
                    headers: {
                        Authorization: token
                    }
                }).then(r => {
                    setImage(r.data)
                });

            };

            fetchData();
        }
    }, [image]);


    const handleSearcher = async () => {

        if (title !== '' && city !== '') {
            const data = await axios.get<Annonce[]>(`http://localhost:3000/both/${title}/${city}`);
            handleSearch([data]);
        } else if (title != '') {
            const data = await axios.get<Annonce[]>(`http://localhost:3000/search/${title}`);
            handleSearch([data]);
        } else if (city !== '') {
            const data = await axios.get<Annonce[]>(`http://localhost:3000/searchCity/${city}`);
            handleSearch([data]);
        } else {
            const data = await axios.get<Annonce[]>(`http://localhost:3000/annonces`);
            handleSearch([data]);
        }


    };


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



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortDesc = () => {
        const sorted:Annonce[] = [...dataRes].sort((a,b) => b.price - a.price)
        handleSearch(sorted)
    }

    const handleSortAsc = () => {
        const sorted:Annonce[] = [...dataRes].sort((a,b) => a.price - b.price)
        handleSearch(sorted)
    }

    const handleSortAz = () => {
        const sorted: Annonce[] = [...dataRes].sort((a, b) => a.title.localeCompare(b.title));

        handleSearch(sorted)
    }

    const handleSortZa = () => {
        const sorted: Annonce[] = [...dataRes].sort((a, b) => b.title.localeCompare(a.title));
        handleSearch(sorted)
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
                    <input type="text" placeholder="Chaussures, Maison, Meubles ..." value={title} onChange={(event) =>
                        setTitle(event.target.value)
                    }/>
                    <input type="text" placeholder="Bordeaux, Paris, Marseille ..." value={city} onChange={(event) =>
                        setCity(event.target.value)
                    }/>
                    <IconButton aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                        <FilterAltIcon style={{color: "white"}}/>
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleSortDesc}>price desc</MenuItem>
                        <MenuItem onClick={handleSortAsc}>price asc</MenuItem>
                        <MenuItem onClick={handleSortAz}>A-Z</MenuItem>
                        <MenuItem onClick={handleSortZa}>Z-A</MenuItem>
                    </Menu>

                    <IconButton>
                        <SearchIcon style={{color: "white"}} onClick={handleSearcher}/>
                    </IconButton>
                </div>
                {isConnected ? (
                    <div className={"contentHeaderR"}>
                        <div className={"logout"}>
                            <LogoutIcon onClick={logout}/>
                        </div>
                        <div className="profil">
                            {image !== "" ? (
                                <Avatar alt="Remy Sharp" src={"data:image/png;base64," + image} onClick={goProfile}/>
                            ) : (
                                <Avatar onClick={goProfile}>D</Avatar>
                            )}
                        </div>
                    </div>
                ) : (<div className={"contentHeaderR"}>
                        <div className={"logout"}>
                            <button type={"button"} onClick={navigateLogin} className={"buttonLogs"}>Se connecter
                            </button>
                        </div>
                        <div className="profil">
                            <button type={"button"} onClick={navigateSignin} className={"buttonLogs"}>S'inscrire
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default NavBar
