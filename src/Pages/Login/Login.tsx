import "./Login.css";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setEmail(email);
        setPassword(password);
        setPasswordIncorrect(false)
        try {
            await axios.post(`http://localhost:3000/login`, {
                "mail": email,
                "password": password,
            }).then((response) => {
                sessionStorage.setItem('token', JSON.stringify(response.data[0].message))
                sessionStorage.setItem('idUser', JSON.stringify(response.data[1].id))
            });
            navigate(`/`);
        }catch (e: any) {
            if(e.response.request.response.includes("Password incorrect")){
                setPasswordIncorrect(true)
            }
        }


    };

    return (
        <>
            <div className="total">
                <div className="containerLogin">
                    <div className="titre">
                        <h1>Se connecter</h1>
                    </div>
                    <form className="champFlex" onSubmit={handleSubmit}>
                        <div className="champMail">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value={email} onChange={(event) =>
                                setEmail(event.target.value)
                            } required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="password">Mot de passe:</label>
                            <input type="password" name="password" value={password} onChange={(event) =>
                                setPassword(event.target.value)
                            } required={true}/>
                            {passwordIncorrect && (<p>Mot de passe incorrect</p>)}
                        </div>
                        <div className="champMail">
                            <button type="submit" className="bouton2" >Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}



export default Login;
