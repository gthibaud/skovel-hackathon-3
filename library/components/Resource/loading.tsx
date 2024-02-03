import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import type { FC } from 'react';
import { DotsHorizontal as DotsHorizontalIcon } from '../../icons/dots-horizontal';

const ResourceLoadingRoot = styled('div')(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.neutral[100],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3),
}));

export const ResourceLoading: FC = (props) => (
    <ResourceLoadingRoot {...props}>
        <DotsHorizontalIcon sx={{ color: 'text.secondary' }} />
        <Typography
            color="textSecondary"
            sx={{ mt: 2 }}
            variant="body2"
        >
            Loading resource data
        </Typography>
    </ResourceLoadingRoot>
);
