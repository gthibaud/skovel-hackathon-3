export const formatMilliseconds = (milliseconds?: number, truncate: number = 0): string => {
    if (!milliseconds) {
        return '–';
    }

    return milliseconds.toFixed(truncate).toString();
};

export const toDatetimeLocal = (date: Date): string => {
    const ten = (i: number): string => {
        return (i < 10 ? '0' : '') + i;
    };

    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const II = ten(date.getMinutes());

    return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
};

export const hoursToTimestamp = (hours: number): number => {
    return hours * 3600000;
};

export const timestampToHours = (timestamp: number): number => {
    return Math.round(timestamp / 3600000) / 10;
};

/**
 * Format duration in milliseconds to hours and minutes
 * @param duration Duration in milliseconds
 * @returns String in format "Xd Xh Ym"
 */
export const formatDurationToDaysHoursMinutes = (duration: number) => {
    const durationInHours = timestampToHours(duration);

    const days = Math.floor(durationInHours / 24);
    const hours = Math.floor((durationInHours - days * 24) / 1);
    const minutes = Math.floor((durationInHours % 1) * 60);

    return (days > 0 ? `${days}d ` : '') + `${hours}h` + (minutes > 0 ? ` ${minutes}m` : '');
};
