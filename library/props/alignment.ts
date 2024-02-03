export type Alignment = 'center' | 'start' | 'end' | 'inherit' | 'left' | 'right';

export interface AlignProps {
    /** Text align */
    align?: Alignment;
    /** Text align */
    textAlign?: Alignment;
    /** Text align */
    a?: Alignment;
}

export const generatAlignment = (props: AlignProps, defaultAlign: Alignment): Alignment => {
    const { textAlign, align, a } = props;

    return textAlign || align || a || defaultAlign;
};
