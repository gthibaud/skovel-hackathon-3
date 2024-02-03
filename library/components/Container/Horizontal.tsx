import { FC } from 'react';
import { AlignOptions, Container, ContainerProps } from '.';

interface HorizontalContainerProps extends ContainerProps {
    align?: AlignOptions;
}

export const HorizontalContainer: FC<HorizontalContainerProps> = (props) => (
    <Container
        direction="row"
        alignItems={props.stretch ? 'stretch' : props.align ? props.align : 'center'}
        alignContent="start"
        justifyContent="start"
        {...props}
    />
);
