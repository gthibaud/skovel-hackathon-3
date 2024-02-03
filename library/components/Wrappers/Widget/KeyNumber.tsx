import { useTheme } from '@emotion/react';
import { ElementType, FC } from 'react';
import { ContainerProps } from '../../Container';
import { HorizontalContainer } from '../../Container/Horizontal';
import { VerticalContainer } from '../../Container/Vertical';
import { Tooltip } from '../../Tooltip';
import { Typography } from '../../Typography';
import { TypographyNumber } from '../../Typography/NumberWrapper';

interface WidgetKeyNumberProps extends ContainerProps {
    title?: string | null;
    value?: string | number | null;
    valueIndex?: string;
    icon?: ElementType;
    iconElement?: JSX.Element;
    description?: string;
    isLoading?: boolean;
}

export const WidgetKeyNumber: FC<WidgetKeyNumberProps> = (props) => {
    const {
        title,
        value,
        icon: Icon,
        iconElement: IconElement,
        description = '',
        valueIndex,
        isLoading = false,
        ...rest
    } = props;
    const theme = useTheme();

    return (
        <VerticalContainer
            gap={8}
            align="center"
            width="fit-content"
            {...rest}
        >
            <Tooltip
                title={description}
                placement="top"
            >
                {IconElement ? (
                    IconElement
                ) : Icon ? (
                    <Icon
                        color={theme.colors.text.light}
                        size={30}
                        style={{ marginBottom: '4px' }}
                    />
                ) : (
                    <></>
                )}
            </Tooltip>
            <HorizontalContainer
                alignItems="end"
                gap={3}
                width="fit-content"
            >
                <TypographyNumber
                    size={22}
                    fontWeight={600}
                    textAlign="center"
                    isLoading={isLoading}
                >
                    {value}
                </TypographyNumber>
                <Typography
                    size={16}
                    fontWeight={600}
                    textAlign="center"
                    color="light"
                    isLoading={isLoading}
                >
                    {valueIndex}
                </Typography>
            </HorizontalContainer>
            <Typography
                color="light"
                textAlign="center"
                isLoading={isLoading}
            >
                {title}
            </Typography>
        </VerticalContainer>
    );
};
