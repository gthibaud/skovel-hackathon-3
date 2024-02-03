import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { isUnderBreakpoint } from '../../hooks/useParentWidth';
import { PageContext as PageContextType } from './types';

const FOOTER_HEIGHT_DEFAULT = 52;

interface PageContextProviderProps {
    children?: ReactNode;
}

export interface PageContextProps {
    pageContext: PageContextType; // Page context
    setPageContext: (c: PageContextType) => void; // Set page context
    showNavigationLineInHeaderSmall: boolean; // Show navigation line in header (small layouts)
    showPrimaryLineInHeaderSmall: boolean; // Show primary line in header (small layouts)
    showSecondaryLineInHeaderSmall: boolean; // Show secondary line in header (small layouts)
    showSearchLineInHeaderSmall: boolean; // Show search line in header (small layouts)
    showNavigationLineInHeader: boolean; // Show navigation line in header
    showPrimaryLineInHeader: boolean; // Show primary line in header
    showSecondaryLineInHeader: boolean; // Show secondary line in header
    showSearchLineInHeader: boolean; // Show search line in header
    headerHeight: number; // Height of the header
    footerHeight?: number; // Height of the footer
    setHeaderHeight: (height: number) => void; // Set height of the header
}

/**
 * PageContext is used to store informations about the current page
 * It is used to render the header, sidebar and analytics
 */
export const PageContext = createContext<PageContextProps>({
    pageContext: {},
    setPageContext: () => {},
    showNavigationLineInHeaderSmall: false,
    showPrimaryLineInHeaderSmall: false,
    showSecondaryLineInHeaderSmall: false,
    showSearchLineInHeaderSmall: false,
    showNavigationLineInHeader: false,
    showPrimaryLineInHeader: false,
    showSecondaryLineInHeader: false,
    showSearchLineInHeader: false,
    headerHeight: 0,
    footerHeight: 0,
    setHeaderHeight: () => {},
});

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }): JSX.Element => {
    const smallLayout = isUnderBreakpoint(undefined, 'md');

    const [pageContext, setPageContext] = useState<PageContextType>({});
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [footerHeight, setFooterHeight] = useState<number>(FOOTER_HEIGHT_DEFAULT);

    // Update the footer height depending on the layout
    useEffect(() => {
        if (smallLayout) {
            setFooterHeight(FOOTER_HEIGHT_DEFAULT);
        } else {
            setFooterHeight(0);
        }
    }, [smallLayout]);

    // Check if each line should be displayed depending on the pageContext
    const showNavigationLineInHeader = !!(pageContext.showBackButton || pageContext.share);
    const showPrimaryLineInHeader = !!pageContext.title;
    const showSecondaryLineInHeader = !!pageContext.subtitle;
    const showSearchLineInHeader = !!pageContext.searchField;

    // Check if each line should be displayed depending on the pageContext on small layouts
    const showNavigationLineInHeaderSmall = !!(
        pageContext.showBackButtonSmall ||
        pageContext.showBackButton ||
        pageContext.share
    );
    const showPrimaryLineInHeaderSmall = !!(pageContext.title || pageContext.titleSmall);
    const showSecondaryLineInHeaderSmall = !!(
        pageContext.subtitle ||
        pageContext.subtitleSmall ||
        pageContext.action
    );
    const showSearchLineInHeaderSmall = !!pageContext.searchField;

    return (
        <PageContext.Provider
            value={{
                pageContext,
                setPageContext,
                showNavigationLineInHeaderSmall,
                showPrimaryLineInHeaderSmall,
                showSecondaryLineInHeaderSmall,
                showSearchLineInHeaderSmall,
                showNavigationLineInHeader,
                showPrimaryLineInHeader,
                showSecondaryLineInHeader,
                showSearchLineInHeader,
                headerHeight,
                setHeaderHeight,
                footerHeight,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => useContext(PageContext);
