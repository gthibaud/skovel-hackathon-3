'use client';

import { auth } from '@/api/firebase';
import { Login } from '@/components/Login';
import { UserInfos } from '@/components/UserInfos';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import './styles.css';

export default function Account() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            if (u) {
                console.log('User is logged in');
                setUser(u);
            } else {
                console.log('User is logged out');
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <main>
            <header>
                <h1>{user ? 'User account' : 'Login'}</h1>
                <br />
            </header>
            {user ? <UserInfos user={user} /> : <Login />}
        </main>
    );
}
