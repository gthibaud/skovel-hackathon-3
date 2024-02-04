import { Theme, useTheme } from '@emotion/react';
import { RefObject, useEffect, useRef, useState } from 'react';

export interface ParentWidthProps {
    /** Width of the parent (if not set, -1) */
    parentWidth?: number;
}

export const useParentWidth = (): [RefObject<HTMLDivElement>, number] => {
    // Parent element ref
    const parentRef = useRef<HTMLDivElement>(null);
    // Width of the parent element (-1 if not yet measured)
    const [width, setWidth] = useState<number>(-1);

    const handleWindowResize = () => {
        if (!parentRef || !parentRef.current) return;

        const newWidth = parentRef.current.getBoundingClientRect().width || -1;
        // TODO check if it works well

        setWidth(newWidth);
    };

    // Attach event listener to window resize
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // Trigger window resize event on parent element resize
    useEffect(() => {
        handleWindowResize();
    }, [parentRef?.current]);

    return [parentRef, width];
};

/**
 * Check if the width is under a given breakpoint
 * @param width Width of the parent element. If undefined, it will use the width of the window.
 * @param breakpoint Breakpoint to check against
 * @returns True if the width is under the breakpoint, false otherwise
 */
export const isUnderBreakpoint = (
    width: number | undefined,
    breakpoint: keyof Theme['breakpoints']['values'] | number,
): boolean => {
    if (typeof window !== 'undefined') {
        if (width === undefined) {
            width = window.innerWidth;
        }

        if (typeof breakpoint === 'number') return width <= breakpoint;

        const breakpoints = useTheme().breakpoints.values[breakpoint];

        return width <= breakpoints;
    }
    return false;
};

export const isOverBreakpoint = (
    width: number | undefined,
    breakpoint: keyof Theme['breakpoints']['values'] | number,
) => {
    if (typeof window !== 'undefined') {
        if (width === undefined) return false;

        if (typeof breakpoint === 'number') return width >= breakpoint;

        const breakpoints = useTheme().breakpoints.values[breakpoint];

        return width > breakpoints;
    }
    return false;
};
