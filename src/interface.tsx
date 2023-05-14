interface Annonce {
    _id:string
    title: string;
    images: ImageAnnonce[],
    description: string,
    price: number,
    date: Date,
    location: string,
    profilUser: Vendeur
}



interface Vendeur {
    _id: string,
    mail: string,
    username: string
    photo: string,
    city: string
}

interface ImageAnnonce {
    image: string
}

interface Articles {
    data: Annonce[]
}