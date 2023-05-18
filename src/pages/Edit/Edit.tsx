import "./Edit.css"
import NavBarProfil from "../../components/navBarProfil/NavBarProfil.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Edit() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<ImageAnnonce[]>([]);
    const [annonce, setAnnonce] = useState<Annonce>()
    const navigate = useNavigate();

    useEffect(() => {

        const annonceRecup = sessionStorage.getItem("annonce");
        if (annonceRecup !== null) {
            setAnnonce(JSON.parse(annonceRecup))
        }
    }, []);

    useEffect(() => {
        if (annonce) {
            setTitle(annonce.title);
            setDescription(annonce.description);
            setPrice(annonce.price);
            setImage(annonce.images);
        }
    }, [annonce]);


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
        } else {

        }
    }

    const handlePublication = async (event:any) => {
        event.preventDefault();
        setTitle(title);
        setPrice(price);
        setDescription(description)
        const apiClient = axios.create({
            baseURL: 'http://localhost:3000',
            maxContentLength: 100 * 1024 * 1024
        });
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            try {
                apiClient.post(`/updateAnnonceFront/${annonce?._id}`, {
                        "title": title,
                        "description": description,
                        "price": price,
                        "images": image
                    },
                        {
                        headers: {
                            Authorization: token,
                        }
                    }
                ).then(() => {
                    sessionStorage.removeItem('annonce')
                })
                navigate(`/profil/${annonce?.profilUser?._id}`);
            } catch (e) {
                console.log(e)
                // if(e.response.request.response.includes("username")){
                //     setUsernameExist(true)
                // }else if(e.response.request.response.includes("mail")){
                //     setEmailExist(true)
                // }
            }
        }
    }

    const deleteImage = (index: number) => {
        const images = [...image];
        images.splice(index, 1)
        console.log(images)
        setImage(images)

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

export default Edit;