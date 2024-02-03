/**
 * Formats an array of parameters (used for workflows inputs, outputs and errors parameters)
 * @param parameters Parameters to format
 * @param defaultMessage Default message to return if parameters is undefined
 * @returns String of formatted parameters
 */
export const formatParameters = (parameters: any[], defaultMessage: string) => {
    if (!parameters) {
        return defaultMessage;
    }
    const formattedParameters: any[] = [];
    parameters.forEach((parameter: any) => {
        if (parameter.description) {
            formattedParameters.push(
                `${parameter.name || parameter.code}${
                    parameter.type ? ' (' + parameter.type + ')' : ''
                }: ${parameter.description}`,
            );
        } else {
            formattedParameters.push(parameter.name || parameter.code);
        }
    });
    return formattedParameters.join(',\n');
};

/**
 * Formats an array of dependencies (used for workflows "using" and "usedBy" dependencies)
 * @param dependencies Dependencies to format
 * @param defaultMessage Default message to return if dependencies is undefined
 * @returns Formatted dependencies
 * @returns
 */
export const formatDependencies = (dependencies: any[], defaultMessage: string): string => {
    if (!dependencies || dependencies.length === 0) {
        return defaultMessage;
    }
    const formattedDependencies: any[] = [];
    dependencies.forEach((dependency: any) => {
        if (dependency.description) {
            formattedDependencies.push(
                `${dependency.name || dependency.code}: ${dependency.description}`,
            );
        } else {
            formattedDependencies.push(dependency.name || dependency.code);
        }
    });
    return formattedDependencies.join(',\n');
};

/**
 * Computes the failure rate of a metric
 */
export const computeFailureRate = (a: string | undefined, b: string | undefined) => {
    if (a && b) {
        return ((parseInt(a, 10) / parseInt(b, 10)) * 100).toFixed(0) + ' %';
    }
    return '–';
};
