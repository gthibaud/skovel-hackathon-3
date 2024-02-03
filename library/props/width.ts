import { Theme, useTheme } from '@emotion/react';

export interface WidthProps {
    /** Width */
    width?: number | string | keyof Theme['breakpoints']['values'];
    /** Is full width */
    fullWidth?: boolean;
    /** Maximum width */
    maxWidth?: number | keyof Theme['breakpoints']['values'] | 'none';
    /** Minimum width */
    minWidth?: number | keyof Theme['breakpoints']['values'] | 'none';
}

export const generateWidth = (props: WidthProps, defaultWidth: string = 'inherit'): string => {
    const { width, fullWidth } = props;
    const theme = useTheme();

    if (fullWidth) {
        return '-webkit-fill-available';
    }

    if (typeof width === 'number') {
        return `${width}px`;
    }

    if (typeof width === 'string' && theme.breakpoints.values.hasOwnProperty(width)) {
        const w = theme.breakpoints.values[width as keyof Theme['breakpoints']['values']];
        return `${w}px`;
    }

    return width || defaultWidth;
};

export const generateMaxWidth = (props: WidthProps, defaultMaxWidth: string = 'auto'): string => {
    const { maxWidth } = props;
    const theme = useTheme();

    if (!maxWidth) {
        return defaultMaxWidth;
    }

    if (typeof maxWidth === 'string' && theme.breakpoints.values.hasOwnProperty(maxWidth)) {
        const widthValue =
            theme.breakpoints.values[maxWidth as keyof Theme['breakpoints']['values']] ||
            defaultMaxWidth;

        return `${widthValue}px`;
    }

    if (typeof maxWidth === 'number') {
        return `${maxWidth}px`;
    }

    return maxWidth;
};

export const generateMinWidth = (props: WidthProps, defaultMinWidth: string = 'auto'): string => {
    const { minWidth } = props;
    const theme = useTheme();

    if (!minWidth) {
        return defaultMinWidth;
    }

    if (typeof minWidth === 'string' && theme.breakpoints.values.hasOwnProperty(minWidth)) {
        const widthValue =
            theme.breakpoints.values[minWidth as keyof Theme['breakpoints']['values']] ||
            defaultMinWidth;

        return `${widthValue}px`;
    }

    if (typeof minWidth === 'number') {
        return `${minWidth}px`;
    }

    return minWidth;
};
