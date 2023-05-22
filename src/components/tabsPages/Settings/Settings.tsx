import "./Settings.css";
import {ChangeEvent, useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../../../services/req.tsx";
import {onFileSelect} from "../../ImageLoader/ImageLoader.tsx";

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfo()
            setUser(response);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            setEmail(user.mail)
            setPseudo(user.username)
            setVille(user.city)
            setPhoto(user.photo)
        }
    }, [user]);

    const handleChangePhoto = (photo: string) => {
        setPhoto(photo)
    }

    const handleSubmit = async (event: any) => {
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
        updateUserInfo(pseudo, password, email, ville, photo, setUsernameExist, setEmailExist)
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
                    }/>
                </div>
                <div className="champMail">
                    <label htmlFor="confPass">Confirmez votre mot de passe:</label>
                    <input type="password" name="confPass" value={password2} onChange={(event) =>
                        setPassword2(event.target.value)
                    }/>
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onFileSelect(event, handleChangePhoto)}
                    />
                </div>
                <div className={"imagePreview"}>
                    <div className={"singleImage"}>
                        <img className={"imgMinia"} src={"data:image/png;base64," + photo}/>
                    </div>

                </div>

                <div className="champMail">
                    <button type="submit" className="bouton2"> Modifier</button>
                </div>
            </form>
        </>
    );
}

export default Settings;