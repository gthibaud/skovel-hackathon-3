import { format, formatDistanceToNow, subDays } from 'date-fns';

/**
 * Format a timesamp to a string (relative)
 * @param date Date
 */
export const formatRelativeDate = (date?: Date): string => {
    if (!date) {
        return '';
    }
    const threeDaysAgo = subDays(new Date(), 3);

    if (date > threeDaysAgo) {
        return formatDistanceToNow(date);
    } else {
        return format(date, 'MMM d - kk:mm');
    }
};

export const formatAbsoluteDate = (date?: Date): string => {
    if (!date) {
        return '';
    }

    return format(date, 'PPpp');
};

export const formatCondensedDate = (date?: Date, onlyHour: boolean = false): string => {
    if (!date) {
        return '';
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    return onlyHour ? format(date, 'kk:mm:ss:SSS') : format(date, 'dd/MM/yyyy kk:mm:ss:SSS');
};

/**
 * Format string date to Date object in a given object (recursively)
 * @param object Object to format
 * @returns Object with date properties converted to Date objects
 */
export const formatDatePropertiesToDate = (object: any) => {
    const datePropertyKeys = [
        'createdAt',
        'updatedAt',
        'createDate',
        'updateDate',
        'publishedAt',
        'closesAt',
        'startDate',
        'endDate',
        'date',
    ];

    if (!object || typeof object !== 'object') {
        return;
    }

    Object.keys(object).forEach((key) => {
        if (datePropertyKeys.includes(key)) {
            try {
                object[key] = object[key].toDate(); // Works only for Firebase
                // object[key] = new Date(object[key]);
            } catch (e) {
                console.error('Error parsing date', e);
            }
        } else if (object[key] && typeof object[key] === 'object') {
            formatDatePropertiesToDate(object[key]);
        }
    });
};
