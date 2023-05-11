interface Article {
    _id:string
    title: string;
    images: image[],
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
    image: string,
    city: string
}

interface image {
    image: string
}

interface Articles {
    data: Article[]
}