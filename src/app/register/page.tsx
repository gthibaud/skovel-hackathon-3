'use client'

import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './styles.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Register() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch("/api/checkout_sessions", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    return (
        <main>
            <header>
                <h1>Register</h1>
            </header>
            <div className='already-registered'>
                <p>Already registered?</p>
                <Link href={"/account"} className='action register'>View my account</Link>
            </div>
            <div className='bento'>
                <div className='bento-card'>
                    <h3>Infos</h3>
                    <p>Price: <b>150€</b></p>
                    <p>Distance: <b>10k</b></p>
                </div>
            </div>
            <div id="checkout">
                {clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )}
            </div>
        </main>
    );
};
