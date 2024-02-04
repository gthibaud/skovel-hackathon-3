import { useParams } from 'react-router-dom';

/**
 * Generates a URL with the given parameters
 * @param url Base URL
 * @param params Parameters to add to the URL
 * @returns
 */
export const generateURL = (urlSegments: string[]): string => {
    let url = '/';
    const segments: string[] = [];

    urlSegments.forEach((segment) => {
        if (segment) {
            segment.split('/').forEach((s) => {
                if (s) {
                    segments.push(s);
                }
            });
        }
    });

    segments.forEach((segment) => {
        url += `${segment}/`;
    });

    return url;
};

/**
 * Gets the last segment of a URL (e.g. /users/123/ -> 123)
 * @param url Url to get the last segment from
 * @returns Last segment of the URL
 */
export const getLastPathSegment = (url: string): string => {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    const segments = url.split('/');
    return segments[segments.length - 1];
};

/**
 * Gets the third last segment of a URL (e.g. /users/123/rights/636 -> 123)
 * @param url Url to get the last segment from
 * @returns Last segment of the URL
 */
export const getThirdLastPathSegment = (url: string): string => {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    const segments = url.split('/');
    return segments[segments.length - 3];
};

export const url = (path: string): string => {
    const { workspaceId, environmentId } = useParams();
    return `${workspaceId}/${path}`;
};
