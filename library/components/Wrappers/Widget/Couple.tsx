import { FC } from 'react';
import { HorizontalContainer } from '../../Container/Horizontal';
import { Typography } from '../../Typography';

interface WidgetCoupleProps {
    title: string;
    value: string;
}

export const WidgetCouple: FC<WidgetCoupleProps> = ({ title, value }) => {
    return (
        <HorizontalContainer
            spaceBetween
            gap={2}
        >
            <Typography color="light">{title}</Typography>
            <Typography>{value}</Typography>
        </HorizontalContainer>
    );
};
