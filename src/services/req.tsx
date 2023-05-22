import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    maxContentLength: 100 * 1024 * 1024,
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

export function sendMessage(message: Messages, idAnnonce: string, socket: any) {
    try {
        let idUser = sessionStorage.getItem("idUser");
        if (idUser !== null) {
            idUser = JSON.parse(idUser)
            const messageSubmit = {messageSocket: message, idAnnonce: idAnnonce, idUser: idUser}
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
                    headers: {
                        Authorization: token
                    }
                })
            return response.data
        }
        return []

    } catch (e) {
        throw e
    }
}


export async function getVendu(): Promise<AnnoncesVendu[] | null> {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const response = await axios.get<AnnoncesVendu[]>(`http://localhost:3000/buy/getVendu`,
            {
                headers: {
                    Authorization: token
                }
            });
        return response.data
    }
    return null
}

export async function getAcheter(): Promise<AnnoncesVendu[] | null> {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const response = await apiClient.get<AnnoncesVendu[]>(`/buy/getBought`,
            {
                headers: {
                    Authorization: token
                }
            });
        return response.data
    }
    return null
}

export async function getArticles() {
    const articles: Articles = await apiClient.get(
        '/annonces',
    );
    return articles.data
}

export async function getImgUser() {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)

        const imgUser = await apiClient.get(`/imgUser`, {
            headers: {
                Authorization: token
            }
        })
        return imgUser.data
    }
}

export async function getMyAnnonce() {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const response = await apiClient.get<Annonce[]>(`/myAnnonces`,
            {
                headers: {
                    Authorization: token
                }
            });
        return response.data
    }
}

export function deleteAnnonce(idAnnonce: string) {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        apiClient.delete(`/deleteFront/${idAnnonce}`,
            {
                headers: {
                    Authorization: token,
                }
            });
    }
}

export async function getMyFavorites() {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const favorites = await apiClient.get<Annonce[]>(`/myFavorites`,
            {
                headers: {
                    Authorization: token,
                }
            });
        return favorites.data
    }
}

export async function getUserInfo() {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        const response = await apiClient.get<User>(`/userInfo`, {
            headers: {
                Authorization: token
            }
        });
        return response.data
    }
}

export async function updateUserInfo(pseudo: string, password: string, email: string, ville: string, photo: string, setUsernameExist: any, setEmailExist: any) {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        try {
            await apiClient.put(`/updateUser`, {
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

        } catch (e: any) {
            if (e.response.request.response.includes("username")) {
                setUsernameExist(true)
            } else if (e.response.request.response.includes("mail")) {
                setEmailExist(true)
            }
        }
    }
}

export function removeFavorite(idAnnonce: string) {
    let token = sessionStorage.getItem("token");
    if (token !== null) {
        token = JSON.parse(token)
        apiClient.put(`/removeFav`, {
                idAnnonce: idAnnonce
            },
            {
                headers: {
                    Authorization: token,
                }
            });
        window.location.reload()
    }
}

