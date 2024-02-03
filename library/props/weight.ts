export interface WeightProps {
    /** Font weight */
    weight?: number;
    /** Font weight */
    fontWeight?: number;
    /** Font weight */
    w?: number;
}

export const generateWeight = (props: WeightProps, defaultWeight: number): number => {
    const { weight, fontWeight, w } = props;

    return weight || fontWeight || w || defaultWeight;
};
