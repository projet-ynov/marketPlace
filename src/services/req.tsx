import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    maxContentLength: 100 * 1024 * 1024, // 100MB (ajustez cette valeur selon vos besoins)
});

export async function discussionExist(idAnnonce: string, role: string) {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const msg = await apiClient.get<boolean>(
            `/discussion/discussionExist/${idAnnonce}?role=${role}`,
            {
                headers: {
                    Authorization: token,
                }
            },
        )
        return msg.data
    }
}

export function sendMessage(message: Messages,idAnnonce:string, socket: any) {
    try {
        let idUser = sessionStorage.getItem("idUser");
        if ( idUser  !== null ) {
            idUser = JSON.parse(idUser)
            const messageSubmit = {messageSocket:message,idAnnonce:idAnnonce,idUser:idUser}
            socket.emit('messages', messageSubmit);
        }
    } catch (e) {

    }
}

export async function getDiscussions(): Promise<Discussions[]> {
    try {
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            const response = await apiClient.get<Discussions[]>('/discussion',
                {
                    headers :{
                        Authorization: token
                    }
                })
            return response.data
        }
        return []

    }catch (e) {
        throw e
    }
}


