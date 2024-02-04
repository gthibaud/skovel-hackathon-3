/**
 * Format URI to call OwlGrid services
 * @param domain Domain to call (ex: manager, workspace, anonymous)
 * @param service Service identifier (ex: owl-workflow/beta, owl-database/v2, ...)
 * @param operation Operation to perform and path parameters (ex: listWorkflows, listDeployments, ...)
 * @param workspaceId Workspace ID (optional)
 * @param environmentId Environment ID (optional)
 * @returns URI formatted
 */
export const formatURI = (
    domain: string,
    service: string,
    operation: string,
    workspaceId?: string,
    environmentId?: string,
    queryString?: string,
): string => {
    // Get the base url from env variables
    // let url = import.meta.env.VITE_OWLGRID_SERVICES_HOST;
    let url = '';

    // The URL is different depending on the domain
    switch (domain) {
        case 'manager':
            url += `/manager/${service}/${operation}`;
            break;
        case 'workspace':
            url += `/workspaces/${workspaceId}/environments/${environmentId}/${service}/${operation}`;
            break;
        default: // anonymous
            url += `/manager/${service}/${operation}`;
            break;
    }

    // If there is a query string, add it to the operation
    if (queryString) {
        url += `?${queryString}`;
    }

    // Return the url
    return url;
};

/**
 * Format headers to call OwlGrid services (including auth token)
 * @param accessToken Access token (optional)
 * @returns Headers to add to the request
 */
export const formatHeaders = (accessToken?: string): object => {
    // If there is no access token, return an empty object
    if (!accessToken) {
        return {};
    }

    // Return the headers
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

/**
 * Format error message from OwlGrid services
 * @param error Error to format
 * @returns Error message
 */
export const formatErrorMessage = (error: any): string => {
    return (
        error?.response?.data?.data?.details?.message ||
        error?.response?.data?.data?.details?.name ||
        error?.response?.data?.data?.message ||
        error?.message ||
        'Something went wrong'
    );
};
