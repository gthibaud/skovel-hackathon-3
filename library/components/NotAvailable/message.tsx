import { Box } from '@mui/material';
import { ThumbUpFill } from 'gthibaud-icons-react';
import { t } from 'i18next';
import { FC } from 'react';
import { Button } from '../Button';
import { Typography } from '../Typography';

interface NotAvailableMessageProps {
    message?: string;
    featureName: string;
    actionLabel?: string;
}

export const NotAvailableMessage: FC<NotAvailableMessageProps> = ({
    message = t('base.feedbacks.notAvailable'),
    featureName,
    actionLabel = 'Vote for this feature',
}) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            width: 'auto',
            alignItems: 'center',
        }}
    >
        <Typography>{message}</Typography>
        <Button
            onClick={() => {
                window.open(
                    `mailto:support@skovel.com?subject=Feature request +1&body=${featureName}`,
                    '_blank',
                );
            }}
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.03)',
                },
                width: 'auto',
            }}
            // variant="outlined"
            size="small"
            endIcon={ThumbUpFill}
        >
            {actionLabel}
        </Button>
    </Box>
);
