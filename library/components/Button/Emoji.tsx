/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { FC } from 'react';
import { TiltingContainer } from '../Container/Titling';
import { Typography } from '../Typography';

interface EmojiButtonProps {
    emoji: string;
    alt: string;
    onClick?: () => void;
    size?: number;
    disabled?: boolean;
}

export const EmojiButton: FC<EmojiButtonProps> = ({
    emoji,
    alt,
    onClick,
    size = 22,
    disabled = false,
}) => {
    const theme = useTheme();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <TiltingContainer scale={1.6}>
            <button
                disabled={disabled}
                css={{
                    width: size,
                    height: size,
                    padding: '0',
                    background: 'none',
                    border: 'none',
                    transition: theme.transition.primary,
                    ':hover': {
                        cursor: 'pointer',
                        filter: 'brightness(0.95)',
                    },
                    ':active': {
                        filter: 'brightness(0.85)',
                    },
                    ':disabled': {
                        cursor: 'not-allowed',
                        filter: 'grayscale(1)',
                        opacity: 0.5,
                    },
                }}
                onClick={handleClick}
            >
                <Typography size={size}>{emoji}</Typography>
            </button>
        </TiltingContainer>
    );
};
