/** @jsxImportSource @emotion/react */
import { Theme, useTheme } from '@emotion/react';
import { Skeleton } from '@mui/material';
import { useState, type FC, type ReactNode } from 'react';
import { isThemeColor } from '../../../src/theme/themeBase';
import { generatAlignment } from '../../props/alignment';
import { generateFontSize } from '../../props/fontSize';
import {
    generateMarginBottom,
    generateMarginLeft,
    generateMarginRight,
    generateMarginTop,
} from '../../props/margin';
import { generateUserSelect } from '../../props/select';
import { generateWeight } from '../../props/weight';
import { share } from '../../utils/share';
import { Tooltip } from '../Tooltip';
import {
    componentMap,
    DEFAULT_FONT_SIZE,
    DEFAULT_FONT_WEIGHT,
    fontSizeMap,
    fontWeightMap,
} from './defaultValues';
import { TypographyProps } from './props';

export const Typography: FC<TypographyProps> = (props) => {
    const {
        children,
        isLoading = false,
        isError = false,
        errorWhileLoading = false,
        loaderLength = '100%',
        errorPlaceholder = '-',
        copyToClipboard = false,
        variant = 'body1',
        color = 'body',
        fontSize = fontSizeMap[variant],
        fontWeight = fontWeightMap[variant],
        tabularNums = false,
        style,
        lengthLimit,
        className,
        onClick,
        ...other
    } = props;

    const theme = useTheme();

    // If a limit is set, check if the text is longer than the limit
    const isTrimmed = lengthLimit && typeof children === 'string' && children.length > lengthLimit;
    // If the text is trimmed, create a context to toggle the full text
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const Component = componentMap[variant] || 'p';

    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        if (copyToClipboard) {
            share(children?.toString() || '');
        }
    };

    // If a limit is set, trim the text and add an ellipsis
    const trimChildren = (): ReactNode | string => {
        if (isTrimmed) {
            return `${children.substring(0, lengthLimit)}...`;
        }
        return children;
    };

    const renderText = (
        <Component
            className={className}
            css={{
                minWidth: 'fit-content',
                whiteSpace: 'pre-line', // allow line breaks
                color: isError
                    ? theme.colors.text.negative
                    : isThemeColor(color)
                      ? theme.colors.text[color as keyof Theme['colors']['text']]
                      : color,
                fontWeight: generateWeight(props, fontWeightMap[variant] || DEFAULT_FONT_WEIGHT),
                fontSize: generateFontSize(props, fontSizeMap[variant] || DEFAULT_FONT_SIZE),
                marginTop: generateMarginTop(props, 0),
                marginBottom: generateMarginBottom(props, 0),
                marginRight: generateMarginRight(props, 0),
                marginLeft: generateMarginLeft(props, 0),
                textAlign: generatAlignment(props, 'inherit'),
                ...generateUserSelect(props),
                fontVariantNumeric: tabularNums ? 'tabular-nums' : '',
                '&:hover': {
                    cursor: copyToClipboard ? 'pointer' : 'inherit',
                },
                a: {
                    color: theme.colors.text.primary,
                },
                ...style,
            }}
            onClick={handleClick}
        >
            <>
                {isOpen ? children : trimChildren()}
                {isTrimmed && (
                    <span
                        css={{
                            color: theme.colors.text.primary,
                            fontWeight: '500',
                            textDecoration: 'none',
                            '&:hover': {
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        {' '}
                        {isOpen ? 'Show less' : 'More'}
                    </span>
                )}
            </>
        </Component>
    );

    if (isLoading) {
        const renderLoaderHeight = (): number | string | undefined => {
            if (props.loaderHeight) {
                return props.loaderHeight;
            }

            return generateFontSize(props, fontSizeMap[variant] || DEFAULT_FONT_SIZE) + 20;
        };

        return (
            <Skeleton
                height={renderLoaderHeight()}
                width={loaderLength}
            />
        );
    }

    if (errorWhileLoading) {
        return <Component {...other}>{errorPlaceholder}</Component>;
    }

    if (copyToClipboard) {
        return <Tooltip title="Click to copy">{renderText}</Tooltip>;
    }

    return renderText;
};
