import { Theme, useTheme } from '@emotion/react';
import { CheckboxBlank, CheckboxCheckedFill } from 'gthibaud-icons-react';
import { FC } from 'react';
import { HorizontalContainer } from '../Container/Horizontal';
import { Typography } from '../Typography';
import { TypographyProps } from '../Typography/props';

interface CheckboxProps extends TypographyProps {
    checked: boolean;
    onClick: () => void;
    checkboxSize?: number; // Checkbox size
    checkboxColor?: keyof Theme['colors']['text'];
}

export const Checkbox: FC<CheckboxProps> = (props) => {
    const { checked, onClick, children, checkboxSize = 20, checkboxColor = 'body' } = props;
    const theme = useTheme();

    const Icon = checked ? CheckboxCheckedFill : CheckboxBlank;

    return (
        <HorizontalContainer
            onClick={onClick}
            style={{
                cursor: 'pointer',
            }}
        >
            <Icon
                size={checkboxSize}
                color={theme.colors.text[checkboxColor]}
            />
            <Typography {...props}>{children}</Typography>
        </HorizontalContainer>
    );
};
