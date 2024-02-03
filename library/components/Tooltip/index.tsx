import { Theme, useTheme } from '@emotion/react';
import { Box, Tooltip as TooltipMUI } from '@mui/material';
import { ThumbUpFill } from 'gthibaud-icons-react';
import { CSSProperties, FC } from 'react';
import { isThemeColor } from '../../../src/theme/themeBase';
import { Button } from '../Button';
import { Typography } from '../Typography';

export interface TooltipProps {
    title: string | JSX.Element | null;
    style?: CSSProperties;
    children: JSX.Element;
    buttonLabel?: string;
    buttonTo?: string;
    disabled?: boolean;
    arrow?: boolean;
    background?: keyof Theme['colors']['surface'] | string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    placement?:
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'bottom-end'
        | 'bottom-start'
        | 'left-end'
        | 'left-start'
        | 'right-end'
        | 'right-start'
        | 'top-end'
        | 'top-start'
        | undefined;
}

export const Tooltip: FC<TooltipProps> = ({
    title,
    buttonLabel,
    buttonTo,
    disabled = false,
    children,
    placement,
    arrow = false,
    style = {},
    background = 'glass',
    isOpen,
    setIsOpen = () => {},
}) => {
    const theme = useTheme();

    const backgroundColor = isThemeColor(background)
        ? theme.colors.surface[background as keyof Theme['colors']['surface']]
        : background;

    const border = background === 'glass' ? theme.divider.glass : theme.divider.primary;

    if (disabled) {
        return children;
    }

    if (buttonLabel && buttonTo) {
        return (
            <TooltipMUI
                placement={placement}
                arrow={arrow}
                open={isOpen}
                title={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            pt: 0.5,
                            pb: 1,
                            px: 0.4,
                            width: 200,
                        }}
                    >
                        <Typography
                            s={12}
                            w={500}
                        >
                            {title}
                        </Typography>
                        <Button
                            onClick={() => {
                                window.open(buttonTo || '', '_blank');
                            }}
                            style={{
                                cursor: 'pointer',
                                fontSize: '12px',
                                transition: 'all 0.2s ease-in-out',
                                backgroundColor: 'background.paper',
                                color: 'text.primary',
                                '&:hover': {
                                    transform: 'scale(1.04)',
                                    backgroundColor: 'background.paper',
                                },
                            }}
                            size="small"
                            endIcon={ThumbUpFill}
                        >
                            {buttonLabel}
                        </Button>
                    </Box>
                }
            >
                {/* {Box is mandatory to make Tooltip work if the children has a disabled state} */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>{children}</Box>
            </TooltipMUI>
        );
    }

    return (
        <TooltipMUI
            title={title}
            placement={placement}
            open={isOpen}
            onOpen={() => (setIsOpen ? setIsOpen(true) : null)}
            onClose={() => (setIsOpen ? setIsOpen(false) : null)}
            arrow={arrow}
            PopperProps={{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -8],
                        },
                    },
                ],
            }}
            componentsProps={{
                tooltip: {
                    sx: {
                        border,
                        background: backgroundColor,
                        backdropFilter: `blur(${theme.blur.glass}px)`,
                        WebkitBackgroundFilter: `blur(${theme.blur.glass}px)`,
                        backgroundBlendMode: 'overlay',
                        '& .MuiTooltip-arrow': {
                            background: backgroundColor,
                            backdropFilter: `blur(${theme.blur.glass}px)`,
                            WebkitBackgroundFilter: `blur(${theme.blur.glass}px)`,
                            backgroundBlendMode: 'overlay',
                        },
                        borderRadius: '8px',
                        fontSize: '12px',
                    },
                },
            }}
        >
            <span style={style}>{children}</span>
        </TooltipMUI>
    );
};
