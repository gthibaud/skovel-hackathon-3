import { useTheme } from '@emotion/react';
import { Skeleton as SkeletonMui } from '@mui/material';
import { FC } from 'react';
import { generateWidth, WidthProps } from '../../props/width';

export interface SkeletonProps extends WidthProps {
    variant?: 'rectangular' | 'text' | 'rounded' | 'circular';
    height?: number | string;
    animation?: 'wave' | 'pulse';
    backgroundColor?: string;
}

export const Skeleton: FC<SkeletonProps> = (props) => {
    const {
        variant = 'rectangular',
        height = 30,
        animation = 'wave',
        backgroundColor = 'rgba(255, 255, 255, 0.2)',
    } = props;

    const theme = useTheme();

    return (
        <SkeletonMui
            variant={variant}
            width={generateWidth(props, '100%')}
            height={height}
            style={{
                borderRadius: variant === 'circular' ? '100%' : theme.radius.small,
            }}
            animation={animation}
            sx={{
                backgroundColor,
            }}
        />
    );
};
