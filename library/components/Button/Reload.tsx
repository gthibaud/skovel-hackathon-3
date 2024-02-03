import { IconButton } from '@mui/material';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { Refresh } from '../../icons/refresh';

interface ReloadButtonProps {
    sx?: any;
    refetchCallback: () => void;
}

export const ReloadButton: FC<ReloadButtonProps> = ({ refetchCallback, sx }) => {
    const handleRefetchAll = () => {
        // Refetch all dynamic objects
        refetchCallback();

        // Display a toast
        toast.success(`Metrics refreshed at ${new Date().toLocaleTimeString()}`);
    };

    return (
        <IconButton
            onClick={handleRefetchAll}
            sx={{
                ...sx,
                alignItems: 'center',
                py: 0,
                '.MuiIconButton-root': {
                    paddingTop: 0,
                },
            }}
        >
            <Refresh />
        </IconButton>
    );

    // return isLoading ? (
    //     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //         <CircularProgress
    //             size={22}
    //             thickness={8}
    //             sx={{ my: 1 }}
    //         />
    //     </Box>
    // ) : (
    //     <IconButton
    //         onClick={handleRefetchAll}
    //         sx={{
    //             ...sx,
    //             alignItems: 'center',
    //             py: 0,
    //             '.MuiIconButton-root': {
    //                 paddingTop: 0,
    //             },
    //         }}
    //     >
    //         <Refresh />
    //     </IconButton>
    // );
};
