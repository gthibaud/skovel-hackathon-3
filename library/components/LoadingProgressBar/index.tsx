import { Box } from '@mui/material';
import NProgress from 'nprogress';
import type { FC } from 'react';
import { useEffect } from 'react';

export const LoadingProgressBar: FC = () => {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                flexGrow: 1,
            }}
        />
    );
};
