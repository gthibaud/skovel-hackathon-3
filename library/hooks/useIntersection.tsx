import { RefObject, useEffect, useState } from 'react';

export const useIntersection = (ref: RefObject<HTMLDivElement>, threshold: number = 0.5) => {
    // const [position, setPosition] = useState<any>(ref.getBoundingClientRect());
    const [isVisible, setIsVisible] = useState(false);

    // Handle the scroll event
    const callbackIntersection = (e: IntersectionObserverEntry[]) => {
        const [entry] = e;
        setIsVisible(entry.isIntersecting);
    };

    const options: IntersectionObserverInit = {
        root: null, // Use viewport
        rootMargin: '0px', // Margin around the root
        threshold, // % of the element visible
    };

    // Attach the event listener to the window
    useEffect(() => {
        const observer = new IntersectionObserver(callbackIntersection, options);

        if (ref && ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref && ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return { isVisible };
};
