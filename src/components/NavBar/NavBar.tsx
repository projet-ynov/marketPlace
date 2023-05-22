import './Navbar.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Avatar, IconButton, Menu, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect, useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import {io} from "socket.io-client";
import {getImgUser} from "../../services/req.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function NavBar({handleSearch, dataRes}: { handleSearch?: any, dataRes?: any }) {
    const navigate = useNavigate();
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [city, setCity] = useState('')
    const [messageSignalement, setMessageSignalement] = useState('')
    const [titleSignalement, setTitleSignalement] = useState('')
    const [isConnected, setConnected] = useState(Boolean(sessionStorage.getItem('token')));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openModal, setOpenModal] = useState(false);
    const [socket, setSocket] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            const imgUser = await getImgUser()
            setImage(imgUser)
        };
        fetchData();
    }, []);


    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

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

    const navigateTo = (url: string) => {
        navigate(url)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (sort: string) => {
        if (sort == "desc") {
            const sorted: Annonce[] = [...dataRes].sort((a, b) => b.price - a.price)
            handleSearch(sorted)
        } else if (sort == "asc") {
            const sorted: Annonce[] = [...dataRes].sort((a, b) => a.price - b.price)
            handleSearch(sorted)
        }
    }

    const handleSortLetter = (sort: string) => {
        if (sort == 'az') {
            const sorted: Annonce[] = [...dataRes].sort((a, b) => a.title.localeCompare(b.title));
            handleSearch(sorted)
        } else if (sort == 'za') {
            const sorted: Annonce[] = [...dataRes].sort((a, b) => b.title.localeCompare(a.title));
            handleSearch(sorted)
        }
    }

    const handleSignalerOpen = () => {
        setOpenModal(true);
    };

    const handleSignalerClose = () => {
        setOpenModal(false);
    };

    const handleSignalerSend = () => {
        let userId = sessionStorage.getItem('idUser');
        const date = new Date();

        if (messageSignalement && titleSignalement && userId && socket) {
            userId = JSON.parse(userId)
            const description = messageSignalement
            const title = titleSignalement
            const message = {
                title,
                description,
                userId,
                date,
            };
            socket.emit('ticket', message);
            setTitleSignalement('');
            setMessageSignalement('');
            setOpenModal(false)
        }
    };

    return (
        <>
            <div className="header">
                {isConnected && (
                    <div className="add">
                        <button type={"button"} onClick={() => navigateTo("/ajouter")} className={"ajouter"}>Ajouter
                        </button>

                        <button type={"button"} onClick={handleSignalerOpen} className={"signaler"}>Signaler</button>
                    </div>)}
                <div className="search">
                    <IconButton onClick={() => navigateTo("")}>
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
                        <MenuItem onClick={() => handleSort("desc")}>price desc</MenuItem>
                        <MenuItem onClick={() => handleSort("asc")}>price asc</MenuItem>
                        <MenuItem onClick={() => handleSortLetter('az')}>A-Z</MenuItem>
                        <MenuItem onClick={() => handleSortLetter('za')}>Z-A</MenuItem>
                    </Menu>

                    <IconButton onClick={handleSearcher}>
                        <SearchIcon style={{color: "white"}} />
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
                            <button type={"button"} onClick={() => navigateTo("/login")} className={"buttonLogs"}>Se
                                connecter
                            </button>
                        </div>
                        <div className="profil">
                            <button type={"button"} onClick={() => navigateTo("/inscription")}
                                    className={"buttonLogs"}>S'inscrire
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Dialog
                open={openModal}
                onClose={handleSignalerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" className={"titleSignalement"}>
                    {"Une information à signaler ?"}
                </DialogTitle>
                <DialogContent>

                    <div className={"containerSignalement"}>
                        <label htmlFor="title">Titre:</label>
                        <input type="text" name="title" value={titleSignalement} onChange={(event) =>
                            setTitleSignalement(event.target.value)
                        } required={true}/>

                        <label htmlFor="description">Message:</label>
                        <textarea name="description" value={messageSignalement} onChange={(event) =>
                            setMessageSignalement(event.target.value)
                        } required={true} className={"messageSignalement"}/>
                    </div>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSignalerClose}>Annuler</Button>
                    <Button onClick={handleSignalerSend}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default NavBar