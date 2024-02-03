import { useCallback, useEffect, useState } from 'react';

/**
 * This hook returns true if the user is scrolling down, false otherwise
 * It is used to hide extra informations from the header when the user is scrolling down
 * There is a 100px threshold to avoid hiding the header when the user is scrolling a little bit
 * @returns true if the user is scrolling down, false otherwise
 */
export const useScrollCondensed = () => {
    const [condensed, setCondensed] = useState(false);
    const [y, setY] = useState(window.scrollY);

    // Handle the scroll event
    const handleNavigation = useCallback(
        (e: { currentTarget: any }) => {
            const window = e.currentTarget;
            if (y > window.scrollY || window.scrollY < 100) {
                setCondensed(false);
            } else if (y < window.scrollY) {
                setCondensed(true);
            }
            setY(window.scrollY);
        },
        [y],
    );

    // Attach the event listener to the window
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener('scroll', handleNavigation);

        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);

    return condensed;
};
