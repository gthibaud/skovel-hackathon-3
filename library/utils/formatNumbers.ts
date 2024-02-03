export const formatKm = (distanceInMeters: number) => Math.round(distanceInMeters / 100) / 10;

export const formatPercent = (proportion: number) => Math.round(proportion * 100);

/**
 * Format a number as a string using the browser locale (or a specific locale if provided)
 * @example numberToString(1234567.89, i18n.language) => "1,234,567.89" (with const { i18n } = useTranslation())
 * @param value Number to format
 * @param locale Locale to use for formatting (default: browser locale)
 * @returns Formatted number as string
 */
export const numberToString = (value: number | undefined, locale?: string): string => {
    if (value === undefined) {
        return '';
    }

    return value.toLocaleString(locale);
};
