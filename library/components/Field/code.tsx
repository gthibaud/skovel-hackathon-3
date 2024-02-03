import styled from '@emotion/styled';
import { Theme, useTheme } from '@mui/material';
import type { FC, Ref } from 'react';
import AuthCode from 'react-auth-code-input';

interface CodeFieldProps {
    autoFocus?: boolean;
    allowedCharacters?: 'alpha' | 'numeric' | 'alphanumeric';
    onChange: (res: string) => void;
    ref?: Ref<any> | undefined;
}

interface StyledInputBaseProps {
    theme?: any;
}

const Case = styled('div')(({ theme }: StyledInputBaseProps) => ({
    '& :first-of-type': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 1,
    },
    '& input': {
        alignItems: 'center',
        display: 'flex',
        fontSize: 20,
        fontWeight: 700,
        fontFamily: 'inherit',
        width: 40,
        height: 48,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: theme.palette.neutral[300],
        borderRadius: 6,
        p: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: theme.palette.neutral[700],
        transition: 'border-color,border-width 0.1s ease-in-out',
        outline: 'none',
        '&:focus': {
            borderColor: theme.palette.primary.main,
            borderWidth: 4,
            outline: 'none',
        },
    },
}));

export const CodeField: FC<CodeFieldProps> = ({
    autoFocus = true,
    allowedCharacters = 'numeric',
    onChange,
    ref,
}) => {
    const theme: Theme = useTheme();

    return (
        // <Case theme={theme}>
        <AuthCode
            autoFocus={autoFocus}
            allowedCharacters={allowedCharacters}
            onChange={onChange}
            ref={ref}
        />
        // </Case>
    );
};
