import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import {
    CrossCircleFill,
    ExclamationCircleFill,
    QuestionMarkCircleFill,
} from 'gthibaud-icons-react';
import type { FC } from 'react';

interface ConfirmationDialogProps {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
    variant: 'error' | 'warning' | 'info';
}

const icons = {
    error: (
        <CrossCircleFill
            color="error"
            fontSize="large"
        />
    ),
    warning: (
        <ExclamationCircleFill
            color="warning"
            fontSize="large"
        />
    ),
    info: (
        <QuestionMarkCircleFill
            color="info"
            fontSize="large"
        />
    ),
};

export const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
    const { message, onCancel, onConfirm, open, title, variant, ...other } = props;

    return (
        <Dialog
            onClose={onCancel}
            open={open}
            PaperProps={{
                sx: {
                    width: '100%',
                },
            }}
            {...other}
        >
            <DialogTitle
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                {icons[variant]}
                <Typography
                    color="inherit"
                    sx={{ ml: 2 }}
                    variant="inherit"
                >
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography
                    color="textPrimary"
                    variant="body1"
                >
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={onCancel}
                    variant="text"
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={onConfirm}
                    variant="contained"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
