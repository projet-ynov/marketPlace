import {createBrowserRouter} from "react-router-dom";
import Articles from "./Accueil/articles/Articles.tsx";
import NavBar from "./components/navBar/NavBar.tsx";
import PageDetail from "./pages/page_detail/PageDetail.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import Profil from "./pages/profil/Profil.tsx";
import AjoutAnnonce from "./pages/AjoutAnnonce/AjoutAnnonce.tsx";
import Edit from "./pages/Edit/Edit.tsx";
import Messages from "./pages/Messages/Messages.tsx";


const router = createBrowserRouter([
    {
        path: "/users",
        element: <NavBar/>
    },
    {
        path: "/details/:detailsId",
        element: <PageDetail/>
    },
    {
        path: "/inscription",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>,

    },
    {
        path: "/profil/:id",
        element: <Profil/>
    },
    {
        path: "/ajouter",
        element: <AjoutAnnonce/>
    },
    {
        path: "/edit",
        element: <Edit/>
    },
    {
        path: "/messages/:id/:role",
        element: <Messages/>,
    },
    {
        path: "/*",
        element: <Articles/>,
    }
    ]);
export default router;