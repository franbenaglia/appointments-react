import { useContext, useState } from 'react';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { paymentIntent } from '../api/StripeApi';
import { IonButton } from '@ionic/react';

const FRONT_END_SERVER = import.meta.env.VITE_URL_LOCAL_SERVER;
const URL_CLIENT = FRONT_END_SERVER + '/SuccessPayment';
const PUBLIC_KEY_STRIPE = import.meta.env.VITE_PUBLIC_KEY_STRIPE;

interface ContainerProps {
    price: number;
    disablePay: boolean;
}

const CheckoutForm: React.FC<ContainerProps> = ({ price, disablePay }) => {

    const stripe: Stripe | null = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message as any);
            return;
        }

        const amount = price;

        const clientSecret = await paymentIntent(amount, 'usd');

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: clientSecret.data,
            confirmParams: {
                return_url: URL_CLIENT,
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message as any);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {!disablePay ? <IonButton size="default" type="submit" disabled={!stripe || !elements}>
                PAY
            </IonButton> : ''}
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);

const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
        /*...*/
    },
};


const StripeComponent: React.FC<ContainerProps> = ({ price, disablePay }) => {
    return (<Elements stripe={stripePromise} options={options}>
        <CheckoutForm price={price} disablePay={disablePay} />
    </Elements>
    );
}



export default StripeComponent;