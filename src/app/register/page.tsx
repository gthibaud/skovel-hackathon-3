'use client';

import { auth, db } from '@/api/firebase';
import { Signin } from '@/components/Signin';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import './styles.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Register() {
    const [user, setUser] = useState<User | null>(null);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            if (u) {
                console.log('User is logged in');
                setUser(u);
                const docRef = doc(db, 'users', u.uid);
                getDoc(docRef)
                    .then((doc) => {
                        if (doc.exists()) {
                            if (doc.data()?.registered) {
                                setAlreadyRegistered(true);
                            }
                            if (doc.data()?.name) {
                                setUserName(doc.data().name);
                            }
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting document:', error);
                    });
            } else {
                console.log('User is logged out');
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('/api/checkout_sessions', {
            method: 'POST',
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    return (
        <main>
            <header>
                <h1>{user ? 'My registration' : 'Register'}</h1>
            </header>
            {user && alreadyRegistered ? (
                <>
                    <div className="already-registered">
                        <p>More infos</p>
                        <Link
                            href={'/account'}
                            className="action register"
                        >
                            View my account
                        </Link>
                    </div>
                    <div className="bento">
                        <div className="bento-card">
                            <h3>My race ticket</h3>
                            <p>
                                Name: <b>{userName}</b>
                            </p>
                            <QRCode value={user.uid} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="already-registered">
                        <p>Already registered?</p>
                        <Link
                            href={'/account'}
                            className="action register"
                        >
                            View my account
                        </Link>
                    </div>
                    <div className="bento">
                        <div className="bento-card">
                            <h3>Infos</h3>
                            <p>
                                Price: <b>150€</b>
                            </p>
                            <p>
                                Distance: <b>10k</b>
                            </p>
                        </div>
                    </div>
                    {user ? (
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
                    ) : (
                        <Signin />
                    )}
                </>
            )}
        </main>
    );
}
