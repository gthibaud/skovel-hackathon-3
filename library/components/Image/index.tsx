/** @jsxImportSource @emotion/react */
import { Interpolation, useTheme } from '@emotion/react';
import { CSSProperties, FC } from 'react';
import { TiltingContainer } from '../Container/Titling';
import { Tooltip } from '../Tooltip';
import { ProgressiveImage } from './progressiveImage';

interface ImageProps {
    src: string | undefined;
    alt: string;
    allowFullScreen?: boolean;
    roundedCorners?: boolean;
    titling?: boolean;
    tooltip?: boolean;
    innerRef?: React.Ref<HTMLImageElement>;
    style?: Interpolation<CSSProperties>;
    fallbackSrc?: string; // Default image that will be displayed if the src is not found
    srcDark?: string; // Dark mode image
    margin?: string;
    loaderHeight?: number; // The height of the loader
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export const Image: FC<ImageProps> = ({
    src,
    srcDark,
    alt,
    innerRef,
    allowFullScreen = true,
    roundedCorners = true,
    titling = true,
    tooltip = true,
    style,
    fallbackSrc = '/img/athlete-placeholder.jpg',
    margin,
    loaderHeight = 400,
    onClick,
}) => {
    const theme = useTheme();

    const renderImage = () => {
        return (
            <ProgressiveImage
                src={src}
                alt={alt}
                innerRef={innerRef}
                style={{
                    borderRadius: roundedCorners ? theme.radius.primary : '0',
                    width: '100%',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    ...(style as CSSProperties),
                }}
                height={loaderHeight}
                fallbackSrc={fallbackSrc}
                srcDark={srcDark}
                onClick={onClick}
            />
        );
    };

    return titling ? (
        <Tooltip
            title={tooltip ? alt : ''}
            style={{
                margin: margin || 'auto',
            }}
        >
            <TiltingContainer disabled={!titling}>{renderImage()}</TiltingContainer>
        </Tooltip>
    ) : (
        renderImage()
    );
};
