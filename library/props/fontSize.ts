export interface FontSizeProps {
    /** Font size */
    fontSize?: number;
    /** Font size */
    size?: number;
    /** Font size */
    s?: number;
}

export const generateFontSize = (props: FontSizeProps, defaultSize: number): number => {
    const { fontSize, size, s } = props;

    return fontSize || size || s || defaultSize;
};
