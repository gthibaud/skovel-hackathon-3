export const wait = (milliseconds: number): Promise<void> =>
    new Promise((res) => setTimeout(res, milliseconds));

export const sleep = (milliseconds: number): Promise<void> => wait(milliseconds);
