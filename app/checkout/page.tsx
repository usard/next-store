"use client";
import axios from 'axios';
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { EmbeddedCheckoutProvider, 
         EmbeddedCheckout 
       } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const public_key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
const stripePromise = loadStripe(public_key);

export default function Page() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const cartId = searchParams.get('cartId');
    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const response = await axios.post('/api/payment', {
            orderId,
            cartId
        })
        return response.data.clientSecret;
    },[]);

    const options = {fetchClientSecret};

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}