/**
 * Get z-index value for a component
 * @param type Component type
 * @returns Z-index value
 * TODO: Enhance types management
 */
export const getZIndex = (type: '1' | '2' | '3' | '4' | '5') => {
    switch (type) {
        case '1':
            return 100;
        case '2':
            return 500;
        case '3':
            return 600;
        case '4':
            return 700;
        case '5':
            return 800;
        default:
            return 0;
    }
};
