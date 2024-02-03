/**
 * Compares two objects and returns true if they are equal, false otherwise
 * @param object1 Object to compare
 * @param object2 Object to compare
 * @returns True if the objects are equal, false otherwise
 */
export const deepEqual = (object1: any, object2: any) => {
    if (!isObject(object1) || !isObject(object2)) {
        return object1 === object2;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
            return false;
        }
    }

    return true;
};

const isObject = (object: any) => {
    return object != null && typeof object === 'object';
};
