export const sortByDateDescending = (arrayOfObjects: any[], key: string): any[] => {
    return arrayOfObjects.sort((a: any, b: any) => b[key].getTime() - a[key].getTime());
};
