export interface MarginProps {
    /** Margin bottom */
    marginBottom?: number;
    /** Margin bottom */
    mb?: number;
    /** Margin top */
    marginTop?: number;
    /** Margin top */
    mt?: number;
    /** Margin on Y axis (top and bottom) */
    marginY?: number;
    /** Margin on Y axis (top and bottom) */
    my?: number;
    /** Margin right */
    marginRight?: number;
    /** Margin right */
    mr?: number;
    /** Margin left */
    marginLeft?: number;
    /** Margin left */
    ml?: number;
    /** Margin on X axis (left and right) */
    marginX?: number;
    /** Margin on X axis (left and right) */
    mx?: number;
    /** Margin */
    margin?: number;
    /** Margin */
    m?: number;
}

export const generateMarginTop = (
    props: MarginProps,
    defaultMarginTop: number | string,
): number | string => {
    const { marginTop, mt, marginY, my, m, margin } = props;

    return marginTop || mt || marginY || my || margin || m || defaultMarginTop;
};

export const generateMarginBottom = (
    props: MarginProps,
    defaultMarginBottom: number | string,
): number | string => {
    const { marginBottom, mb, marginY, my, m, margin } = props;

    return marginBottom || mb || marginY || my || margin || m || defaultMarginBottom;
};

export const generateMarginLeft = (
    props: MarginProps,
    defaultMarginLeft: number | string,
): number | string => {
    const { marginLeft, ml, marginX, mx, m, margin } = props;

    return marginLeft || ml || marginX || mx || margin || m || defaultMarginLeft;
};

export const generateMarginRight = (
    props: MarginProps,
    defaultMarginRight: number | string,
): number | string => {
    const { marginRight, mr, marginX, mx, m, margin } = props;

    return marginRight || mr || marginX || mx || margin || m || defaultMarginRight;
};
