'use client';

import { auth, db } from '@/api/firebase';
import { TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../../library/components/Button';

export const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setLoginMessage('Passwords do not match.');
            return;
        }

        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((u) => {
                const docRef = doc(db, 'users', u.user.uid);
                setDoc(docRef, {
                    name: name,
                    registered: false,
                });
            })
            .catch((error) => {
                setLoginMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <TextField
                type="text"
                label="Enter your Name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                type="text"
                label="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                type="password"
                label="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <TextField
                type="password"
                label="Confirm your Password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
            />
            {loginMessage && (
                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    <span
                        className="glyphicon glyphicon-exclamation-sign"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Error:</span>
                    &nbsp;{loginMessage}{' '}
                </div>
            )}
            <div
                style={{ display: 'flex', gap: '8px', flexDirection: 'row', alignItems: 'center' }}
            >
                <Button
                    onClick={handleSubmit}
                    isLoading={loading}
                >
                    Create account
                </Button>
                <Link href={'/account'}>I already have an account</Link>
            </div>
        </form>
    );
};
