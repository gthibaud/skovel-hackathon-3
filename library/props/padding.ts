export interface PaddingProps {
    /** Padding bottom */
    paddingBottom?: number;
    /** Padding bottom */
    pb?: number;
    /** Padding top */
    paddingTop?: number;
    /** Padding top */
    pt?: number;
    /** Padding on Y axis (top and bottom) */
    paddingY?: number;
    /** Padding on Y axis (top and bottom) */
    py?: number;
    /** Padding right */
    paddingRight?: number;
    /** Padding right */
    pr?: number;
    /** Padding left */
    paddingLeft?: number;
    /** Padding left */
    pl?: number;
    /** Padding on X axis (left and right) */
    paddingX?: number;
    /** Padding on X axis (left and right) */
    px?: number;
    /** Padding */
    padding?: number;
    /** Padding */
    p?: number;
}

export const generatePaddingTop = (props: PaddingProps, defaultPaddingTop: number): number => {
    const { paddingTop, pt, paddingY, py, p, padding } = props;

    return paddingTop || pt || paddingY || py || padding || p || defaultPaddingTop;
};

export const generatePaddingBottom = (
    props: PaddingProps,
    defaultPaddingBottom: number,
): number => {
    const { paddingBottom, pb: mb, paddingY, py, p, padding } = props;

    return paddingBottom || mb || paddingY || py || padding || p || defaultPaddingBottom;
};

export const generatePaddingLeft = (props: PaddingProps, defaultPaddingLeft: number): number => {
    const { paddingLeft, pl, paddingX, px, p, padding } = props;

    return paddingLeft || pl || paddingX || px || padding || p || defaultPaddingLeft;
};

export const generatePaddingRight = (props: PaddingProps, defaultPaddingRight: number): number => {
    const { paddingRight, pr, paddingX, px, p, padding } = props;

    return paddingRight || pr || paddingX || px || padding || p || defaultPaddingRight;
};
