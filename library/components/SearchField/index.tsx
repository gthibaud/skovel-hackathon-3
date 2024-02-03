import { useTheme } from '@emotion/react';
import type { FilledTextFieldProps } from '@mui/material';
import { TextField as TextFieldMUI } from '@mui/material';
import type { SxProps } from '@mui/system';
import { animated, useSpring } from '@react-spring/web';
import { CrossCircleFill, Magnifier } from 'gthibaud-icons-react';
import { RefObject, type FC } from 'react';
import { Button } from '../Button';
import { IconButtonRaw } from '../Button/IconRaw';
import { HorizontalContainer } from '../Container/Horizontal';

export interface SearchFieldProps extends Omit<FilledTextFieldProps, 'variant'> {
    InputProps?: Record<string, any>;
    sx?: SxProps;
    borderColor?: string;
    backgroundColor?: string;
    value: string;
    setValue: (value: string) => void;
    isFocused: boolean;
    setOnFocus?: (value: boolean) => void;
    textFieldRef?: RefObject<HTMLInputElement>;
}

export const SearchField: FC<SearchFieldProps> = (props) => {
    const {
        InputProps,
        sx,
        borderColor,
        backgroundColor,
        value,
        isFocused,
        setOnFocus,
        setValue,
        textFieldRef,
        ...other
    } = props;
    const theme = useTheme();

    const cancelButtonProps = useSpring({
        opacity: isFocused ? 1 : 0,
        display: isFocused ? 'block' : 'none',
        width: isFocused ? 'auto' : 0,

        config: {
            duration: 200,
        },
    });

    const handleSetFocus = () => {
        if (setOnFocus) {
            setOnFocus(true);
        }
    };

    const handleCancelFocus = () => {
        if (setOnFocus) {
            setValue('');
            setOnFocus(false);
        }
    };

    return (
        <HorizontalContainer>
            <TextFieldMUI
                inputRef={textFieldRef}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onFocus={handleSetFocus}
                onBlur={handleCancelFocus}
                inputProps={{
                    sx: {
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 15,
                        height: 26,
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
                        color: '#838388',
                        fontSize: 14,
                        fontWeight: 500,
                        mb: 0.5,
                        position: 'relative',
                        transform: 'none',
                    },
                }}
                sx={{
                    transition: 'all 0.3s ease-in-out',
                    flexGrow: 2,
                    '& .MuiFilledInput-root': {
                        backgroundColor: theme.isLightTheme ? '#EEEEEF' : '#1C1C1E',
                        borderRadius: 2,
                        overflow: 'hidden',
                        p: 0,
                        '&:before': {
                            borderBottom: 0,
                        },
                        '&:hover': {
                            backgroundColor: theme.colors.surface.accent,
                        },
                        '&.Mui-focused': {
                            backgroundColor: theme.isLightTheme ? '#E7E7E8' : '#1C1C1E',
                            outline: 'none',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'action.disabledBackground',
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
                    startAdornment: (
                        <Magnifier
                            size={26}
                            color={'#808085'}
                            style={{
                                marginLeft: 8,
                                marginRight: 6,
                            }}
                        />
                    ),
                    endAdornment: (
                        <IconButtonRaw
                            onClick={() => {
                                if (textFieldRef && textFieldRef.current) {
                                    textFieldRef.current.focus();
                                }
                                setValue('');
                            }}
                            icon={CrossCircleFill}
                            title="Cancel"
                            color="#BFBFBF"
                            size={20}
                            style={{
                                marginRight: 8,
                                opacity: value ? 1 : 0,
                                transition: 'opacity 0.1s ease-in-out',
                            }}
                        />
                    ),
                    ...InputProps,
                    disableUnderline: true,
                }}
                {...other}
            />
            <animated.div style={cancelButtonProps}>
                <Button
                    background="transparent"
                    color="body"
                    textStyle={{
                        fontSize: 15,
                    }}
                    style={{
                        paddingRight: 6,
                    }}
                    onClick={handleCancelFocus}
                >
                    Cancel
                </Button>
            </animated.div>
        </HorizontalContainer>
    );
};
