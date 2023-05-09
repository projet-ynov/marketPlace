import {createBrowserRouter} from "react-router-dom";
import Articles from "./Accueil/articles/Articles.tsx";
import NavBar from "./navBar/NavBar.tsx";
import PageDetail from "./pages/page_detail/PageDetail.tsx";
import Connect from "./Login/Connect.tsx";

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
    }
    ]);
export default router;