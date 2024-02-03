/** @jsxImportSource @emotion/react */
import { Interpolation, Theme, useTheme } from '@emotion/react';
import { CSSProperties, ElementType, FC } from 'react';
import { useNavigate } from 'react-router';
import { isThemeColor } from '../../../src/theme/themeBase';
import { TiltingContainer } from '../Container/Titling';
import { Skeleton } from '../Skeleton';
import { Tooltip } from '../Tooltip';

export interface IconButtonProps {
    icon: ElementType;
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    disabledMessage?: string;
    to?: string;
    size?: number;
    color?: keyof Theme['colors']['text'] | string;
    padding?: number;
    background?: keyof Theme['colors']['surface'];
    shape?: 'circle' | 'rounded' | 'square';
    isLoading?: boolean;
    loaderColor?: keyof Theme['colors']['text'];
    border?: keyof Theme['colors']['surface'];
    raw?: boolean; // Display only the icon, without any container
    style?: Interpolation<CSSProperties>;
    disableTitling?: boolean;
}

export const IconButton: FC<IconButtonProps> = ({
    icon: Icon,
    title,
    onClick,
    to = '/',
    size = 22,
    disabled = false,
    disabledMessage,
    color = 'light',
    padding = 14,
    background = 'primary',
    shape = 'rounded',
    isLoading = false,
    loaderColor,
    border,
    style,
    raw = false,
    disableTitling = true,
}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const iconColor = isThemeColor(color)
        ? theme.colors.text[color as keyof Theme['colors']['text']]
        : color;

    const sizeValue = raw ? `${size}px` : `${Math.round(size + padding / 2 + 6)}px`;
    const radiusValue =
        shape === 'circle' ? '50%' : shape === 'rounded' ? theme.radius.primary : '0';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        } else {
            navigate(to);
        }
    };

    if (isLoading) {
        return (
            <Tooltip title="Loading...">
                <TiltingContainer disabled={disableTitling}>
                    <div
                        style={{
                            width: sizeValue,
                            height: sizeValue,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Skeleton
                            width={size}
                            height={size}
                            variant="rounded"
                        />
                    </div>
                </TiltingContainer>
            </Tooltip>
        );
    }

    const renderButton = () => (
        <button
            disabled={disabled}
            css={{
                width: sizeValue,
                height: sizeValue,
                padding: '0',
                borderRadius: radiusValue,
                transition: theme.transition.primary,
                backgroundColor: raw ? 'transparent' : theme.colors.surface[background],
                border: border ? `1px solid ${theme.colors.surface[border]}` : 'none',
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
                ...(style as CSSProperties),
            }}
            onClick={handleClick}
        >
            <Icon
                color={iconColor}
                size={size}
                style={{
                    height: raw && sizeValue,
                    width: raw && sizeValue,
                    display: 'flex',
                    margin: raw ? 0 : 'auto',
                    padding: 0,
                }}
            />
        </button>
    );

    const renderTitlingContainer = () =>
        disableTitling ? (
            renderButton()
        ) : (
            <div>
                <TiltingContainer disabled={disableTitling}>{renderButton()}</TiltingContainer>
            </div>
        );

    if (raw) {
        return renderButton();
    }

    return <Tooltip title={disabledMessage || title || ''}>{renderTitlingContainer()}</Tooltip>;
};
