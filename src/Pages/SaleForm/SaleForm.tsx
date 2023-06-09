import { PaymentElement} from "@stripe/react-stripe-js";
import {useState} from "react";
import {useStripe, useElements} from "@stripe/react-stripe-js";
import "./SaleForm.css"

function SaleForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!stripe || !elements ) {

            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {

                return_url: `${window.location.origin}/`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            if(error.message){
                setMessage(error.message);
            }
        } else {
            setMessage("An unexpected error occured.");
        }
        setIsProcessing(false);
    };

    return (
        <>

            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}

export default SaleForm;
