interface Annonce {
    _id:string
    title: string;
    images: ImageAnnonce[],
    description: string,
    price: number,
    date: Date,
    location: string,
    profilUser: User,
    status: number
}



interface User {
    _id: string,
    mail: string,
    username: string
    photo: string,
    city: string,
    password: string
}

interface ImageAnnonce {
    image: string
}

interface Articles {
    data: Annonce[]
}

interface Discussions {
    vendeur: VendeurDiscussion,
    acheteur: AcheteurDiscussion,
    discussion: Messages[]
}

interface VendeurDiscussion{
    userId: string,
    username: string,
    photo: string,
    annonce: AnnonceDiscussion[]
}
interface AcheteurDiscussion{
    userId: string,
    username: string,
    photo: string
}

interface AnnonceDiscussion {
    _id: string,
    title: string,
    images: string,
    price: number
}


interface Messages {
    user: string,
    message: string
}


interface AnnoncesVendu {
    user: User,
    annonce: Annonce
}