import "./connect.css";

function Connect() {


    return (
        <>
            <div className="total">
            <div className="container2">
                <div className="titre">
                    <h1>Inscription</h1>
                </div>
                <form className="champFlex">
                    <div className="champMail">
                        <label htmlFor="email">Email:</label>
                    <input type="text" name="email"/>
                    </div>
                    <div className="champMail">
                        <label htmlFor="password">Mot de passe:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="champMail">
                        <label htmlFor="confPass">Confirmez votre mot de passe:</label>
                        <input type="password" name="confPass"/>
                    </div>
                    <div className="champMail">
                        <label htmlFor="pseudo">Pseudo:</label>
                        <input type="text" name="pseudo"/>
                    </div>
                    <div className="champMail">
                        <label htmlFor="ville">Ville:</label>
                        <input type="text" name="ville"/>
                    </div>
                    <div className="champMail">
                        <button type="button" className="bouton2"> S'inscrire</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}



export default Connect;
