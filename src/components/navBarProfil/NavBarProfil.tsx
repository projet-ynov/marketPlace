import "./NavBarProfil.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
function NavBarProfil() {

    const navigate = useNavigate();
    const returnAccueil = () => {
        navigate(`/`);
    };
    return (
        <>
            <div className={"containNav"}>
                <div className={"returnArrow"}>
                    <ArrowBackIcon className={"arrow"} onClick={returnAccueil}/>
                </div>
            </div>
        </>

    );

}

export default NavBarProfil;