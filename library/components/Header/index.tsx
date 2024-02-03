import { FC, useEffect, useRef } from 'react';
import { isUnderBreakpoint } from '../../hooks/useParentWidth';
import { usePageContext } from './context';
import { HeaderLargeLayout } from './HeaderLargeLayout';
import { HeaderSmallLayout } from './HeaderSmallLayout';

/**
 * Header component
 * Render header depending on screen size
 */
export const Header: FC = () => {
    const { pageContext, headerHeight } = usePageContext();

    const smallWindow = isUnderBreakpoint(undefined, 'md');

    const headerRef = useRef<HTMLDivElement>(null!);

    // Add a listener to the header height to update the padding of the page wrapper
    useEffect(() => {
        if (headerRef && headerRef.current) {
            // Add a listener to the header height to update the padding of the page wrapper
            const handleResize = (entries: any) => {
                for (const entry of entries) {
                    // setHeaderHeight(entry.contentRect.height + safeAreaInsetTop);
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

    return pageContext.showHeader === false ? null : (
        <>
            <header>
                {smallWindow ? (
                    <HeaderSmallLayout headerRef={headerRef} />
                ) : (
                    <HeaderLargeLayout headerRef={headerRef} />
                )}
            </header>
            {/* The padding of the page wrapper is updated to avoid the content to be hidden by the header */}
            <div
                style={{
                    height: `calc(${headerHeight}px + env(safe-area-inset-top))`,
                }}
            />
        </>
    );
};
