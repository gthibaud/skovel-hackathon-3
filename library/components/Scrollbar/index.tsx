'use client';

import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

interface ScrollbarProps {
    children?: ReactNode;
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
    const { children, ...other } = props;

    if (typeof window === 'undefined') {
        return <Box ref={ref}>{children}</Box>;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    );

    if (isMobile) {
        return <Box ref={ref}>{children}</Box>;
    }

    return (
        <SimpleBar
            // @ts-ignore
            ref={ref}
            sx={{
                height: '100%',
            }}
            {...other}
        >
            {children}
        </SimpleBar>
    );
});
