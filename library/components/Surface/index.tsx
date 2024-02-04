/** @jsxImportSource @emotion/react */

'use client';

import { Interpolation, useTheme } from '@emotion/react';
import type { CSSProperties, FC } from 'react';
import React from 'react';
import { generateHeight, generateMaxHeight } from '../../props/height';
import {
    generateMarginBottom,
    generateMarginLeft,
    generateMarginRight,
    generateMarginTop,
} from '../../props/margin';
import {
    generatePaddingBottom,
    generatePaddingLeft,
    generatePaddingRight,
    generatePaddingTop,
} from '../../props/padding';
import { generateMaxWidth, generateWidth } from '../../props/width';
import { ContainerProps } from '../Container';

type SurfaceVariant = 'default' | 'glass' | 'transparent' | 'ice';

export interface SurfaceProps extends ContainerProps {
    children?: React.ReactNode;
    variant?: SurfaceVariant;
    style?: Interpolation<CSSProperties>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    backgroundImage?: string;
    disableCorners?: boolean;
    disableBorders?: boolean;
}

export const Surface: FC<SurfaceProps> = (props) => {
    const theme = useTheme();
    const {
        children,
        variant = 'default',
        style,
        onClick,
        onMouseEnter,
        onMouseLeave,
        backgroundImage,
        disableCorners = false,
        disableBorders = false,
    } = props;

    const specificProps = (v: SurfaceVariant): object => {
        switch (v) {
            case 'glass':
                return {
                    border: disableBorders ? 'none' : theme.divider.glass,
                    background: theme.colors.surface.glass,
                    backdropFilter: `blur(${theme.blur.glass}px)`,
                    WebkitBackgroundFilter: `blur(${theme.blur.glass}px)`,
                    backgroundBlendMode: 'overlay',
                };
            case 'ice':
                return {
                    border: disableBorders ? 'none' : theme.divider.primary,
                    background: theme.colors.surface.ice,
                    backdropFilter: `blur(${theme.blur.glass}px)`,
                    WebkitBackgroundFilter: `blur(${theme.blur.glass}px)`,
                    backgroundBlendMode: 'overlay',
                };
            case 'transparent':
                return {};
            default:
                return {
                    border: disableBorders ? 'none' : theme.divider.primary,
                    background: theme.colors.surface.primary,
                };
        }
    };

    const renderChildren = (v: SurfaceVariant, c: React.ReactNode) => {
        return c;
        // switch (v) {
        //     case 'glass':
        //         return c;
        //     default:
        //         return c;
        // }
    };

    const generateBackgroundImage = () => {
        if (backgroundImage) {
            return {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }

        return {};
    };

    return (
        <div
            ref={props.innerRef}
            css={{
                display: 'flex',
                borderRadius: disableCorners ? 0 : theme.radius.primary,
                width: generateWidth(props, '100%'),
                maxWidth: generateMaxWidth(props),
                height: generateHeight(props, 'auto'),
                maxHeight: generateMaxHeight(props),
                marginTop: generateMarginTop(props, 0),
                marginBottom: generateMarginBottom(props, 0),
                marginRight: generateMarginRight(props, 'auto'),
                marginLeft: generateMarginLeft(props, 'auto'),
                paddingTop: generatePaddingTop(props, 0),
                paddingBottom: generatePaddingBottom(props, 0),
                paddingRight: generatePaddingRight(props, 0),
                paddingLeft: generatePaddingLeft(props, 0),
                transition: theme.transition.primary,
                ...specificProps(variant),
                ...generateBackgroundImage(),
                ...(style as CSSProperties),
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {renderChildren(variant, children)}
        </div>
    );
};
