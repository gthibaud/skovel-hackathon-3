import { Theme } from '@emotion/react';
import { IconProps } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { FC } from 'react';
import { SearchFieldProps } from '../SearchField';

export type PageContext = {
    title?: string | JSX.Element | undefined; // Page title
    titleSmall?: string | JSX.Element | undefined; // Page title on small screens. By default, the title is used
    subtitle?: PageSubtitle | string | undefined; // Page subtitle, displayed under the title
    subtitleSmall?: PageSubtitle | string | undefined; // Page subtitle on small screens, by default the subtitle is used
    action?: PageAction | undefined; // Page action (displayed on the right side of the header)
    share?: PageShareAction | undefined; // Page share action (displayed on the right side of the header)
    showBackButton?: boolean | undefined; // Show back button
    showBackButtonSmall?: boolean | undefined; // Show back button on small screens, by default the showBackButton is used
    dynamicObject?: UseQueryResult<any, unknown> | undefined; // Dynamic object (used to wait before displaying the page title)
    searchField?: SearchFieldProps | undefined; // Search field
    showDivider?: boolean | undefined; // Show divider under the header
    setHeaderHeight?: (height: number) => void; // Set header height
    showHeader?: boolean | undefined; // Show header
    showInNavbar?: boolean; // Show the page in the navbar. If the URI does not starts with a segment of the navbar, the default icon (Search) will be highlighted
    background?: keyof Theme['colors']['surface'] | string; // Background color of the page
};

export type PageAction = {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: FC<IconProps>;
};

export type PageShareAction = {
    label?: string;
    link?: string;
};

export type PageSubtitle = {
    type: 'raceName' | 'countdown';
};
