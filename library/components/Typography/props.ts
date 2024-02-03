import { Theme } from '@emotion/react';
import { CSSProperties, ReactNode } from 'react';
import { AlignProps } from '../../props/alignment';
import { FontSizeProps } from '../../props/fontSize';
import { MarginProps } from '../../props/margin';
import { SelectProps } from '../../props/select';
import { WeightProps } from '../../props/weight';

export interface TypographyProps
    extends WeightProps,
        FontSizeProps,
        MarginProps,
        AlignProps,
        SelectProps {
    children: ReactNode;
    style?: CSSProperties;
    isError?: boolean;
    isLoading?: boolean;
    loaderLength?: number | string;
    loaderHeight?: number | string;
    errorWhileLoading?: boolean;
    errorPlaceholder?: string | null;
    tabularNums?: boolean;
    copyToClipboard?: boolean;
    className?: string;
    /** Characters limit. If text is longer, a 'more' button will be displayed */
    lengthLimit?: number;
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'button'
        | 'overline'
        | 'inherit'
        | 'code'
        | undefined;
    color?: keyof Theme['colors']['text'] | string;
    onClick?: () => void;
}
