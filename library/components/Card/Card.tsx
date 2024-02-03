import type { FC } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import { generateUri } from '../../../src/routes/uriMapping';
import { HeightProps } from '../../props/height';
import { VerticalContainer } from '../Container/Vertical';
import { Surface, SurfaceProps } from '../Surface';
import { CardHeader, CardHeaderProps } from './CardHeader';

export interface CardProps extends CardHeaderProps, HeightProps, SurfaceProps {
    children: React.ReactNode;
    to?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: FC<CardProps> = (props) => {
    const { children, to, onClick } = props;
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        if (onClick) {
            onClick(e);
        }
        if (to) {
            navigate(generateUri(to));
        }
    };

    return (
        <Surface
            {...props}
            innerRef={props.innerRef}
            onClick={handleClick}
        >
            <VerticalContainer>
                <CardHeader {...props} />
                {typeof children === 'string' ? (
                    <VerticalContainer>{children}</VerticalContainer>
                ) : (
                    children
                )}
            </VerticalContainer>
        </Surface>
    );
};
