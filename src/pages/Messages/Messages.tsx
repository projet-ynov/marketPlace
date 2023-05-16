import "./Messages.css"
import NavBarProfil from "../../components/navBarProfil/NavBarProfil.tsx";


function Messages() {
    const messages = [{message: "bonjour marc", author: 'pascal'},
        {message: "bonjour pascal", author: 'marc'}, {message: "bonjour pascal", author: 'marc'},
        {message: "bonjour pascal", author: 'marc'}, {message: "bonjour pascal", author: 'pascal'},
        {message: "bonjour pascal", author: 'pascal'}, {message: "bonjour pascal", author: 'marc'}, {message: "bonjour pascal", author: 'pascal'}]

    return (
        <>
            <NavBarProfil/>
            <div className={"conteneurMessage"}>
                <div className={"messagerie"}>
                    <div className={"headerMessage"}>
                        <img src={'https://img.freepik.com/vecteurs-libre/maison-deux-etages_1308-16176.jpg'} className={"imgMessageHeader"}/>
                        <p className={"infoMessage"}>Maison a vendre blabla</p>
                        <p className={"infoMessage"}>10000000 €</p>
                    </div>
                    <div className={"messageContainer"}>
                        <div className={"messageBox"}>
                            {messages.map((msg) => (
                                <div className={`message ${msg.author == 'pascal' ? "right" : "left"}`}>
                                    <img src={"https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"} className={"imageMessage"}/>
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                        </div>
                        <div className={"sendMessage"}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;