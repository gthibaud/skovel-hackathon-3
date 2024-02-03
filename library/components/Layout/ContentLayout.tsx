import { Box } from '@mui/material';
import { FC } from 'react';

interface ContentLayoutProps {
    children: string | JSX.Element | JSX.Element[];
}

export const ContentLayout: FC<ContentLayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                pt: 2,
                pb: 3,
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
            }}
        >
            {children}
        </Box>
    );
};
