import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {SyntheticEvent, useState} from "react";
import {useParams} from "react-router-dom";
import MyAnnonces from "../tabsPages/myAnnonces/MyAnnonces.tsx";
import MyFavorites from "../tabsPages/myFavorite/MyFavorites.tsx";
import Settings from "../tabsPages/Settings/Settings.tsx";
import Discussions from "../tabsPages/Discussions/Discussions.tsx";


function Tabs({ idUser }: { idUser: string }) {
    const [value, setValue] = useState('1');



    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} >
                            <Tab label="Annonces" value="1" />
                            <Tab label="Favoris" value="2" />
                            <Tab label="Achetés" value="3" />
                            <Tab label="Discussions" value="4" />
                            <Tab label="Settings" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><MyAnnonces idUser={idUser}/></TabPanel>
                    <TabPanel value="2"><MyFavorites idUser={idUser}/></TabPanel>
                    <TabPanel value="3"></TabPanel>
                    <TabPanel value="4"><Discussions/></TabPanel>
                    <TabPanel value="5"><Settings/></TabPanel>
                </TabContext>
            </Box>
        </>
);
}

export default Tabs;