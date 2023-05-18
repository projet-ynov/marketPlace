import {loadStripe, Stripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import axios from "axios";
import AchatForm from "../AchatForm/AchatForm.tsx";
import {Elements} from "@stripe/react-stripe-js";
import "./Achat.css"
import {useParams} from "react-router-dom";
function Achat() {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
    const [clientSecret, setClientSecret] = useState<string | null >();
    const {idAnnonce} = useParams()
    const {montant} = useParams()

    useEffect(() => {
        axios.get("http://localhost:3000/stripe/config").then(async (r) => {
            const {publishableKey} = await r.data

            setStripePromise(loadStripe(publishableKey))
        })

    }, [])

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token !== null) {
            token = JSON.parse(token)
            axios.post("http://localhost:3000/stripe/createPayment", {
                montant: montant,
                idAnnonce: idAnnonce

            }, {
                headers: {
                    Authorization: token
                }
            }).then(async (r) => {
                const {clientSecret} = await r.data

                setClientSecret(clientSecret)
            })
        }
    }, [idAnnonce,montant])

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                <AchatForm />
            </Elements>)}
        </>
    );
}

export default Achat;
