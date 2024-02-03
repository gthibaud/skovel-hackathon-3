import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { StatusBadge } from './badge';

interface StatusProps {
    color: string;
    label: string;
}

export const Status: FC<StatusProps> = (props) => {
    const { color, label, ...other } = props;

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
            }}
            {...other}
        >
            <StatusBadge color={color} />
            <Typography
                sx={{
                    color,
                    ml: 1.75,
                }}
                variant="body2"
            >
                {label}
            </Typography>
        </Box>
    );
};

Status.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
