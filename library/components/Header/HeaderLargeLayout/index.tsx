import { SIDEBAR_WIDTH } from '@/api/const';
import { useTheme } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import { HorizontalContainer } from '../../Container/Horizontal';
import { VerticalContainer } from '../../Container/Vertical';
import { Surface } from '../../Surface';
import { usePageContext } from '../context';
import { HeaderActionButton } from './ActionButton';
import { HeaderBackButton } from './BackButton';
import { HeaderSearchField } from './SearchField';
import { HeaderShareButton } from './ShareButton';
import { HeaderTitle } from './Title';

interface HeaderProps {
    headerRef: React.RefObject<HTMLDivElement>;
}

export const NAVIGATION_LINE_HEIGHT = 32;
export const PRIMARY_LINE_HEIGHT = 32;
export const SECONDARY_LINE_HEIGHT = 26;
export const SEARCH_LINE_HEIGHT = 42;
export const LINES_GAP = 4;

/**
 * Header component
 * Render header depending on screen size
 * The header is composed of 4 lines that are displayed depending on the pageContext:
 * Navigation line: back button + action button (most of the time not used on top level pages)
 * Primary line: title or title and icon
 * Secondary line: subtitle (ex: race name or countdown) or action button (ex: filter)
 * Search line: search field
 */
export const HeaderLargeLayout: FC<HeaderProps> = (props) => {
    const { headerRef } = props;
    const {
        pageContext,
        setHeaderHeight,
        showNavigationLineInHeader,
        showPrimaryLineInHeader,
        showSearchLineInHeader,
        showSecondaryLineInHeader,
    } = usePageContext();
    const { onTop: isScrollOnTop } = useScroll();
    const [headerContentHeight, setHeaderContentHeight] = useState<number>(0);

    // On pageContext update, set the header height (used to update the padding of the page wrapper)
    useEffect(() => {
        // Compute the number of lines to display (used to compute the header height padding)
        const numberOfLines = [
            showNavigationLineInHeader,
            showPrimaryLineInHeader,
            showSecondaryLineInHeader,
            showSearchLineInHeader,
        ].filter((v) => v).length;

        // Compute the header height
        const headerHeight =
            (showNavigationLineInHeader ? NAVIGATION_LINE_HEIGHT : 0) +
            (showPrimaryLineInHeader ? PRIMARY_LINE_HEIGHT : 0) +
            (showSecondaryLineInHeader ? SECONDARY_LINE_HEIGHT : 0) +
            (showSearchLineInHeader ? SEARCH_LINE_HEIGHT : 0) +
            numberOfLines * LINES_GAP; // Lines gap

        // Set the header height without the padding
        setHeaderContentHeight(headerHeight);

        setHeaderHeight(headerHeight + 16); // Add 8px + 8px for the padding top and bottom
    }, [
        showNavigationLineInHeader,
        showPrimaryLineInHeader,
        showSearchLineInHeader,
        showSecondaryLineInHeader,
    ]);

    const theme = useTheme();

    return (
        <Surface
            innerRef={headerRef}
            variant="ice"
            disableCorners
            disableBorders
            style={{
                position: 'fixed',
                top: 0,
                left: SIDEBAR_WIDTH,
                right: 0,
                width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                zIndex: 3,
                borderBottom: `1px solid ${theme.colors.divider.primary}FF`,
                borderBottomColor: pageContext.showDivider
                    ? `${theme.colors.divider.primary}FF`
                    : isScrollOnTop
                      ? `${theme.colors.divider.primary}00`
                      : `${theme.colors.divider.primary}FF`,
                transition: 'border-bottom 0.2s ease-in-out',
                padding: 'calc(env(safe-area-inset-top) + 8px) 8px 8px 12px', // The safe-area-inset-top is used in PWA mode to avoid the toolbar of the device to hide the header
            }}
        >
            <VerticalContainer
                gap={LINES_GAP}
                height={headerContentHeight}
                style={{
                    transition: 'height 0.1s ease-in-out', // Allow the header to be animated when the height changes,
                }}
            >
                {showNavigationLineInHeader ? (
                    <HorizontalContainer
                        spaceBetween
                        height={NAVIGATION_LINE_HEIGHT}
                    >
                        <HeaderBackButton />
                        <HeaderShareButton />
                    </HorizontalContainer>
                ) : null}
                {showPrimaryLineInHeader ? (
                    <HorizontalContainer
                        spaceBetween
                        height={PRIMARY_LINE_HEIGHT}
                    >
                        <HeaderTitle height={PRIMARY_LINE_HEIGHT} />
                        {showSecondaryLineInHeader ? null : <HeaderActionButton />}
                    </HorizontalContainer>
                ) : null}
                {showSecondaryLineInHeader ? (
                    <HorizontalContainer
                        spaceBetween
                        height={SECONDARY_LINE_HEIGHT}
                    >
                        {/* <HeaderSubtitle height={SECONDARY_LINE_HEIGHT} /> */}
                        <HeaderActionButton />
                    </HorizontalContainer>
                ) : null}
                {showSearchLineInHeader ? <HeaderSearchField height={SEARCH_LINE_HEIGHT} /> : null}
            </VerticalContainer>
        </Surface>
    );
};
