import { FC } from 'react';
import { Skeleton, SkeletonProps } from '.';
import { MarginProps } from '../../props/margin';
import { PaddingProps } from '../../props/padding';
import { VerticalContainer } from '../Container/Vertical';
import { Surface, SurfaceProps } from '../Surface';

interface SkeletonSurfaceProps extends SkeletonProps, MarginProps, PaddingProps {
    surfaceVariant?: SurfaceProps['variant'];
    minHeight?: number | string;
    raw?: boolean; // If true, the skeleton will be displayed without any container
}

export const SkeletonSurface: FC<SkeletonSurfaceProps> = (props) => {
    const { surfaceVariant = 'default', minHeight, raw = false } = props;

    return (
        <Surface
            variant={surfaceVariant}
            height={minHeight || '100%'}
            width={'100%'}
            disableCorners={raw}
            disableBorders={raw}
        >
            <VerticalContainer
                gap={8}
                {...props}
            >
                <Skeleton
                    height={minHeight || '100%'}
                    width={'100%'}
                />
            </VerticalContainer>
        </Surface>
    );
};
