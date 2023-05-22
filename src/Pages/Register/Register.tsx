import "./Register.css";
import { useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [ville, setVille] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [usernameExist, setUsernameExist] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setUsernameExist(false)
        setEmailExist(false)

        setEmail(email);
        setPseudo(pseudo);
        setPassword(password);
        setVille(ville);

        if (password != password2) {
            setPasswordMatchError(true)
            return null
        } else {
            setPasswordMatchError(false)
        }


            try {
                 await axios.post(`http://localhost:3000/signin`, {
                    "username": pseudo,
                    "password": password,
                    "mail": email,
                    "city": ville,
                });
                navigate(`/login`);
            }catch (e: any) {
                if(e.response.request.response.includes("username")){
                    setUsernameExist(true)
                }else if(e.response.request.response.includes("mail")){
                    setEmailExist(true)
                }
            }


    };

    return (
        <>
            <div className="total">
                <div className="container2">
                    <div className="titre">
                        <h1>Inscription</h1>
                    </div>
                    <form className="champFlex" onSubmit={handleSubmit}>
                        <div className="champMail">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" value={email} onChange={(event) =>
                                setEmail(event.target.value)
                            } required={true}/>
                            {emailExist ? <p>Ce mail est déjà pris</p> : ""}
                        </div>
                        <div className="champMail">
                            <label htmlFor="password">Mot de passe:</label>
                            <input type="password" name="password" value={password} onChange={(event) =>
                                setPassword(event.target.value)
                            } required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="confPass">Confirmez votre mot de passe:</label>
                            <input type="password" name="confPass" value={password2} onChange={(event) =>
                                setPassword2(event.target.value)
                            } required={true}/>
                            {passwordMatchError ? <p>Les mots de passes sont différents</p> : ""}
                        </div>
                        <div className="champMail">
                            <label htmlFor="pseudo">Pseudo:</label>
                            <input type="text" name="pseudo" value={pseudo} onChange={(event) =>
                                setPseudo(event.target.value)
                            } required={true}/>
                            {usernameExist ? <p>Ce pseudo est déjà pris</p> : ""}
                        </div>
                        <div className="champMail">
                            <label htmlFor="ville">Ville:</label>
                            <input type="text" name="ville" value={ville} onChange={(event) =>
                                setVille(event.target.value)
                            } required={true}/>
                        </div>
                        <div className="champMail">
                            <button type="submit" className="bouton2"> S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Register;
