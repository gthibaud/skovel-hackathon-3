import { Button, CardActions, CircularProgress, DialogActions, Tooltip } from '@mui/material';
import { FC } from 'react';
import React from 'react';

interface ActionButtonSimpleProps {
    handleSubmit: () => void;
    submitLoading?: boolean;
    submitDisabled?: boolean;
    submitDisabledReason?: string;
    submitLabel?: string;
    submitStartIcon?: JSX.Element;
    submitButtonColor?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
        | undefined;
    parentType?: 'card' | 'dialog';
    align?: 'left' | 'right';
}

export const ActionButtonSimple: FC<ActionButtonSimpleProps> = ({
    handleSubmit,
    submitLoading = false,
    submitDisabled = false,
    submitDisabledReason = '',
    submitLabel = 'Submit',
    submitStartIcon,
    submitButtonColor = 'primary',
    parentType = 'dialog',
    align = 'right',
}) => {
    const content = submitLoading ? (
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
                    onClick={() => handleSubmit()}
                    variant="contained"
                    startIcon={submitStartIcon}
                >
                    {submitLabel}
                </Button>
            </span>
        </Tooltip>
    );

    switch (parentType) {
        case 'dialog':
            return <DialogActions>{content}</DialogActions>;
        case 'card':
            return (
                <CardActions sx={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
                    {content}
                </CardActions>
            );
        default:
            return <></>;
    }
};
