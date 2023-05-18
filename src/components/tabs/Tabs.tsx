import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {SyntheticEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MyAnnonces from "../tabsPages/myAnnonces/MyAnnonces.tsx";
import MyFavorites from "../tabsPages/myFavorite/MyFavorites.tsx";
import Settings from "../tabsPages/Settings/Settings.tsx";
import Discussions from "../tabsPages/Discussions/Discussions.tsx";
import Vendu from "../tabsPages/Vendu/Vendu.tsx";
import Acheter from "../tabsPages/Acheter/Acheter.tsx";


function Tabs({ idUser }: { idUser: string }) {
    const [value, setValue] = useState('1');
    const [isMine, setMine] = useState(false);

    useEffect(() => {
        let myId = sessionStorage.getItem("idUser");
        if(myId){
            myId = JSON.parse(myId)
            if(idUser == myId){
                setMine(true)
            }
        }
    },[idUser])

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} >
                            <Tab label="Annonces" value="1"/>
                            <Tab label="Favoris" value="2" sx={{ display: isMine ? 'block' : 'none' }} />
                            <Tab label="Discussions" value="3" sx={{ display: isMine ? 'block' : 'none' }} />
                            <Tab label="Vendus" value="4" sx={{ display: isMine ? 'block' : 'none' }} />
                            <Tab label="Acheter" value="5" sx={{ display: isMine ? 'block' : 'none' }} />
                            <Tab label="Settings" value="6" sx={{ display: isMine ? 'block' : 'none' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><MyAnnonces idUser={idUser}/></TabPanel>
                    <TabPanel value="2"><MyFavorites idUser={idUser}/></TabPanel>
                    <TabPanel value="3"><Discussions/></TabPanel>
                    <TabPanel value="4"><Vendu/></TabPanel>
                    <TabPanel value="5"><Acheter/></TabPanel>
                    <TabPanel value="6"><Settings/></TabPanel>
                </TabContext>
            </Box>
        </>
);
}

export default Tabs;