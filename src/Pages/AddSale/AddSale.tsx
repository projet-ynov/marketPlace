import "./AddSale.css"
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function AddSale() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<ImageAnnonce[]>([]);
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();


    useEffect(() => {
        let idUser = sessionStorage.getItem("idUser");
        if (idUser !== null) {
            idUser = JSON.parse(idUser)
            const fetchData = async () => {
                const response = await axios.get<User>(`http://localhost:3000/user/${idUser}`);
                setUser(response.data);
            };

            fetchData();
        }
    }, []);


    const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file)

            reader.onload = () => {
                const base64 = (reader.result as string);

                if (base64) {
                    setTimeout(() => {
                        const imageData = base64.split(/[, ]+/).pop() as string;

                        const newImage: ImageAnnonce = {
                            image: imageData
                        }

                        setImage([...image, newImage]);


                    }, 500)
                }
            }
        }
    }


    const deleteImage = (index: number) => {
        const images = [...image];
        images.splice(index, 1)
        setImage(images)

    }

    const handlePublication = async (event: any) => {
        event.preventDefault();
        setTitle(title);
        setPrice(price);
        setDescription(description)
        const apiClient = axios.create({
            baseURL: 'http://localhost:3000',
            maxContentLength: 100 * 1024 * 1024, // 100MB (ajustez cette valeur selon vos besoins)
        });
        let token = sessionStorage.getItem("token");
        if (token !== null && user) {
            token = JSON.parse(token)
            try {
                apiClient.post(`/addAnnonce`, {
                        "title": title,
                        "description": description,
                        "price": price,
                        "date": new Date(),
                        "location": user?.city,
                        "images": image,
                        "profil": user._id
                    }
                )
                navigate(`/profil/${user?._id}`);
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <>
            <NavBarProfil/>
            <div className="total">
                <div className="container2">
                    <div className="titre">
                        <h1>Publier une annonce</h1>
                    </div>
                    <form className="champFlex" onSubmit={handlePublication}>
                        <div className="champMail">
                            <label htmlFor="title">Titre:</label>
                            <input type="text" name="title" value={title} onChange={(event) =>
                                setTitle(event.target.value)
                            } required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="description">Description:</label>
                            <textarea className={"descriptionInput"} name="description" value={description}
                                      onChange={(event) =>
                                          setDescription(event.target.value)
                                      } required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="price">Prix:</label>
                            <input type="number" name="price" value={price} onChange={(event) =>
                                setPrice(parseInt(event.target.value))
                            } required={true}/>
                        </div>
                        <div className="champMail">
                            <label htmlFor="image">Images:</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={onFileSelect}
                                required={true}
                            />
                        </div>
                        <div className={"imagePreview"}>
                            {image.map((img, index) => (
                                <div className={"singleImage"}>
                                    <img className={"imgMinia"} src={"data:image/png;base64," + img.image} key={index}/>
                                    <button type={"button"} onClick={() => deleteImage(index)}>X</button>
                                </div>
                            ))}
                        </div>
                        <div className="champMail">
                            <button type="submit" className="bouton2">Publier</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddSale;