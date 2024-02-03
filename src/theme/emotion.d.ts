import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        isLightTheme: boolean;
        isDarkTheme: boolean;
        breakpoints: {
            down: (key: keyof Theme['breakpoints']['values']) => string;
            up: (key: keyof Theme['breakpoints']['values']) => string;
            values: {
                nu: number;
                xs: number;
                sx: number;
                sm: number;
                md: number;
                lg: number;
                xl: number;
            };
        };
        fontFamily: string;
        divider: {
            primary: string;
            primaryActive: string;
            glass: string;
        };
        radius: {
            primary: string;
            large: string;
            small: string;
            // For objects inside a container that have a radius
            primaryInside: string;
            largeInside: string;
            none: string;
        };
        transition: {
            primary: string;
        };
        colors: {
            primary: string;
            surface: {
                primary: string;
                secondary: string;
                accent: string;
                positive: string;
                negative: string;
                neutral: string;
                neutralAccent: string;
                neutralLight: string;
                neutralLightAccent: string;
                transparent: string;
                colorPrimary: string;
                paletteBlue: string;
                divider: string;
                glass: string;
                ice: string;
            };
            text: {
                body: string;
                light: string;
                disabled: string;
                link: string;
                white: string;
                whiteSecondary: string;
                primary: string;
                positive: string;
                negative: string;
            };
            divider: {
                primary: string;
                glass: string;
            };
        };
        blur: {
            glass: number;
        };
        shadow: {
            input: string;
            inputActive: string;
        };
        size: {
            pagePadding: number;
        };
    }
}
