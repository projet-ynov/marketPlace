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

    const handleMessage = (idAnnonce: string) => {
        const role = "vendeur"
        navigate(`/messages/${idAnnonce}/${role}`)
    }



    return (
        <>
            <div className={"containerMsg"}>
                {discussions.map((discussion,index) => (
                    <div className={"discussionLine"} onClick={() => handleMessage(discussion.vendeur.annonce[0]._id)}>

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
