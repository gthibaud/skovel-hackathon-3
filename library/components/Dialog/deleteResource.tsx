import { Dialog, DialogContent, Typography } from '@mui/material';
import { Bin } from 'gthibaud-icons-react';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatErrorMessage } from '../../utils/http';
import { ActionButtonDouble } from '../Actions/ButtonDouble';
import { FormHelperError } from '../FormHelper/error';
import { TextField } from '../TextField';

interface DeleteResourceDialogProps {
    open: boolean;
    onClose: () => void;
    resourceConfirmationValue: string;
    confirmationTitle: string;
    title: string;
    description: string;
    onDelete: () => Promise<void>;
}

export const DeleteResourceDialog: FC<DeleteResourceDialogProps> = ({
    open,
    onClose,
    resourceConfirmationValue,
    confirmationTitle,
    onDelete,
    title,
    description,
    ...other
}) => {
    // Set the state for the form
    const [confirmationInput, setConfirmationInput] = useState<string>('');
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    // On open, reset state but not values
    useEffect(() => {
        setSubmitLoading(false);
        setConfirmationInput('');
        setError(undefined);
    }, [open]);

    // On confirmation input change, reset error
    useEffect(() => {
        setError(undefined);
    }, [confirmationInput]);

    const handleSubmit = async () => {
        // Check that the confirmation input is correct
        if (confirmationInput !== resourceConfirmationValue) {
            setError(`The confirmation input must be "${resourceConfirmationValue}"`);
            return;
        }

        setSubmitLoading(true);

        try {
            // Delete the resource
            await onDelete();
        } catch (err: any) {
            setSubmitLoading(false);

            // Log error
            toast.error(err.toString());

            // Display error
            toast.error(formatErrorMessage(err));

            // Display error
            setError(formatErrorMessage(err));
        }
    };

    return (
        <Dialog
            onClose={onClose}
            open={open}
            TransitionProps={{
                onExited: () => {
                    setSubmitLoading(false);
                },
            }}
            sx={{ pt: '42px' }}
            {...other}
        >
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
                <Typography variant="body1">
                    Please, type the name of the resource to confirm the deletion.
                </Typography>
                <TextField
                    fullWidth
                    label={confirmationTitle}
                    name="confirmation"
                    placeholder={resourceConfirmationValue}
                    onChange={(e) => setConfirmationInput(e.target.value)}
                    required
                    type="string"
                    value={confirmationInput}
                />
                <FormHelperError error={error} />
            </DialogContent>
            <ActionButtonDouble
                handleSubmit={handleSubmit}
                handleCancel={onClose}
                submitLoading={submitLoading}
                submitStartIcon={<Bin />}
                cancelLabel={'Cancel'}
                submitLabel={'Delete'}
                submitDisabled={confirmationInput !== resourceConfirmationValue}
                submitDisabledReason={'Resource name incorrect'}
                submitButtonColor="error"
            />
        </Dialog>
    );
};
