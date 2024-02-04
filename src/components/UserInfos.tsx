'use client';

import { auth } from '@/api/firebase';
import { User } from 'firebase/auth';
import { FC } from 'react';
import { Button } from '../../library/components/Button';

interface UserProps {
    user: User;
}

export const UserInfos: FC<UserProps> = (props) => {
    const { user } = props;

    const logout = () => {
        auth.signOut();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2>Infos</h2>
            <p>Email: {user.email}</p>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};
