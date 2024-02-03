import { Button, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled, useTheme } from '@mui/system';
import type { FC } from 'react';
import { ExclamationOutlined as ExclamationIcon } from '../../icons/exclamation-outlined';
import { Refresh as RefreshIcon } from '../../icons/refresh';

interface ResourceErrorProps {
    error?: string | null;
    onReload?: () => void;
    sx?: SxProps;
}

const ResourceErrorRoot = styled('div')(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.neutral[100],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3),
}));

export const ResourceError: FC<ResourceErrorProps> = (props) => {
    const { error, onReload, ...other } = props;
    const theme = useTheme();

    return (
        <ResourceErrorRoot
            theme={theme}
            {...other}
        >
            <ExclamationIcon sx={{ color: 'text.secondary' }} />
            <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
            >
                {error || 'Error loading data, please try again.'}
            </Typography>
            {onReload && (
                <Button
                    color="primary"
                    onClick={onReload}
                    startIcon={<RefreshIcon fontSize="small" />}
                    sx={{ mt: 2 }}
                    variant="text"
                >
                    Reload Data
                </Button>
            )}
        </ResourceErrorRoot>
    );
};
