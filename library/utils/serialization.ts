import { formatDatePropertiesToDate } from './date';

/**
 * Deserialize object to Date object in a given object (recursively)
 * For now, it only deserializes date properties
 * @param object Object to format
 * @returns Object with date properties deserialized
 */
export const deserializeObject = (object: any): any => {
    formatDatePropertiesToDate(object);
    return object;
};
