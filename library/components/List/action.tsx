import { List } from '@mui/material';
import type { FC } from 'react';

interface ActionListProps {
    children: JSX.Element | JSX.Element[];
}

export const ActionList: FC<ActionListProps> = (props) => (
    <List
        dense
        sx={{
            backgroundColor: 'neutral.100',
            width: '100%',
        }}
    />
);
