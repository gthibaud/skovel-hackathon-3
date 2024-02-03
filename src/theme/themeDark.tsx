import { Theme } from '@emotion/react';
import { themeBase } from './themeBase';

const colors = {
    contrast: {
        0: '#000000',
        10: '#05080C',
        20: '#14171C',
        30: '#282B32',
        40: '#1F2227',
        50: '#5D5F64',
        70: '#9299A3',
        80: '#C2C6CC',
        90: '#E4EAF1',
        100: '#FFFFFF',
    },
    primary: {
        100: '#0A84FF',
    },
    positive: {
        100: '#06D6A0',
        80: '#0A4FC6',
    },
    negative: {
        100: '#EF476F',
        80: '#EB4D3D',
    },
    neutral: {
        100: '#559CF8',
        50: '#3170EF',
        30: '#679FEF',
        20: '#6083B8',
    },
    palette: {
        blue: '#0A77FF',
    },
};

export const themeDark: Theme = {
    ...themeBase,
    isLightTheme: false,
    isDarkTheme: true,
    colors: {
        ...themeBase.colors,
        divider: {
            primary: colors.contrast[40],
            glass: colors.contrast[40],
        },
        primary: colors.primary[100],
        surface: {
            ...themeBase.colors.surface,
            primary: colors.contrast[20],
            secondary: colors.contrast[10],
            accent: colors.contrast[30],
            // positive: colors.positive[80],
            // negative: colors.negative[80],
            // transparent: 'transparent',
            // neutral: colors.contrast[40],
            colorPrimary: colors.primary[100],
            // paletteBlue: colors.palette.blue,
            divider: colors.contrast[40],
            // glass: 'rgba(16, 16, 15, 0.70)',
            neutral: colors.neutral[50],
            neutralAccent: colors.neutral[100],
            neutralLight: colors.neutral[20],
            neutralLightAccent: colors.neutral[30],
            ice: 'rgba(0, 0, 0, 0.9)',
        },
        text: {
            ...themeBase.colors.text,
            body: colors.contrast[90],
            light: colors.contrast[80],
            link: colors.contrast[70],
            white: colors.contrast[100],
            // whiteSecondary: colors.contrast[30],
            // disabled: '#B0B3BC',
            primary: colors.primary[100],
            // positive: colors.positive[100],
            // negative: colors.negative[100],
        },
    },
    divider: {
        primary: `1px solid ${colors.contrast[40]}`,
        primaryActive: `1px solid ${colors.contrast[40]}`,
        glass: `1px solid ${colors.contrast[40]}`,
    },
};
