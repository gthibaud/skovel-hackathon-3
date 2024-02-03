import { Interpolation, useTheme } from '@emotion/react';
import type { CSSProperties, FC } from 'react';
import { generateMarginTop, MarginProps } from '../../props/margin';
import { VerticalContainer } from '../Container/Vertical';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

interface AvatarProps extends MarginProps {
    alt: string; // The alt of the avatar
    src?: string; // The image source
    size?: number; // The size of the avatar
    style?: Interpolation<CSSProperties>; // Custom style
    tooltip?: boolean; // Display the alt as a tooltip
    variant?: 'circle' | 'square' | 'rounded'; // The shape of the avatar
    title?: string; // The title will be displayed under the avatar
    onClick?: () => void; // On click on the avatar
    active?: boolean; // If true, the avatar will be highlighted
    fallback?: string; // The fallback letter to display if no image is provided. Default to the first 2 letters of the alt
}

export const Avatar: FC<AvatarProps> = (props) => {
    const {
        alt = '',
        src,
        size = 32,
        style,
        tooltip = false,
        variant = 'circle',
        title,
        onClick,
        active = false,
        fallback = alt.substring(0, 2),
    } = props;
    const theme = useTheme();

    const generateVariant = (): string => {
        switch (variant) {
            case 'circle':
                return `${size}px`;
            case 'square':
                return '0px';
            case 'rounded':
                return theme.radius.small;
        }
    };

    const handleClick = (event?: React.MouseEvent<any, MouseEvent>) => {
        event?.stopPropagation();

        if (onClick) {
            onClick();
        }
    };

    const renderSrc = () => {
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    aria-label={`Avatar of ${alt}`}
                    onClick={handleClick}
                    style={{
                        borderRadius: generateVariant(),
                        width: size,
                        minWidth: size,
                        height: size,
                        minHeight: size,
                        objectFit: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        marginTop: generateMarginTop(props, 0),
                        marginLeft: generateMarginTop(props, 0),
                        marginRight: generateMarginTop(props, 0),
                        marginBottom: generateMarginTop(props, 0),
                        ...(style as CSSProperties),
                    }}
                />
            );
        } else {
            return (
                <Typography
                    onClick={handleClick}
                    style={{
                        width: size,
                        minWidth: size,
                        height: size,
                        minHeight: size,
                        background: active
                            ? theme.colors.text.primary
                            : 'linear-gradient(180deg, #D9D9D9 0%, #C6C6C6 100%)',
                        color: theme.colors.text.white,
                        borderRadius: '50%',
                        fontFamily: 'SFProRounded, Inter, sans-serif',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: `${size / 2}px`,
                        textAlign: 'center',
                        lineHeight: `${size - (active ? 8 : 0)}px`,
                        margin: '0',
                        border: active ? `4px solid ${theme.colors.text.primary}` : 'none',
                        transition: 'all 0.2s',
                        ...(style as CSSProperties),
                    }}
                >
                    {fallback}
                </Typography>
            );
        }
    };

    const renderTitle = () => {
        if (title) {
            return (
                <VerticalContainer
                    gap={4}
                    margin={0}
                    align="center"
                    style={{
                        ':active': {
                            transform: 'scale(0.95)',
                            opacity: 0.8,
                        },
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    {renderSrc()}
                    <Typography
                        size={13}
                        color={active ? 'primary' : 'light'}
                        weight={active ? 600 : 500}
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: size + 28,
                            minWidth: size,
                            textAlign: 'center',
                        }}
                    >
                        {title}
                    </Typography>
                </VerticalContainer>
            );
        } else {
            return renderSrc();
        }
    };

    // If any image, use the first letter of the alt as the avatar
    return tooltip ? (
        <Tooltip title={tooltip ? alt : ''}>
            <div
                style={{
                    height: `${size}px`,
                    width: `${size}px`,
                }}
            >
                {renderTitle()}
            </div>
        </Tooltip>
    ) : (
        renderTitle()
    );
};
