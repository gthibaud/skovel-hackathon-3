import { Theme } from '@emotion/react';
import './fonts.css';

const colors = {
    contrast: {
        0: '#FFFFFF',
        20: '#CCCED3',
        30: '#E0E0E1',
        40: '#97999E',
        50: '#5D5F64',
        60: '#ADADAD',
        100: '#000000',
    },
    primary: {
        100: '#007AFF',
    },
    positive: {
        100: '#3478F6',
        80: '#0A4FC6',
    },
    negative: {
        100: '#EF476F',
        80: '#EB4D3D',
    },
    neutral: {
        100: '#2A55EC',
        50: '#5394EF',
        30: '#4595F7',
        20: '#B5CBFB',
    },
    palette: {
        blue: '#0A77FF',
    },
};

export const themeBase: Theme = {
    isLightTheme: true,
    isDarkTheme: false,
    fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    transition: {
        primary: 'all 0.1s ease-in-out',
    },
    colors: {
        primary: colors.primary[100],
        surface: {
            primary: colors.contrast[0],
            secondary: '#F9FAFB',
            accent: '#f3f4f7',
            positive: colors.positive[80],
            negative: colors.negative[80],
            transparent: 'transparent',
            neutral: colors.neutral[50],
            neutralAccent: colors.neutral[100],
            neutralLight: colors.neutral[20],
            neutralLightAccent: colors.neutral[30],
            colorPrimary: colors.primary[100],
            paletteBlue: colors.palette.blue,
            divider: colors.contrast['30'],
            glass: 'rgba(16, 16, 15, 0.7)',
            ice: 'rgba(255, 255, 255, 0.9)',
        },
        text: {
            body: '#302F2A',
            light: colors.contrast[50],
            link: colors.contrast[40],
            white: colors.contrast[0],
            whiteSecondary: colors.contrast['20'],
            disabled: '#B0B3BC',
            primary: colors.primary[100],
            positive: colors.positive[100],
            negative: colors.negative[100],
        },
        divider: {
            primary: colors.contrast['30'],
            glass: colors.contrast[50],
        },
    },
    divider: {
        primary: `1px solid ${colors.contrast['30']}`,
        primaryActive: `1px solid ${colors.primary[100]}`,
        glass: `1px solid ${colors.contrast[50]}`,
    },
    radius: {
        primary: '8px',
        large: '14px',
        small: '6px',
        // Works only for a distance of 1px (outerRadius - distance)
        primaryInside: '7px',
        largeInside: '13px',
        none: '0px',
    },
    breakpoints: {
        up: (key) => up(key),
        down: (key) => down(key),
        values: {
            nu: 0,
            xs: 340,
            sx: 500,
            sm: 780,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    blur: {
        glass: 15,
    },
    shadow: {
        input: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
        inputActive: '0px 1px 8px 4px rgba(9, 30, 66, 0.1)',
    },
    size: {
        pagePadding: 16,
    },
};

const up = (key: keyof Theme['breakpoints']['values']) =>
    `@media (min-width:${themeBase.breakpoints.values[key]}px)`;
const down = (key: keyof Theme['breakpoints']['values']) =>
    `@media (max-width:${themeBase.breakpoints.values[key]}px)`;

export const isThemeColor = (color: string) => {
    return !(color?.startsWith('#') || color?.startsWith('rgb'));
};
