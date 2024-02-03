/**
 * Format the order by string to use in the query
 * @param key Object key to order by
 * @param order Order type (asc or desc)
 * @returns Formatted string to use in the order by query
 */
export const formatOrderBy = (key: string, order: 'asc' | 'desc' = 'asc'): string => {
    return `{"${key}":${order === 'asc' ? 1 : -1}}`;
};
