/** @jsxImportSource @emotion/react */
import { Theme, useTheme } from '@emotion/react';
import { FC } from 'react';
import {
    generateMarginBottom,
    generateMarginLeft,
    generateMarginRight,
    generateMarginTop,
    MarginProps,
} from '../../props/margin';
import { generateSize, SizeProps } from '../../props/size';
import { Typography } from '../Typography';

interface DividerProps extends SizeProps, MarginProps {
    color?: keyof Theme['colors']['divider'];
    orientation?: 'horizontal' | 'vertical';
    weight?: number;
    text?: string; // Text to display in the middle of the divider. Only available for horizontal orientation
}

export const Divider: FC<DividerProps> = (props) => {
    const { color = 'primary', orientation = 'vertical', text, weight = 2 } = props;

    // Import theme
    const theme = useTheme();

    // Generate size
    const size = generateSize(props, '100%');

    // Generate CSS properties that depends on vertical or horizontal orientation
    const generateOrientationDependantStyle = () => {
        if (orientation === 'horizontal') {
            return {
                borderTop: text ? 'none' : `${weight}px solid ${theme.colors.divider[color]}`,
                borderRight: 'none',
                width: size,
                height: 0,
            };
        } else {
            return {
                borderTop: 'none',
                borderRight: theme.divider[color],
                width: 0,
                height: size,
            };
        }
    };

    // If text is provided, render a horizontal divider with text in the middle
    if (text) {
        return (
            <div
                css={{
                    borderLeft: 'none',
                    borderBottom: 'none',
                    marginTop: generateMarginTop(props, 0),
                    marginBottom: generateMarginBottom(props, 0),
                    marginRight: generateMarginRight(props, 'auto'),
                    marginLeft: generateMarginLeft(props, 'auto'),
                    ...generateOrientationDependantStyle(),
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    '&::before, &::after': {
                        content: '""',
                        flex: 1,
                        borderTop: `1.6px solid ${theme.colors.divider[color]}`,
                    },
                    '&:not(:empty)::before': {
                        marginRight: '0.5em',
                    },
                    '&:not(:empty)::after': {
                        marginLeft: '0.5em',
                    },
                }}
            >
                <Typography
                    color="link"
                    weight={500}
                    size={12}
                    disableSelect
                >
                    {text}
                </Typography>
            </div>
        );
    }

    // Otherwise, render a normal divider
    return (
        <hr
            css={{
                borderLeft: 'none',
                borderBottom: 'none',
                marginTop: generateMarginTop(props, 0),
                marginBottom: generateMarginBottom(props, 0),
                marginRight: generateMarginRight(props, 'auto'),
                marginLeft: generateMarginLeft(props, 'auto'),
                ...generateOrientationDependantStyle(),
            }}
        />
    );
};
