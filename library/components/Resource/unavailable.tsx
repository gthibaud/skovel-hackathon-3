import { Button, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { Plus as PlusIcon } from '../../icons/plus';
import { AppDoc3 } from '../../icons/resources-app-doc-3';

interface ResourceUnavailableProps {
    onCreate?: () => void;
    sx?: SxProps;
}

const ResourceUnavailableRoot = styled('div')(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.neutral[100],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3),
}));

export const ResourceUnavailable: FC<ResourceUnavailableProps> = (props) => {
    const { onCreate, ...other } = props;

    return (
        <ResourceUnavailableRoot {...other}>
            {/* <QuestionMarkIcon sx={{ color: 'text.secondary' }} /> */}
            <Typography
                color="textSecondary"
                sx={{ mt: 0 }}
                variant="body2"
            >
                There are no instances at this time.
            </Typography>
            <Button
                color="primary"
                href="https://docs.skovel.com/"
                target="_blank"
                startIcon={<AppDoc3 />}
                sx={{ mt: 2 }}
                variant="contained"
            >
                Need help?
            </Button>
            {onCreate && (
                <Button
                    color="primary"
                    onClick={onCreate}
                    startIcon={<PlusIcon fontSize="small" />}
                    sx={{ mt: 2 }}
                    variant="contained"
                >
                    Create Object
                </Button>
            )}
        </ResourceUnavailableRoot>
    );
};

ResourceUnavailable.propTypes = {
    onCreate: PropTypes.func,
};
