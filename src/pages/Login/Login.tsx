import "./Login.css";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();



        setEmail(email);
        setPassword(password);



        try {
            const login =  await axios.post(`http://localhost:3000/login`, {
                "mail": email,
                "password": password,
            }).then((response) => {
                sessionStorage.setItem('id', JSON.stringify(response.data.message))
            });
            console.log(login)
            navigate(`/`);
        }catch (e) {
            console.log(e)
            // if(e.response.request.response.includes("username")){
            //     setUsernameExist(true)
            // }else if(e.response.request.response.includes("mail")){
            //     setEmailExist(true)
            // }
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
