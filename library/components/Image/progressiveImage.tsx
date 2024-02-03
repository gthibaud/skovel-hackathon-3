/** @jsxImportSource @emotion/react */
import { Interpolation, useTheme } from '@emotion/react';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { Skeleton } from '../Skeleton';

interface ProgressiveImageProps {
    src: string | undefined;
    srcDark?: string;
    fallbackSrc?: string;
    alt: string;
    style: Interpolation<CSSProperties>;
    height: number;
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    innerRef?: React.Ref<HTMLImageElement>;
}

export const ProgressiveImage: FC<ProgressiveImageProps> = (props) => {
    const { src, srcDark, fallbackSrc, alt, style, height, onClick, innerRef } = props;
    const [loadState, setLoadState] = useState<'loading' | 'success' | 'error'>('loading');
    const theme = useTheme();

    // Load dynamically the image, to allow displaying the fallback image if the src is not found and a skeleton while loading
    useEffect(() => {
        const image = new Image();
        image.src = src || '';

        image.onload = () => {
            setLoadState('success');
        };

        image.onerror = () => {
            setLoadState('error');
        };

        return () => {
            // Cleanup if component unmounts before image is loaded
            image.onload = null;
            image.onerror = null;
        };
    }, [src]);

    if (loadState === 'loading') {
        return (
            <Skeleton
                width="100%"
                height={height}
            />
        );
    }

    return (
        <img
            src={(theme.isDarkTheme ? srcDark : src) || src || fallbackSrc}
            alt={alt}
            ref={innerRef}
            onClick={onClick}
            css={{ ...(style as CSSProperties) }}
        />
    );
};
