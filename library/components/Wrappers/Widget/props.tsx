import { Interpolation } from '@emotion/react';
import { CSSProperties } from 'react';
import { HeightProps } from '../../../props/height';
import { CardProps } from '../../Card/Card';

export type WidgetSize = 'small' | 'medium' | 'large';
export interface WidgetWrapperProps extends CardProps, HeightProps {
    size?: WidgetSize;
    style?: Interpolation<CSSProperties>;
    type?: 'map' | 'default';
}

export interface WidgetProps {
    size?: WidgetSize;
}
