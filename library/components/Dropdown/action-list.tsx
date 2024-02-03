import { List } from '@mui/material';
import type { FC } from 'react';
import React from 'react';

export const ActionList: FC = (props) => (
    <List
        dense
        sx={{
            backgroundColor: 'neutral.100',
            width: '100%',
        }}
        {...props}
    />
);
