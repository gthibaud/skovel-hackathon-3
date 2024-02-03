import { FormHelperText } from '@mui/material';
import { FC } from 'react';

interface FormHelperErrorProps {
    error?: string;
    sx?: any;
}

export const FormHelperError: FC<FormHelperErrorProps> = ({ error, sx }) => {
    return error ? (
        <FormHelperText
            error
            sx={{ ...sx, fontSize: 14 }}
        >
            {' '}
            {error}
        </FormHelperText>
    ) : (
        <></>
    );
};
