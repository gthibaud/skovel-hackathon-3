import memoize from 'fast-memoize';

export const TIMESTAMP_COMPRESSION_OFFSET = 1683237600000;

export const compressTimestamp = memoize((timestamp: number): number => {
    return (timestamp - TIMESTAMP_COMPRESSION_OFFSET) / 1000;
});

export const decompressTimestamp = memoize((timestamp: number): number => {
    return timestamp * 1000 + TIMESTAMP_COMPRESSION_OFFSET;
});
