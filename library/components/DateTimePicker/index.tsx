/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { FC } from 'react';
import { toDatetimeLocal } from '../../utils/time';
import { HorizontalContainer } from '../Container/Horizontal';

interface DateTimePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    label?: string;
}

export const DateTimePicker: FC<DateTimePickerProps> = ({ value, onChange, label }) => {
    const theme = useTheme();

    return (
        <HorizontalContainer gap={8}>
            {label && <label>{label}</label>}
            <input
                type="datetime-local"
                value={toDatetimeLocal(value)}
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    onChange(newDate);
                }}
                css={{
                    color: theme.colors.text.body,
                    padding: '8px 12px',
                    borderRadius: theme.radius.small,
                    border: theme.divider.primary,
                    background: theme.colors.surface.primary,
                    transition: theme.transition.primary,
                    fontFamily: theme.fontFamily,
                    fontSize: '14px',
                    boxShadow: theme.shadow.input,
                    '&:focus': {
                        outline: 'none',
                        boxShadow: theme.shadow.inputActive,
                        border: theme.divider.primaryActive,
                    },
                }}
            />
        </HorizontalContainer>
    );
};
