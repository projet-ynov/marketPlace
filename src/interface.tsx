// interface Article {
//     title: string;
//     image: string,
//     description: string,
//     price: number,
//     date: Date,
//     location: string,
//     vendeur: Vendeur
// }

interface Article {
    product_id: number,
    name: string,
    description: string,
    price: number,
    promotion: number,
    photo: string,
    categorie: string,
    stock: number
}

interface Vendeur {
    id: string,
    name: string,
    avis: number,
    image: string
}

interface Articles {
    data: Article[]
}