'use client';

import { auth } from '@/api/firebase';
import { TextField } from '@mui/material';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '../../library/components/Button';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                setLoginMessage('Invalid username/password.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setLoginMessage('Password reset email sent.');
            })
            .catch((error) => {
                setLoginMessage('Error sending password reset email.');
            });
    };

    return (
        <form style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <TextField
                type="text"
                label="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                type="password"
                label="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
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
                    <a
                        href="#"
                        onClick={resetPassword}
                        className="alert-link"
                    >
                        Forgot Password?
                    </a>
                </div>
            )}
            <Button
                onClick={handleSubmit}
                isLoading={loading}
            >
                Login
            </Button>
        </form>
    );
};
