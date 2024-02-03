import { FC } from 'react';
import { AlignOptions, Container, ContainerProps } from '.';

interface VerticalContainerProps extends ContainerProps {
    align?: AlignOptions;
}

export const VerticalContainer: FC<VerticalContainerProps> = (props) => (
    <Container
        direction="column"
        alignItems={props.align ? props.align : 'start'}
        {...props}
    />
);
