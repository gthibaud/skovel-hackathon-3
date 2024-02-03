import { useCallback, useEffect, useState } from 'react';

export const useScroll = () => {
    const [onTop, setOnTop] = useState(true);
    const [y, setY] = useState(window.scrollY);

    // Handle the scroll event
    const handleScroll = useCallback(
        (e: { currentTarget: any }) => {
            const window = e.currentTarget;
            if (window.scrollY <= 0) {
                setOnTop(true);
            } else {
                setOnTop(false);
            }
            setY(window.scrollY);
        },
        [y],
    );

    // Attach the event listener to the window
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return { onTop, y };
};
