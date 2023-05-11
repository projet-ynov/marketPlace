import {createBrowserRouter} from "react-router-dom";
import Articles from "./Accueil/articles/Articles.tsx";
import NavBar from "./components/navBar/NavBar.tsx";
import PageDetail from "./pages/page_detail/PageDetail.tsx";
import Connect from "./pages/Inscription/Connect.tsx";
import Login from "./pages/Login/Login.tsx";
import Profil from "./pages/profil/Profil.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Articles/>
    },
    {
        path: "/users",
        element: <NavBar/>
    },
    {
        path: "/details/:detailsId",
        element: <PageDetail/>
    },
    {
        path: "/connexion",
        element: <Connect/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/profil",
        element: <Profil/>
    }
    ]);
export default router;