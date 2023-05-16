interface Annonce {
    _id:string
    title: string;
    images: ImageAnnonce[],
    description: string,
    price: number,
    date: Date,
    location: string,
    profilUser: User
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