import { Box } from '@mui/material';
import type { SxProps } from '@mui/system';
import PropTypes from 'prop-types';
import type { FC } from 'react';

interface StatusBadgeProps {
    color: string;
    sx?: SxProps;
}

export const StatusBadge: FC<StatusBadgeProps> = (props) => {
    const { color, sx, ...other } = props;

    return (
        <Box
            sx={{
                backgroundColor: color,
                borderRadius: '50%',
                height: 8,
                width: 8,
                ...sx,
            }}
            {...other}
        />
    );
};

StatusBadge.propTypes = {
    color: PropTypes.string.isRequired,
    sx: PropTypes.object,
};
