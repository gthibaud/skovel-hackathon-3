import { Theme, useTheme } from '@emotion/react';

export interface SizeProps {
    /** Size */
    size?: number | string | keyof Theme['breakpoints']['values'];
    /** Is full Size */
    fullSize?: boolean;
    /** Maximum Size */
    maxSize?: number | keyof Theme['breakpoints']['values'] | 'none';
}

export const generateSize = (props: SizeProps, defaultSize: string = 'inherit'): string => {
    const { size, fullSize } = props;
    const theme = useTheme();

    if (fullSize) {
        return '100%';
    }

    if (typeof size === 'number') {
        return `${size}px`;
    }

    if (typeof size === 'string' && theme.breakpoints.values.hasOwnProperty(size)) {
        const w = theme.breakpoints.values[size as keyof Theme['breakpoints']['values']];
        return `${w}px`;
    }

    return size || defaultSize;
};

export const generateMaxSize = (props: SizeProps, defaultMaxSize: string = 'auto'): string => {
    const { maxSize } = props;
    const theme = useTheme();

    if (!maxSize) {
        return defaultMaxSize;
    }

    if (typeof maxSize === 'string' && theme.breakpoints.values.hasOwnProperty(maxSize)) {
        const sizeValue =
            theme.breakpoints.values[maxSize as keyof Theme['breakpoints']['values']] ||
            defaultMaxSize;

        return `${sizeValue}px`;
    }

    if (typeof maxSize === 'number') {
        return `${maxSize}px`;
    }

    return maxSize;
};
