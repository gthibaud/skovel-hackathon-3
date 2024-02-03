import { useTheme } from '@emotion/react';
import type { FilledTextFieldProps } from '@mui/material';
import { TextField as TextFieldMUI } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { ArrowUpCircleFill } from 'gthibaud-icons-react';
import type { ElementType, FC } from 'react';
import toast from 'react-hot-toast';
import { IconButton } from '../Button/Icon';

interface TextFieldProps extends Omit<FilledTextFieldProps, 'variant'> {
    InputProps?: Record<string, any>;
    sx?: SxProps;
    borderColor?: string;
    backgroundColor?: string;
    sendButton?: boolean;
    startIcon?: ElementType;
}

export const TextField: FC<TextFieldProps> = (props) => {
    const {
        InputProps,
        sx,
        borderColor,
        backgroundColor,
        sendButton = false,
        startIcon: StartIcon,
        ...other
    } = props;
    const theme = useTheme();

    return (
        <TextFieldMUI
            inputProps={{
                sx: {
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: 14,
                    height: 'unset',
                    lineHeight: 1.6,
                    px: 1.5,
                    py: 0.75,
                    '&.MuiInputBase-inputAdornedStart': {
                        pl: 0,
                    },
                    ...sx,
                },
            }}
            variant="filled"
            InputLabelProps={{
                shrink: true,
                sx: {
                    color: 'text.primary',
                    fontSize: 14,
                    fontWeight: 500,
                    mb: 0.5,
                    position: 'relative',
                    transform: 'none',
                },
            }}
            sx={{
                '& .MuiFilledInput-root': {
                    backgroundColor: backgroundColor || 'background.paper',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: borderColor || 'neutral.300',
                    borderRadius: 1,
                    boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
                    overflow: 'hidden',
                    p: 0,
                    transition: (t) => t.transitions.create(['border-color', 'box-shadow']),
                    '&:before': {
                        borderBottom: 0,
                    },
                    '&:hover': {
                        backgroundColor: 'background.paper',
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'background.paper',
                        // boxShadow: (theme) =>
                        //     `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,

                        // "&:focus": {
                        outline: 'none',
                        boxShadow: theme.shadow.inputActive,
                        border: theme.divider.primaryActive,
                        // },
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'action.disabledBackground',
                        boxShadow: 'none',
                        borderColor: alpha('#D6DBE1', 0.5),
                    },
                    '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
                        {
                            mt: 0,
                            ml: 1.5,
                        },
                },
                ...sx,
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
                startAdornment: StartIcon && (
                    <StartIcon
                        size={20}
                        color={theme.colors.text.disabled}
                        style={{
                            marginLeft: 8,
                            marginRight: 6,
                        }}
                    />
                ),
                endAdornment: sendButton ? (
                    <IconButton
                        onClick={() => toast.success('Send')}
                        icon={ArrowUpCircleFill}
                        title="Send"
                    />
                ) : (
                    InputProps?.endAdornment
                ),
                ...InputProps,
                disableUnderline: true,
            }}
            {...other}
        />
    );
};
