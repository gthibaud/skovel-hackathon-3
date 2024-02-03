import type { FilledTextFieldProps } from '@mui/material';
import { MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { TextField } from '../TextField';
import { StatusBadge } from './badge';

interface Option {
    color: string;
    label: string;
    value: string;
}

interface StatusSelectProps extends Omit<FilledTextFieldProps, 'variant'> {
    options: Option[];
}

export const StatusSelect: FC<StatusSelectProps> = (props) => {
    const { options, ...other } = props;

    return (
        <TextField
            fullWidth
            select
        >
            {options.map((option) => (
                <MenuItem
                    key={option.value}
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    value={option.value}
                >
                    <StatusBadge
                        color={option.color}
                        sx={{
                            backgroundColor: option.color,
                            mr: 1,
                        }}
                    />
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

StatusSelect.propTypes = {
    // @ts-ignore
    options: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
};
