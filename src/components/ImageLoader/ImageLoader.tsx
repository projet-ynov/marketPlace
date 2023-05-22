import {ChangeEvent} from "react";

export function onFileSelect (event: ChangeEvent<HTMLInputElement>, handleChangePhoto:any) {
    if (event.target.files) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
            const base64 = (reader.result as string);

            if (base64) {
                setTimeout(() => {
                    const imageData = base64.split(/[, ]+/).pop() as string;
                    handleChangePhoto(imageData);
                }, 500)
            }
        }
    }
}