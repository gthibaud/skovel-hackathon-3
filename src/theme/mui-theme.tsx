import type { Direction, Theme, ThemeOptions } from '@mui/material';
import {
    alpha,
    createTheme as createMuiTheme,
    responsiveFontSizes,
    TypographyStyle,
} from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { getZIndex } from '../../library/utils/z-index';
import {
    darkBackground,
    darkError,
    darkInfo,
    darkNeutral,
    darkPrimary,
    darkSecondary,
    darkSuccess,
    darkText,
    darkWarning,
    lightBackground,
    lightError,
    lightInfo,
    lightNeutral,
    lightPrimary,
    lightSecondary,
    lightSuccess,
    lightText,
    lightWarning,
    paletteDark,
    paletteExtraDark,
    paletteExtraLight,
    paletteLight,
    primaryLight,
    secondaryLight,
} from './mui-colors';

declare module '@mui/material/styles/createTypography' {
    interface Typography {
        code: TypographyStyle;
    }

    // allow configuration using `createMuiTheme`
    interface TypographyOptions {
        code?: TypographyStyleOptions;
    }
}

declare module '@mui/material/Typography/Typography' {
    interface TypographyPropsVariantOverrides {
        code: true;
    }
}

export const { breakpoints } = createMuiTheme();

interface ThemeConfig {
    direction?: Direction;
    theme?: string;
}

interface ExtendedPaletteOptions extends PaletteOptions {
    neutral: Record<number, string>;
    icon: {
        [k: string]: Record<number, string>;
    };
    colors: {
        [k: string]: Record<number, string>;
    };
}

interface ExtendedTypographyOptions extends TypographyOptions {
    code: TypographyStyle;
}

export interface ExtendedThemeOptions extends ThemeOptions {
    palette?: ExtendedPaletteOptions;
    typography?: ExtendedTypographyOptions;
}

export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
    let themeOptions = config.theme === 'light' ? lightThemeOptionsLegacy : darkThemeOptionsLegacy;

    if (!themeOptions) {
        console.warn(new Error(`The theme ${config.theme} is not valid`));
        themeOptions = lightThemeOptionsLegacy;
    }

    const theme = responsiveFontSizes(
        createMuiTheme(
            { ...baseThemeOptionsLegacy(breakpoints) },
            { ...themeOptions },
            {
                direction: config.direction,
            },
        ),
    );

    return theme;
};

export const baseThemeOptionsLegacy = (br: any): ExtendedThemeOptions => {
    return {
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    noOptions: {
                        fontSize: 14,
                        letterSpacing: 0.15,
                        lineHeight: 1.6,
                    },
                    option: {
                        fontSize: 14,
                        letterSpacing: 0.15,
                        lineHeight: 1.6,
                    },
                    paper: {
                        boxShadow: 'none',
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: alpha(paletteDark.black, 0.6),
                        backdropFilter: 'blur(15px)',
                        boxShadow: `0 0 10px 0 ${alpha(paletteDark.black, 0.1)}`,
                        borderRadius: 7,
                        padding: '6px 10px',
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: 0,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    sizeLarge: {
                        fontSize: 15,
                    },
                    sizeMedium: {
                        fontSize: 14,
                    },
                    sizeSmall: {
                        fontSize: 13,
                    },
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiCardActions: {
                styleOverrides: {
                    root: {
                        paddingBottom: 16,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 16,
                    },
                },
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        paddingBottom: 20,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 20,
                    },
                },
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        paddingBottom: 16,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 16,
                    },
                    subheader: {
                        fontSize: 14,
                    },
                    title: {
                        fontSize: 16,
                    },
                },
            },
            MuiCheckbox: {
                defaultProps: {
                    checkedIcon: (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="18"
                                height="18"
                                rx="4"
                                fill="currentColor"
                            />
                            <rect
                                x="2"
                                y="2"
                                width="14"
                                height="14"
                                rx="2"
                                fill="currentColor"
                            />
                            <path
                                d="M13.6666 6.0835L7.24992 12.5002L4.33325 9.5835"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                    indeterminateIcon: (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H14C16.2091 18 18 16.2091 18 14V4C18 1.79086 16.2091 0 14 0Z"
                                fill="currentColor"
                            />
                            <path
                                d="M13.6666 9H5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                },
                styleOverrides: {
                    root: {
                        transition: 'color 250ms',
                        ':hover, &.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiChip: {
                defaultProps: {
                    // deleteIcon: <XCircleIcon />,
                },
                styleOverrides: {
                    avatar: {
                        borderRadius: 6,
                    },
                    root: {
                        borderRadius: 6,
                        fontWeight: 400,
                        letterSpacing: 0,
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        minHeight: '100%',
                        overflowY: 'auto',
                        overscrollBehavior: 'contain',
                    },
                    body: {
                        // height: '100%',
                        minHeight: '100%',
                    },
                    '& #root': {
                        // height: '100%',
                        minHeight: '100%',
                    },
                    '& #nprogress .bar': {
                        backgroundColor: primaryLight['120'],
                        zIndex: getZIndex('4'),
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        paddingBottom: 32,
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingTop: 24,
                        '&>:not(:first-of-type)': {
                            marginLeft: 16,
                        },
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        paddingBottom: 8,
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingTop: 8,
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontSize: 24,
                        fontWeight: 600,
                        paddingBottom: 24,
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingTop: 32,
                    },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        fontSize: 14,
                        letterSpacing: 0.15,
                        lineHeight: 1.43,
                    },
                },
            },
            MuiIcon: {
                styleOverrides: {
                    fontSizeLarge: {
                        fontSize: 32,
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        padding: 8,
                    },
                    sizeSmall: {
                        padding: 4,
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    button: {
                        '&:before': {
                            borderRadius: '0px 2px 2px 0px',
                            bottom: 0,
                            content: '""',
                            left: 0,
                            position: 'absolute',
                            top: 0,
                            transform: 'scaleX(0)',
                            transformOrigin: 'left center',
                            transition: 'transform 0.25s',
                            width: 2,
                        },
                        '&:active:before': {
                            transform: 'scaleX(1)',
                        },
                    },
                    dense: {
                        paddingBottom: 6,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 6,
                    },
                },
            },
            MuiListItemText: {
                defaultProps: {
                    primaryTypographyProps: {
                        variant: 'body2',
                    },
                },
            },
            MuiListSubheader: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'transparent',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: 0.15,
                        lineHeight: 1.43,
                    },
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        transition: 'color 250ms',
                        ':hover, &.Mui-checked:hover': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    filled: {
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiSkeleton: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    fontSizeLarge: {
                        fontSize: 32,
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        borderRadius: 48,
                        height: 22,
                        marginBottom: 8,
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 8,
                        padding: 0,
                        width: 32,
                    },
                    switchBase: {
                        padding: 4,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        '&.Mui-checked+.MuiSwitch-track': {
                            opacity: 1,
                        },
                        '&.Mui-checked': {
                            opacity: 1,
                            transform: 'translateX(10px)',
                        },
                        '&.Mui-disabled': {
                            '&+.MuiSwitch-track': {
                                opacity: 1,
                            },
                        },
                        '&.Mui-checked.Mui-disabled+.MuiSwitch-track': {
                            opacity: 0.5,
                        },
                    },
                    track: {
                        opacity: 1,
                    },
                    thumb: {
                        height: 14,
                        width: 14,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: 0.15,
                        lineHeight: 1.71,
                        [br.up('sm')]: {
                            marginLeft: 16,
                            marginRight: 16,
                            minWidth: 'fit-content',
                            paddingLeft: 0,
                            paddingRight: 0,
                            '&:first-of-type': {
                                marginLeft: 0,
                            },
                        },
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        '.MuiTableCell-root': {
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                        },
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        ':last-of-type .MuiTableCell-root': {
                            borderWidth: 0,
                        },
                    },
                },
            },
        },
        shape: {
            borderRadius: 6,
        },
        typography: {
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            h1: {
                fontSize: 48,
                fontWeight: 600,
                lineHeight: 1.5,
                // fontFamily: 'Sora, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
            },
            h2: {
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.5,
                // fontFamily: 'Sora,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
            },
            h3: {
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.5,
                // fontFamily: 'Sora,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
            },
            h4: {
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1.5,
                // fontFamily: 'Sora,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
            },
            h5: {
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.5,
            },
            h6: {
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.5,
            },
            body1: {
                fontSize: 14,
                fontWeight: 400,
            },
            body2: {
                lineHeight: 1.6,
                fontSize: 14,
                fontWeight: 500,
            },
            subtitle1: {
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: 0,
                lineHeight: 1.75,
            },
            subtitle2: {
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 0,
                lineHeight: 1.75,
            },
            code: {
                fontSize: 13,
                fontWeight: 600,
                fontFamily: '"SF Mono", "Liberation Mono", Menlo, Courier, monospace',
                color: secondaryLight['80'],
            },
            caption: {
                fontWeight: 400,
                lineHeight: 1.6,
            },
            overline: {
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
                lineHeight: 2.46,
            },
            button: {
                fontWeight: 500,
                textTransform: 'none',
            },
        },
    };
};

export const darkThemeOptionsLegacy: ExtendedThemeOptions = {
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: darkNeutral[400],
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: darkNeutral[200],
                    color: darkText.secondary,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    ':focus': {
                        boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    background: darkBackground.subtle,
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                icon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="4"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="2"
                            fill={darkBackground.paper}
                        />
                    </svg>
                ),
            },
            styleOverrides: {
                root: {
                    color: darkText.secondary,
                    ':hover:not(.Mui-checked)': {
                        color: darkText.primary,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                avatar: {
                    color: darkNeutral[700],
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                button: {
                    '&:before': {
                        backgroundColor: darkPrimary.main,
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    border: `1px solid ${darkNeutral[300]}`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiRadio: {
            defaultProps: {
                checkedIcon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="9"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="7"
                            fill="currentColor"
                        />
                        <rect
                            x="5"
                            y="5"
                            width="8"
                            height="8"
                            rx="4"
                            fill={darkBackground.paper}
                        />
                    </svg>
                ),
                icon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="9"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="7"
                            fill={darkBackground.paper}
                        />
                    </svg>
                ),
            },
            styleOverrides: {
                root: {
                    color: darkText.secondary,
                    ':hover:not(.Mui-checked)': {
                        color: darkText.primary,
                    },
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: darkNeutral[100],
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    ':focus-within': {
                        boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
                    },
                },
                switchBase: {
                    '&.Mui-checked+.MuiSwitch-track': {
                        backgroundColor: darkSuccess.main,
                    },
                    '&.Mui-disabled': {
                        '&+.MuiSwitch-track': {
                            backgroundColor: alpha(lightText.primary, 0.08),
                        },
                        '.MuiSwitch-thumb': {
                            backgroundColor: alpha(lightText.primary, 0.26),
                        },
                    },
                    '&.Mui-checked.Mui-disabled+.MuiSwitch-track': {
                        backgroundColor: darkSuccess.main,
                    },
                },
                track: {
                    backgroundColor: darkNeutral[500],
                },
                thumb: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${darkNeutral[200]}`,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: darkNeutral[100],
                    borderBottom: `1px solid ${darkNeutral[200]}`,
                    '.MuiTableCell-root': {
                        color: darkText.secondary,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&.MuiTableRow-hover:hover': {
                        backgroundColor: darkNeutral[100],
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderColor: darkNeutral[300],
                    '& .MuiSvgIcon-root': {
                        color: alpha(darkText.primary, 0.38),
                    },
                },
            },
        },
    },
    palette: {
        action: {
            active: alpha(darkText.secondary, 0.86),
            disabled: alpha(darkText.primary, 0.26),
            disabledBackground: alpha(darkText.primary, 0.08),
            focus: alpha(darkText.primary, 0.12),
            hover: alpha(darkText.primary, 0.06),
            selected: alpha(darkText.primary, 0.08),
        },
        background: {
            default: darkBackground.default,
            paper: darkBackground.paper,
        },
        divider: darkNeutral[200],
        error: {
            contrastText: darkError.contrast,
            dark: darkError.dark,
            light: darkError.light,
            main: darkError.main,
        },
        info: {
            contrastText: darkInfo.contrast,
            dark: darkInfo.dark,
            light: darkInfo.light,
            main: darkInfo.main,
        },
        mode: 'dark',
        primary: {
            contrastText: darkPrimary.contrast,
            dark: darkPrimary.dark,
            light: darkPrimary.light,
            main: darkPrimary.main,
        },
        secondary: {
            contrastText: darkSecondary.contrast,
            dark: darkSecondary.dark,
            light: darkSecondary.light,
            main: darkSecondary.main,
        },
        success: {
            contrastText: darkSuccess.contrast,
            dark: darkSuccess.dark,
            light: darkSuccess.light,
            main: darkSuccess.main,
        },
        text: {
            disabled: alpha(darkText.primary, 0.38),
            primary: darkText.primary,
            secondary: darkText.secondary,
        },
        icon: {
            default: secondaryLight['70'],
        },
        warning: {
            contrastText: darkWarning.contrast,
            dark: darkWarning.dark,
            light: darkWarning.light,
            main: darkWarning.main,
        },
        neutral: darkNeutral,
        colors: {
            red: paletteDark.red,
            orange: paletteDark.orange,
            yellow: paletteDark.yellow,
            green: paletteDark.green,
            mint: paletteDark.mint,
            teal: paletteDark.teal,
            cyan: paletteDark.cyan,
            blue: paletteDark.blue,
            indigo: paletteDark.indigo,
            purple: paletteDark.purple,
            pink: paletteDark.pink,
            brown: paletteDark.brown,
            gray: paletteDark.gray,
            black: paletteDark.black,
            white: paletteDark.white,
            github: paletteExtraDark.github,
            githubHover: paletteExtraDark.githubHover,
        },
    },
    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
        '0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
        '0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        '0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
        '0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
        '0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
        '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
        '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
        '0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
        '0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
        '0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
        '0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
        '0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
        '0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
        '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
        '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
        '0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
        '0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
        '0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
    ],
};

export const lightThemeOptionsLegacy: ExtendedThemeOptions = {
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: lightNeutral[400],
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: lightNeutral[200],
                    color: lightText.secondary,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    ':focus': {
                        boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
                    },
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                icon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="4"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="2"
                            fill={lightBackground.paper}
                        />
                    </svg>
                ),
            },
            styleOverrides: {
                root: {
                    color: lightText.secondary,
                    ':hover:not(.Mui-checked)': {
                        color: lightText.primary,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                avatar: {
                    color: lightNeutral[700],
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                button: {
                    '&:before': {
                        backgroundColor: lightPrimary.main,
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    border: `1px solid ${lightNeutral[300]}`,
                },
            },
        },
        MuiRadio: {
            defaultProps: {
                checkedIcon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="9"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="7"
                            fill="currentColor"
                        />
                        <rect
                            x="5"
                            y="5"
                            width="8"
                            height="8"
                            rx="4"
                            fill={lightBackground.paper}
                        />
                    </svg>
                ),
                icon: (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="9"
                            fill="currentColor"
                        />
                        <rect
                            x="2"
                            y="2"
                            width="14"
                            height="14"
                            rx="7"
                            fill={lightBackground.paper}
                        />
                    </svg>
                ),
            },
            styleOverrides: {
                root: {
                    color: lightText.secondary,
                    ':hover:not(.Mui-checked)': {
                        color: lightText.primary,
                    },
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: lightNeutral[100],
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    ':focus-within': {
                        boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
                    },
                },
                switchBase: {
                    '&.Mui-checked+.MuiSwitch-track': {
                        backgroundColor: lightSuccess.main,
                    },
                    '&.Mui-disabled': {
                        '&+.MuiSwitch-track': {
                            backgroundColor: alpha(lightText.primary, 0.08),
                        },
                        '.MuiSwitch-thumb': {
                            backgroundColor: alpha(lightText.primary, 0.26),
                        },
                    },
                    '&.Mui-checked.Mui-disabled+.MuiSwitch-track': {
                        backgroundColor: lightSuccess.main,
                    },
                },
                track: {
                    backgroundColor: lightNeutral[500],
                },
                thumb: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${lightNeutral[200]}`,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: lightNeutral[100],
                    borderBottom: `1px solid ${lightNeutral[200]}`,
                    '.MuiTableCell-root': {
                        color: lightText.secondary,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&.MuiTableRow-hover:hover': {
                        backgroundColor: lightNeutral[100],
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderColor: lightNeutral[300],
                    '& .MuiSvgIcon-root': {
                        color: alpha(lightText.primary, 0.38),
                    },
                },
            },
        },
    },
    palette: {
        action: {
            active: alpha(lightText.secondary, 0.86),
            disabled: alpha(lightText.primary, 0.26),
            disabledBackground: alpha(lightText.primary, 0.08),
            focus: alpha(lightText.primary, 0.12),
            hover: alpha(lightText.primary, 0.06),
            selected: alpha(lightText.primary, 0.08),
        },
        background: {
            default: secondaryLight[10],
            paper: secondaryLight[0],
        },
        divider: lightNeutral[200],
        error: {
            contrastText: lightError.contrast,
            dark: lightError.dark,
            light: lightError.light,
            main: lightError.main,
        },
        info: {
            contrastText: lightInfo.contrast,
            dark: lightInfo.dark,
            light: lightInfo.light,
            main: lightInfo.main,
        },
        mode: 'light',
        primary: {
            contrastText: lightPrimary.contrast,
            dark: lightPrimary.dark,
            light: lightPrimary.light,
            main: lightPrimary.main,
        },
        secondary: {
            contrastText: lightSecondary.contrast,
            dark: lightSecondary.dark,
            light: lightSecondary.light,
            main: lightSecondary.main,
        },
        success: {
            contrastText: lightSuccess.contrast,
            dark: lightSuccess.dark,
            light: lightSuccess.light,
            main: lightSuccess.main,
        },
        text: {
            disabled: secondaryLight['60'],
            primary: secondaryLight['100'],
            secondary: secondaryLight['80'],
        },
        icon: {
            default: secondaryLight['70'],
        },
        warning: {
            contrastText: lightWarning.contrast,
            dark: lightWarning.dark,
            light: lightWarning.light,
            main: lightWarning.main,
        },
        neutral: lightNeutral,
        colors: {
            red: paletteLight.red,
            orange: paletteLight.orange,
            yellow: paletteLight.yellow,
            green: paletteLight.green,
            mint: paletteLight.mint,
            teal: paletteLight.teal,
            cyan: paletteLight.cyan,
            blue: paletteLight.blue,
            indigo: paletteLight.indigo,
            purple: paletteLight.purple,
            pink: paletteLight.pink,
            brown: paletteLight.brown,
            gray: paletteLight.gray,
            black: paletteLight.black,
            white: paletteLight.white,
            github: paletteExtraLight.github,
            githubHover: paletteExtraLight.githubHover,
        },
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(9, 30, 66, 0.2)',
        '0px 1px 3px rgba(9, 30, 66, 0.12)',
        '0px 2px 4px rgba(9, 30, 66, 0.08)',
        '0px 3px 5px rgba(9, 30, 66, 0.08)',
        '0px 3px 5px -1px rgba(9, 30, 66, 0.08)',
        '0px 5px 7px rgba(9, 30, 66, 0.08)',
        '0px 6px 8px rgba(9, 30, 66, 0.08)',
        '0px 8px 12px rgba(9, 30, 66, 0.08)',
        '0px 9px 14px rgba(9, 30, 66, 0.08)',
        '0px 10px 16px rgba(9, 30, 66, 0.08)',
        '0px 11px 18px rgba(9, 30, 66, 0.08)',
        '0px 12px 20px rgba(9, 30, 66, 0.08)',
        '0px 13px 22px rgba(9, 30, 66, 0.08)',
        '0px 14px 24px rgba(9, 30, 66, 0.08)',
        '0px 15px 26px rgba(9, 30, 66, 0.08)',
        '0px 18px 28px rgba(9, 30, 66, 0.08)',
        '0px 20px 30px rgba(9, 30, 66, 0.08)',
        '0px 22px 32px rgba(9, 30, 66, 0.08)',
        '0px 24px 34px rgba(9, 30, 66, 0.08)',
        '0px 26px 36px rgba(9, 30, 66, 0.08)',
        '0px 28px 38px rgba(9, 30, 66, 0.08)',
        '0px 30px 40px rgba(9, 30, 66, 0.08)',
        '0px 32px 42px rgba(9, 30, 66, 0.08)',
        '0px 36px 46px rgba(9, 30, 66, 0.12)',
    ],
};
