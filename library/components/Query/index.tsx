import { Box, Button, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { ChangeEvent, FC, FocusEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Search as SearchIcon } from '../../icons/search';

interface QueryProps {
    disabled?: boolean;
    onQueryChange: (newQuery: string) => void;
    defaultValue?: string;
    sx?: SxProps;
    placeholder: string;
}

const QueryRoot = styled('div')(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: 'background.paper',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    height: '40px',
    width: '100%',
}));

export const Query: FC<QueryProps> = (props) => {
    const { disabled = false, onQueryChange: onChange, defaultValue = '', ...other } = props;
    const [autoFocus, setAutoFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tempValue, setTempValue] = useState('');

    // On initial render, if there is a default value, set it to temp value
    useEffect(() => {
        setTempValue(defaultValue);
    }, [defaultValue]);

    // If the component is not disabled and autoFocus is true, focus the input
    useEffect(() => {
        if (!disabled && autoFocus && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [disabled]);

    // On change, update the temp value
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTempValue(event.target.value);
    };

    // On keyup, if the key is enter, call the onChange function
    const handleKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.keyCode === 13 && onChange) {
            onChange(tempValue);
        }
    };

    // On focus, set autoFocus to true
    const handleFocus = (): void => {
        setAutoFocus(true);
    };

    // On blur, set autoFocus to false
    const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
        /*
         There is a situation where an input goes from not disabled to disabled and DOM emits a blur
         event, with event as undefined. This means, that sometimes we'll receive an React Synthetic
         event and sometimes undefined because when DOM triggers the event, React is unaware of it,
         or it simply does not emit the event. To bypass this behaviour, we store a local variable
         that acts as autofocus.
         */

        if (event) {
            setAutoFocus(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <QueryRoot
                {...other}
                sx={{ backgroundColor: 'background.paper' }}
            >
                <SearchIcon
                    sx={{
                        color: 'icon.default',
                        ml: 1.5,
                        mr: 0.8,
                        height: 18,
                    }}
                    fontSize="small"
                />
                <InputBase
                    disabled={disabled}
                    inputProps={{
                        ref: inputRef,
                        sx: {
                            p: 0.75,
                            '&::placeholder': {
                                color: 'text.secondary',
                                opacity: 0.75,
                            },
                            fontSize: '14px',
                        },
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onKeyUp={handleKeyup}
                    placeholder={props.placeholder}
                    sx={{ flex: 1 }}
                    value={tempValue}
                />
            </QueryRoot>
            <Button
                sx={{ height: '40px' }}
                variant="contained"
                onClick={() => onChange(tempValue)}
            >
                Search
            </Button>
        </Box>
    );
};
