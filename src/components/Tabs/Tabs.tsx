import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {SyntheticEvent, useEffect, useState} from "react";
import MyAnnonces from "../TabsPages/MyAnnonces/MyAnnonces.tsx";
import MyFavorites from "../TabsPages/MyFavorite/MyFavorites.tsx";
import Settings from "../TabsPages/Settings/Settings.tsx";
import Discussions from "../TabsPages/Discussions/Discussions.tsx";
import Sold from "../TabsPages/Sold/Sold.tsx";
import BuyTabs from "../TabsPages/BuyTabs/BuyTabs.tsx";


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
        event.preventDefault()
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
                    <TabPanel value="2"><MyFavorites/></TabPanel>
                    <TabPanel value="3"><Discussions/></TabPanel>
                    <TabPanel value="4"><Sold/></TabPanel>
                    <TabPanel value="5"><BuyTabs/></TabPanel>
                    <TabPanel value="6"><Settings/></TabPanel>
                </TabContext>
            </Box>
        </>
);
}

export default Tabs;