import "./Settings.css";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Settings() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [photo, setPhoto] = useState('');
    const [ville, setVille] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [usernameExist, setUsernameExist] = useState(false);
    const [user, setUser] = useState<User>()
    const navigate = useNavigate();


    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            const fetchData = async () => {
                const response = await axios.get<User>(`http://localhost:3000/userInfo`, {
                    headers: {
                        Authorization: token
                    }
                });
                setUser(response.data);
            };

            fetchData();
        }
    }, []);

    useEffect(() => {

        if (user) {
            setEmail(user.mail)
            setPseudo(user.username)
            setVille(user.city)
            setPhoto(user.photo)
        }

    }, [user]);

    const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file)

            reader.onload = () => {
                const base64 = (reader.result as string);

                if (base64) {
                    setTimeout(() => {
                        const imageData = base64.split(/[, ]+/).pop() as string;

                        setPhoto(imageData);


                    }, 500)
                }
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setUsernameExist(false)
        setEmailExist(false)

        setEmail(email);
        setPseudo(pseudo);
        setVille(ville);
        if (password2 !== '') {
            setPassword(password);

            if (password != password2) {
                setPasswordMatchError(true)
                return null
            } else {
                setPasswordMatchError(false)
            }
        }


        try {
            let token = sessionStorage.getItem("token");
            if (token !== null) {
                token = JSON.parse(token)
                await axios.put(`http://localhost:3000/updateUser`, {
                    username: pseudo,
                    password: password,
                    mail: email,
                    city: ville,
                    photo: photo
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                window.location.reload()
            }
        } catch (e) {
            if (e.response.request.response.includes("username")) {
                setUsernameExist(true)
            } else if (e.response.request.response.includes("mail")) {
                setEmailExist(true)
            }
        }


    };

    return (
        <>

            <div className="titre">
                <h1>Modifier les informations</h1>
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
                    } />
                </div>
                <div className="champMail">
                    <label htmlFor="confPass">Confirmez votre mot de passe:</label>
                    <input type="password" name="confPass" value={password2} onChange={(event) =>
                        setPassword2(event.target.value)
                    } />
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

                    <label htmlFor="image">Images:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onFileSelect}
                    />
                </div>

                <div className="champMail">
                    <button type="submit" className="bouton2"> Modifier</button>
                </div>
            </form>


        </>
    );
}


export default Settings;
