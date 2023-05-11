import "./Login.css";

function Login() {


    return (
        <>
            <div className="total">
                <div className="container2">
                    <div className="titre">
                        <h1>Se connecter</h1>
                    </div>
                    <form className="champFlex">
                        <div className="champMail">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="password">Mot de passe:</label>
                            <input type="password" name="password" required={true}/>
                        </div>
                        <div className="champMail">
                            <button type="submit" className="bouton2" > S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}



export default Login;
