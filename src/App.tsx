import './App.css'
import Articles from "./Accueil/articles/Articles.tsx";
import NavBar from "./components/navBar/NavBar.tsx";
import PageDetail from "./pages/page_detail/PageDetail.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import Profil from "./pages/profil/Profil.tsx";
import AjoutAnnonce from "./pages/AjoutAnnonce/AjoutAnnonce.tsx";
import Edit from "./pages/Edit/Edit.tsx";
import Messages from "./pages/Messages/Messages.tsx";

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {ReactNode} from "react";

function App() {

    const isAuthenticated = false
    const ProtectedRoute = ({ path, element }: { path: string; element: ReactNode }) => {

        const navigate = useNavigate()
        if (isAuthenticated) {
            return <Route path={path} element={element} />;
        } else {
            navigate('/login');
            return null;
        }
    };
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/users" element={<NavBar />}  />
                    <Route
                        path="/details/:detailsId"
                        element={<PageDetail />}
                    />
                    <Route path="/inscription" element={<Register />} />
                    <Route path="/profil/:id" element={<Profil />}  />
                    <Route path="/ajouter" element={<ProtectedRoute path="/ajouter" element={<AjoutAnnonce />} />} />
                    <Route path="/edit" element={<ProtectedRoute path="/edit" element={<Edit />} />} />
                    <Route
                        path="/messages/:id/:role"
                        element={<ProtectedRoute path="/messages/:id/:role" element={<Messages />} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Articles />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
