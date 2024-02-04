'use client';

import Link from 'next/link';
import './styles.css';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Return() {
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            })
            .catch((error) => {
                setStatus('error');
            });
    }, []);

    if (status === 'error') {
        return (
            <main>
                <h1>An error occured during checkout</h1>
                <Link href="/register">Retry</Link>
            </main>
        );
    }

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        return (
            <main>
                <header>
                    <h1>Félicitations !</h1>
                </header>
                <div className="bento">
                    <div className="bento-card">
                        <h3>Votre paiement a bien été enregistré</h3>
                        <p>
                            Price: <b>150€</b>
                        </p>
                        <p>
                            Email: <b>{customerEmail}</b>
                        </p>
                        <p>N&apos;oubliez pas de nous transmettre votre certificat médical !</p>
                    </div>
                </div>
            </main>
        );
    }

    return null;
}
