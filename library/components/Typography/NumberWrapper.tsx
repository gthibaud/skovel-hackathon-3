import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '.';
import { numberToString } from '../../utils/formatNumbers';
import { TypographyProps } from './props';

/**
 * Wrapper for Typography that converts numbers to localized strings
 * @param props TypographyProps
 * @returns Element
 */
export const TypographyNumber: FC<TypographyProps> = (props) => {
    const { children } = props;

    const { i18n } = useTranslation();

    if (typeof children !== 'number') return <Typography {...props} />;

    return <Typography {...props}>{numberToString(children, i18n.language)}</Typography>;
};
