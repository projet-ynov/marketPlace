import {createBrowserRouter} from "react-router-dom";
import Articles from "./Pages/Articles/Articles.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import PageDetail from "./Pages/PageDetail/PageDetail.tsx";
import Register from "./Pages/Register/Register.tsx";
import Login from "./Pages/Login/Login.tsx";
import Profil from "./Pages/Profil/Profil.tsx";
import AjoutAnnonce from "./Pages/AddSale/AddSale.tsx";
import Edit from "./Pages/Edit/Edit.tsx";
import Messages from "./Pages/Messages/Messages.tsx";
import SaleForm from "./Pages/SaleForm/SaleForm.tsx";
import Buy from "./Pages/Buy/Buy.tsx";


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
        path: "/achatForm",
        element: <SaleForm/>
    },
    {
        path: "/achat/:idAnnonce/:montant",
        element: <Buy/>
    },
    {
        path: "/*",
        element: <Articles/>,
    }
    ]);
export default router;