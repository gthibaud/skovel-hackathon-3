import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { ArrowRight } from '../../icons/arrow-right';

interface TitleActionProps {
    title: string;
    actionLabel: string;
    actionAction: () => void;
}

export const TitleAction: FC<TitleActionProps> = ({ title, actionLabel, actionAction }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                color="textPrimary"
                variant="h5"
            >
                {title}
            </Typography>
            <Button
                color="primary"
                onClick={actionAction}
                endIcon={<ArrowRight fontSize="small" />}
            >
                {actionLabel}
            </Button>
        </Box>
    );
};
