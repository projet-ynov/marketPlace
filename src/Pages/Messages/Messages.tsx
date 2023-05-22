import "./Messages.css"
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {discussionExist, sendMessage} from "../../services/req.tsx";
import {useParams} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";

function Messages() {
    const [messages, setMessages] = useState<Messages[]>()
    const [discussion, setDiscussion] = useState<Discussions>()
    const {id} = useParams();
    const {role} = useParams();
    const [exist, setExist] = useState<boolean>();
    const [socket, setSocket] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageInput, setMessageInput] = useState('');

    const fetchMessages = async () => {

        let token = sessionStorage.getItem("token");
        if (token !== null && id && !isLoading) {

            token = JSON.parse(token)

            const msg = await axios.get<Discussions>(
                `http://localhost:3000/discussion/getMsg/${id}?role=${role}`,
                {
                    headers: {
                        Authorization: token,
                    }
                },
            );
            if (msg.data != null) {
                setDiscussion(msg.data)
                setMessages([...msg.data.discussion])
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id && role) {
                const val = await discussionExist(id, role)
                if (val) {
                    setExist(val)
                }
                setIsLoading(false)
            }
        }
        fetchData()
    }, [id, role])

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);


        newSocket.on('connect', () => {

        });

        newSocket.on('new-message', (discussions: any) => {
            setMessages(discussions.discussion);
        });


        fetchMessages();

        return () => {
            newSocket.disconnect();
        };
    }, [id]);


    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token !== null && id && !isLoading) {

            token = JSON.parse(token)

            if (exist) {

                fetchMessages();

            } else {
                const fetchData = async () => {
                    await axios.post(
                        `http://localhost:3000/discussion/createDiscussion`,
                        {
                            idAnnonce: id
                        }
                        ,
                        {
                            headers: {
                                Authorization: token,
                            }
                        },
                    );
                    window.location.reload()
                };
                fetchData();
            }
        }
    }, [exist, isLoading, id])

    const handleSendMessage = () => {
        if (role && id) {
            const newMessage: Messages = {user: role, message: messageInput}
            sendMessage(newMessage, id, socket)
            setMessageInput('')
        }

    }
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Faites défiler vers le bas une fois que les messages ont été mis à jour
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <NavBarProfil/>
            {messages && discussion ? (
            <div className={"conteneurMessage"}>
                <div className={"messagerie"}>
                    <div className={"headerMessage"}>
                        <img src={"data:image/png;base64," + discussion?.vendeur.annonce[0].images}
                             className={"imgMessageHeader"}/>
                        <p className={"infoMessage"}>{discussion.vendeur.annonce[0].title}</p>
                        <p className={"infoMessage"}>{discussion.vendeur.annonce[0].price} €</p>
                    </div>

                    <div className={"messageContainer"}>
                        <div ref={messagesRef} className={"messageBox"}>

                            {messages.map((msg, index) => (
                                    <div className={`message ${msg.user == 'vendeur' ? "right" : "left"}`} key={index}>
                                        {msg.user == 'vendeur' ? (
                                            <img
                                                src={"data:image/png;base64," + discussion.vendeur.photo}
                                                className={"imageMessage"}/>
                                        ) : (<img
                                            src={"data:image/png;base64," + discussion.acheteur.photo}
                                            className={"imageMessage"}/>)}

                                        <p className={"messagePara"}>{msg.message}</p>
                                    </div>
                                ))}

                        </div>
                        <div className={"sendMessage"}>
                            <input type={"text"} className={"inputMessages"} value={messageInput}
                                   onChange={(event) =>
                                       setMessageInput(event.target.value)
                                   }/>
                            <SendIcon className={"sendButton"} onClick={handleSendMessage}/>
                        </div>
                    </div>

                </div>
            </div>
            ) : <p>Loading...</p>}
        </>
    )
}

export default Messages;