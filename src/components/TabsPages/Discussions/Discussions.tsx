import "./Discussions.css"
import {useEffect, useState} from "react";
import {getDiscussions} from "../../../services/req.tsx";
import {useNavigate} from "react-router-dom";




function PageDetail() {
    const [discussions, setDiscussions] = useState<Discussions[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const discussionUser = await getDiscussions();
            if(discussionUser){
                setDiscussions(discussionUser)
            }
        }
        fetchData()
    },[])

    const handleMessage = (idVendeur: string,idAnnonce:string) => {
        let role;
        let myId = sessionStorage.getItem('idUser')
        if (myId){
            myId = JSON.parse(myId)
            if(myId == idVendeur){
                role = "vendeur"
            }else {
                role = "acheteur"
            }
        }
        navigate(`/messages/${idAnnonce}/${role}`)
    }



    return (
        <>
            <div className={"containerMsg"}>
                {discussions.map((discussion,index) => (
                    <div className={"discussionLine"} onClick={() => handleMessage(discussion.vendeur.userId, discussion.vendeur.annonce[0]._id)} key={index}>

                            <img className={"imgDiscussionListe"} src={"data:image/png;base64," + discussion.vendeur.annonce[0].images}/>
                            <p>Vendeur: {discussion.vendeur.username}</p>
                            <p>Correspondant: {discussion.acheteur.username}</p>

                    </div>
                ))}
            </div>
        </>
    );
}


export default PageDetail;
