import { Box } from '@mui/material';
import { FC } from 'react';
import { getZIndex } from '../../utils/z-index';
import { Typography } from '../Typography';

interface LayoutSectionProps {
    children: JSX.Element;
    title?: string;
    sticky?: boolean;
    sx?: any;
}

export const LayoutSection: FC<LayoutSectionProps> = ({
    children,
    title,
    sticky = false,
    sx = {},
}) => {
    return title ? (
        <>
            <Typography
                color="textPrimary"
                variant="h5"
                mb={-1}
            >
                {title}
            </Typography>
            {children}
        </>
    ) : (
        <Box
            sx={{
                position: sticky ? 'sticky' : 'relative',
                top: sticky ? '62px' : '0px',
                backgroundColor: 'background.default',
                boxShadow: (theme) =>
                    sticky ? `0 0 0px 16px ${theme.palette.background.default}` : 'none',
                zIndex: getZIndex('1'),
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};
