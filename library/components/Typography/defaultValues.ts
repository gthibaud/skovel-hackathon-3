interface ComponentMap {
    [key: string]: React.ElementType;
}

interface FontSizeMap {
    [key: string]: number;
}

export const componentMap: ComponentMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    button: 'span',
    overline: 'span',
    inherit: 'span',
};

export const fontSizeMap: FontSizeMap = {
    h1: 26,
    h2: 22,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    subtitle1: 16,
    subtitle2: 14,
    body1: 14,
    body2: 16,
    caption: 12,
    button: 14,
    overline: 12,
    inherit: 14,
};

export const fontWeightMap: FontSizeMap = {
    h1: 700,
    h2: 700,
    h3: 700,
    h4: 700,
    h5: 700,
    h6: 700,
    subtitle1: 700,
    subtitle2: 700,
    body1: 400,
    body2: 400,
    caption: 400,
    button: 700,
    overline: 700,
    inherit: 400,
};

export const DEFAULT_FONT_WEIGHT = 400;
export const DEFAULT_FONT_SIZE = 14;
