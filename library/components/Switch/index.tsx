import { FormControlLabel, Switch as MuiSwitch } from '@mui/material';
import { FC } from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (e: boolean) => void;
    label?: string;
}

export const Switch: FC<SwitchProps> = (props) => {
    const { checked, onChange, label = '' } = props;

    return (
        <FormControlLabel
            control={
                <MuiSwitch
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
            label={label}
            labelPlacement="start"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                margin: '0',
                '.MuiSwitch-root': {
                    marginRight: '0',
                },
            }}
        />
    );
};
