import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DialogSignalement({openModal,handleSignalerClose,titleSignalement,setTitleSignalement,messageSignalement,setMessageSignalement,handleSignalerSend}:
                               {openModal: boolean,handleSignalerClose: any, setTitleSignalement: any, setMessageSignalement: any, handleSignalerSend: any
                                   ,messageSignalement: string, titleSignalement: string})
{

    return (
        <>
            <Dialog
                open={openModal}
                onClose={handleSignalerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" className={"titleSignalement"}>
                    {"Une information à signaler ?"}
                </DialogTitle>
                <DialogContent>

                    <div className={"containerSignalement"}>
                        <label htmlFor="title">Titre:</label>
                        <input type="text" name="title" value={titleSignalement} onChange={(event) =>
                            setTitleSignalement(event.target.value)
                        } required={true}/>

                        <label htmlFor="description">Message:</label>
                        <textarea name="description" value={messageSignalement} onChange={(event) =>
                            setMessageSignalement(event.target.value)
                        } required={true} className={"messageSignalement"}/>
                    </div>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSignalerClose}>Annuler</Button>
                    <Button onClick={handleSignalerSend}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSignalement