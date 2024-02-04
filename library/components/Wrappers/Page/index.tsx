import { Theme, useTheme } from '@emotion/react';
import { ContainerProps } from '@mui/material';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { isThemeColor } from '../../../../src/theme/themeBase';
import { isUnderBreakpoint } from '../../../hooks/useParentWidth';
import { VerticalContainer } from '../../Container/Vertical';
import { usePageContext } from '../../Header/context';
import './style.css';

export const DEFAULT_PAGE_GAP = 14;

interface PageWrapperProps {
    children: string | JSX.Element | JSX.Element[];
    headerVariant?: 'scroll' | 'fixed' | 'none';
    disableGap?: boolean;
    fixedLayout?: boolean; // A fixed layout take full height and width (not scrollable)
    fullWidth?: boolean; // Take full width (disable maxWidth)
    fullPage?: boolean; // A full page layout remove margin and title
    setFixedHeaderPadding?: (value: number) => void; // Padding of the header in fixed mode
    style?: ContainerProps['style']; // Custom style
}

export const PageWrapper: FC<PageWrapperProps> = ({
    children,
    headerVariant = 'scroll',
    disableGap = false,
    fixedLayout = false,
    fullWidth = false,
    fullPage = false,
    setFixedHeaderPadding: setHeaderPadding = () => {},
    style,
}) => {
    const theme = useTheme();
    const mediumLayout = isUnderBreakpoint(undefined, 'md');
    const headerRef = useRef<HTMLDivElement>(null!);
    const safeAreaInsetTop = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--sat').split('px')[0] || '0',
        10,
    );
    const { headerHeight, footerHeight, pageContext } = usePageContext();
    const [fixedHeaderPadding, setFixedHeaderPadding] = useState<number>(0);

    // Some pages need to know the padding of the header to avoid hiding the content when they are using fixed components
    useEffect(() => {
        if (setHeaderPadding) {
            setHeaderPadding(fixedHeaderPadding);
        }
    }, [fixedHeaderPadding]);

    // Add a listener to the header height to update the padding of the page wrapper
    useEffect(() => {
        if (headerRef && headerRef.current) {
            // Add a listener to the header height to update the padding of the page wrapper
            const handleResize = (entries: any) => {
                for (const entry of entries) {
                    setFixedHeaderPadding(entry.contentRect.height + safeAreaInsetTop);
                }
            };

            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(headerRef.current);

            // Remove the listener when the component is unmounted
            return () => {
                if (headerRef.current) {
                    resizeObserver.unobserve(headerRef.current);
                }
                resizeObserver.disconnect();
            };
        }
    }, [headerRef]);

    const renderBackgroundColor = () => {
        // By default, use the secondary color
        let backgroundColor = theme.colors.surface.secondary;

        // If the page has a background color, use it
        if (pageContext.background) {
            // If the background is a theme color, use the theme color
            if (isThemeColor(pageContext.background)) {
                backgroundColor =
                    theme.colors.surface[
                        pageContext.background as keyof Theme['colors']['surface']
                    ];
            } else {
                backgroundColor = pageContext.background;
            }
        }

        return backgroundColor;
    };

    return (
        <VerticalContainer
            fullWidth
            gap={disableGap ? 0 : DEFAULT_PAGE_GAP}
            maxWidth={fullWidth ? 'none' : theme.breakpoints.values.sm}
            justifyContent={fullPage ? 'center' : 'start'}
            paddingX={fullPage ? 0 : theme.size.pagePadding}
            paddingTop={fullPage || headerVariant === 'fixed' ? 0 : theme.size.pagePadding}
            height={fixedLayout ? '100vh' : 'min-content'}
            style={{
                margin: 'auto',
                minHeight: `calc(100vh - ${headerHeight}px)`,
                // Add a padding to avoid the navbar to hide the content
                // paddingBottom: fixedLayout
                //     ? smallLayout
                //         ? `calc(env(safe-area-inset-bottom) + ${theme.size.bottomNavigationHeight}px)`
                //         : 0
                //     : smallLayout
                //     ? 0
                //     : 22,

                paddingBottom: mediumLayout
                    ? `calc(env(safe-area-inset-bottom) + ${footerHeight}px)`
                    : fixedLayout
                      ? 0
                      : 22,
                // height: fixedLayout ? '100vh' : 'min-content', // Add a padding to avoid the navbar to hide the content
                // width: '-webkit-fill-available',
                // paddingTop: fullPage ? '0px' : '16px',
                // paddingBottom: fixedLayout ? '16px' : fullPage ? '0px' : '22px',
                // paddingLeft: '16px',
                // paddingRight: '16px',
                background: renderBackgroundColor(),
                // [theme.breakpoints.down('md')]: {
                //     paddingBottom: fullPage ? (isPWA ? '70px' : '50px') : isPWA ? '90px' : '70px', // Add a padding to avoid the navbar to hide the content
                //     paddingLeft: fullPage ? '0px' : '12px',
                //     paddingRight: fullPage ? '0px' : '12px',
                // },
                ...(style as CSSProperties),
            }}
        >
            {/* Render children */}
            {children}
        </VerticalContainer>
    );
};
