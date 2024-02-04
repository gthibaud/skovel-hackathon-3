import { Button, CircularProgress, DialogActions, Tooltip } from '@mui/material';
import React from 'react';
import { FC } from 'react';

interface ActionButtonDoubleProps {
    handleCancel: () => void;
    handleSubmit: () => void;
    submitLoading?: boolean;
    submitDisabled?: boolean;
    submitDisabledReason?: string;
    cancelLabel?: string;
    submitLabel?: string;
    cancelStartIcon?: JSX.Element;
    submitStartIcon?: JSX.Element;
    submitButtonColor?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
        | undefined;
    additionalElements?: JSX.Element;
}

export const ActionButtonDouble: FC<ActionButtonDoubleProps> = ({
    handleCancel,
    handleSubmit,
    submitLoading = false,
    submitDisabled = false,
    submitDisabledReason = '',
    cancelLabel = 'Cancel',
    submitLabel = 'Submit',
    cancelStartIcon,
    submitStartIcon,
    submitButtonColor = 'primary',
    additionalElements,
}) => {
    return (
        <DialogActions>
            {additionalElements}
            <Button
                color="primary"
                onClick={handleCancel}
                variant="outlined"
                disabled={submitLoading}
                startIcon={cancelStartIcon}
                sx={{ mr: 2 }}
            >
                {cancelLabel}
            </Button>
            {submitLoading ? (
                <CircularProgress
                    size={36}
                    thickness={6}
                    sx={{ ml: 2 }}
                />
            ) : (
                <Tooltip title={submitDisabled && submitDisabledReason ? submitDisabledReason : ''}>
                    <span>
                        {' '}
                        {/* This span is needed to wrap the button and the tooltip */}
                        <Button
                            color={submitButtonColor}
                            disabled={submitLoading || submitDisabled}
                            onClick={() => {
                                handleSubmit();
                            }}
                            variant="contained"
                            startIcon={submitStartIcon}
                        >
                            {submitLabel}
                        </Button>
                    </span>
                </Tooltip>
            )}
        </DialogActions>
    );
};
