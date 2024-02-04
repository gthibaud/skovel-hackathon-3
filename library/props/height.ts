import { Theme, useTheme } from '@emotion/react';

export interface HeightProps {
    /** Height */
    height?: number | string | keyof Theme['breakpoints']['values'];
    /** Is full height */
    fullHeight?: boolean;
    /** Maximum height */
    maxHeight?: number | keyof Theme['breakpoints']['values'] | 'none';
}

export const generateHeight = (props: HeightProps, defaultHeight: string = 'inherit'): string => {
    const { height, fullHeight } = props;
    const theme = useTheme();

    if (fullHeight) {
        return '100%';
    }

    if (typeof height === 'number') {
        return `${height}px`;
    }

    if (typeof height === 'string' && theme.breakpoints.values.hasOwnProperty(height)) {
        const w = theme.breakpoints.values[height as keyof Theme['breakpoints']['values']];
        return `${w}px`;
    }

    return height || defaultHeight;
};

export const generateMaxHeight = (
    props: HeightProps,
    defaultMaxHeight: string = 'auto',
): string => {
    const { maxHeight } = props;
    const theme = useTheme();

    if (!maxHeight) {
        return defaultMaxHeight;
    }

    if (typeof maxHeight === 'string' && theme.breakpoints.values.hasOwnProperty(maxHeight)) {
        const heightValue =
            theme.breakpoints.values[maxHeight as keyof Theme['breakpoints']['values']] ||
            defaultMaxHeight;

        return `${heightValue}px`;
    }

    if (typeof maxHeight === 'number') {
        return `${maxHeight}px`;
    }

    return maxHeight;
};
