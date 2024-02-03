import { FC } from 'react';
import { Skeleton, SkeletonProps } from '.';
import { MarginProps } from '../../props/margin';
import { PaddingProps } from '../../props/padding';
import { VerticalContainer } from '../Container/Vertical';

interface SkeletonListProps extends SkeletonProps, MarginProps, PaddingProps {
    /** Number of skeletons in the list (default: 3) */
    itemsNumber?: number;
    /** Gap between skeletons in pixels (default: 8) */
    gap?: number;
}

export const SkeletonsList: FC<SkeletonListProps> = (props) => {
    const { itemsNumber = 3, gap = 8 } = props;

    return (
        <VerticalContainer
            gap={gap}
            {...props}
        >
            {Array.from(Array(itemsNumber).keys()).map((index) => (
                <Skeleton
                    key={index}
                    {...props}
                />
            ))}
        </VerticalContainer>
    );
};
