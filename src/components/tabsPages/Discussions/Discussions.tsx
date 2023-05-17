import {useEffect, useState} from "react";
import {getDiscussions} from "../../../services/req.tsx";




function PageDetail() {
    const [discussion, setDiscussions] = useState<Discussions[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const discussionUser = await getDiscussions();
            if(discussionUser){
                setDiscussions(discussionUser)
            }
        }
        fetchData()
    },[])



    const checkM = () => {
        console.log(discussion)
    }

    return (
        <>

<button type={"button"} onClick={checkM}>ICI</button>
        </>
    );
}


export default PageDetail;
