/** @jsxImportSource @emotion/react */
import { Interpolation } from '@emotion/react';
import { CSSProperties, FC, ReactNode } from 'react';
import { generateHeight, generateMaxHeight, HeightProps } from '../../props/height';
import {
    generateMarginBottom,
    generateMarginLeft,
    generateMarginRight,
    generateMarginTop,
    MarginProps,
} from '../../props/margin';
import {
    generatePaddingBottom,
    generatePaddingLeft,
    generatePaddingRight,
    generatePaddingTop,
    PaddingProps,
} from '../../props/padding';
import { generateMaxWidth, generateMinWidth, generateWidth, WidthProps } from '../../props/width';

export type AlignOptions = 'start' | 'end' | 'center' | 'stretch';

export interface ContainerProps extends MarginProps, PaddingProps, WidthProps, HeightProps {
    spaceBetween?: boolean;
    gap?: number;
    wrap?: boolean;
    direction?: 'row' | 'column';
    children?: ReactNode;
    style?: Interpolation<CSSProperties>;
    alignContent?: AlignOptions;
    justifyContent?: AlignOptions;
    alignItems?: AlignOptions;
    innerRef?: any;
    scrollable?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    stretch?: boolean; // Allow the container to stretch to the width of the parent
}

export const Container: FC<ContainerProps> = (props: ContainerProps) => {
    const {
        spaceBetween = false,
        gap = 0,
        wrap = false,
        direction = 'row',
        alignContent = 'start',
        justifyContent = 'center',
        style,
        children,
        innerRef,
        scrollable = false,
        onClick,
        stretch = false,
        alignItems = stretch ? 'stretch' : 'start',
    } = props;

    return (
        <div
            ref={innerRef}
            css={{
                display: 'flex',
                flexDirection: direction,
                flexWrap: wrap ? 'wrap' : 'nowrap',
                justifyContent: spaceBetween ? 'space-between' : justifyContent,
                alignItems,
                alignContent,
                gap: `${gap}px`,
                width: generateWidth(props, '100%'),
                maxWidth: generateMaxWidth(props),
                minWidth: generateMinWidth(props, 'auto'),
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
                overflow: scrollable ? 'scroll' : 'none',
                ...(style as CSSProperties),
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
