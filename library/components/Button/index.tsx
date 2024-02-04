/** @jsxImportSource @emotion/react */

'use client';

import { isThemeColor } from '@/theme/themeBase';
import { Interpolation, Theme, useTheme } from '@emotion/react';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CSSProperties, ElementType, FC } from 'react';
import { WidthProps, generateWidth } from '../../props/width';
import { HorizontalContainer } from '../Container/Horizontal';
import { TiltingContainer } from '../Container/Titling';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

export interface ButtonProps extends WidthProps {
    to?: string;
    title?: string | undefined | null;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children?: string | JSX.Element | JSX.Element[] | undefined | null;
    background?: keyof Theme['colors']['surface'] | string;
    color?: keyof Theme['colors']['text'] | string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    iconPadding?: number;
    isLoading?: boolean;
    startIcon?: ElementType;
    endIcon?: ElementType;
    iconSize?: number;
    notAvailable?: boolean;
    titleNotAvailable?: string;
    notAvailableButtonLabel?: string;
    notAvailableFeatureName?: string;
    component?: any;
    style?: Interpolation<CSSProperties>;
    textStyle?: Interpolation<CSSProperties>;
    iconStyle?: Interpolation<CSSProperties>;
    type?: 'button' | 'submit' | 'reset';
    fwdRef?: any;
    alignContent?: 'center' | 'start' | 'end';
    disableTitling?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        to = '/',
        title = '',
        onClick,
        onMouseEnter,
        onMouseLeave,
        disabled = false,
        background = 'colorPrimary',
        iconPadding = 8,
        size = 'medium',
        isLoading = false,
        children = '',
        iconSize = 16,
        endIcon: EndIcon,
        startIcon: StartIcon,
        notAvailable = false,
        titleNotAvailable = '',
        color = 'white',
        type = 'button',
        style,
        textStyle,
        fwdRef,
        alignContent = 'center',
        disableTitling = true,
        iconStyle,
    } = props;

    const theme = useTheme();
    const router = useRouter();
    const backgroundColor = isThemeColor(background)
        ? theme.colors.surface[background as keyof Theme['colors']['surface']]
        : background;
    const textColor = isThemeColor(color)
        ? theme.colors.text[color as keyof Theme['colors']['text']]
        : color;

    // const renderButton = () => (
    //     <MuiButton
    //         // endIcon={endIcon}
    //         // startIcon={startIcon}
    //         // color={color}
    //         size={size}
    //         onClick={onClick || (() => window.open(to, '_blank'))}
    //         disabled={disabled || isLoading || notAvailable}
    //         // variant={variant}
    //         // sx={{ width: '100%', ...sx, ...css }}
    //         {...rest}
    //     >
    //         {children}
    //     </MuiButton>
    // );

    if (isLoading) {
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress
                    sx={{
                        color: backgroundColor,
                        my: 1,
                    }}
                    size={22}
                    thickness={8}
                />
            </Box>
        );
    }

    // if (notAvailable) {
    //     return (
    //         // <NotAvailableTooltip
    //         // message={notAvailableMessage}
    //         // featureName={notAvailableFeatureName}
    //         // >
    //         // { renderButton() }
    //         // </NotAvailableTooltip>
    //     );
    // }

    const renderContent = () => {
        if (StartIcon || EndIcon) {
            return (
                <HorizontalContainer
                    gap={iconPadding}
                    style={{
                        justifyContent: alignContent,
                    }}
                >
                    {StartIcon && (
                        <StartIcon
                            color={textColor}
                            size={iconSize}
                            style={{
                                display: 'flex',
                                margin: '0',
                                ...(iconStyle as CSSProperties),
                            }}
                        />
                    )}
                    {typeof children === 'string' ? (
                        <Typography
                            color={color}
                            size={14}
                            weight={500}
                            style={{ ...(textStyle as CSSProperties) }}
                        >
                            {children}
                        </Typography>
                    ) : (
                        children
                    )}
                    {EndIcon && (
                        <EndIcon
                            color={textColor}
                            size={iconSize}
                            style={{
                                display: 'flex',
                                margin: '0',
                                height: '100%',
                                ...(iconStyle as CSSProperties),
                            }}
                        />
                    )}
                </HorizontalContainer>
            );
        } else {
            if (typeof children === 'string') {
                return (
                    <Typography
                        color={color}
                        size={14}
                        weight={500}
                        style={{ ...(textStyle as CSSProperties) }}
                    >
                        {children}
                    </Typography>
                );
            } else {
                return children;
            }
        }
    };

    const renderButton = () => (
        <button
            ref={fwdRef}
            disabled={disabled || isLoading || notAvailable}
            css={{
                border: 'none',
                width: generateWidth(props, 'fit-content'),
                textAlign: 'center',
                padding: '10px 12px',
                borderRadius: theme.radius.small,
                transition: theme.transition.primary,
                backgroundColor,
                ':hover': {
                    cursor: 'pointer',
                    filter: 'brightness(0.95)',
                    transform: 'scale(0.99)',
                },
                ':active': {
                    filter: 'brightness(0.8)',
                    transform: 'scale(0.95)',
                },
                ':disabled': {
                    cursor: 'not-allowed',
                    filter: 'grayscale(1)',
                },
                ...(style as CSSProperties),
            }}
            type={type}
            onClick={(e) => {
                onClick
                    ? onClick(e)
                    : to.startsWith('http') || to.startsWith('mailto')
                      ? window.open(to, '_blank')
                      : router.push(to);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {renderContent()}
        </button>
    );

    if (notAvailable) {
        return (
            <Tooltip title={notAvailable ? titleNotAvailable : title || ''}>
                {renderButton()}
            </Tooltip>
        );
    }

    if (disabled || disableTitling) {
        return renderButton();
    }

    return (
        <div
            style={{
                width: generateWidth(props, 'fit-content'),
            }}
        >
            <TiltingContainer
                fullWidth={props.fullWidth}
                disabled={disabled || disableTitling}
            >
                {renderButton()}
            </TiltingContainer>
        </div>
    );
};
