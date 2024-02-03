import { Dialog, DialogTitle, Typography } from '@mui/material';
import type { FC } from 'react';
import React from 'react';

interface DialogLayoutProps {
    children: string | JSX.Element | JSX.Element[];
    open: boolean;
    title?: string;
    titleJSX?: JSX.Element;
    onClose: () => void;
}

export const DialogLayout: FC<DialogLayoutProps> = (props) => {
    const { open, children, title, titleJSX, onClose, ...other } = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    width: '100%',
                },
            }}
            {...other}
        >
            {title && (
                <DialogTitle>
                    <Typography
                        color="inherit"
                        sx={{ ml: 2 }}
                        variant="inherit"
                    >
                        {title}
                    </Typography>
                </DialogTitle>
            )}
            {titleJSX && <DialogTitle>{titleJSX}</DialogTitle>}
            {children}
        </Dialog>
    );
};
