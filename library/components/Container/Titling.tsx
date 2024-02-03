import { Interpolation } from '@emotion/react';
import { CSSProperties, FC, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltingContainerProps {
    children: React.ReactNode;
    glare?: boolean;
    scale?: number;
    className?: string;
    [key: string]: any;
    fullWidth?: boolean;
    disabled?: boolean;
    style?: Interpolation<CSSProperties>;
}

export const TiltingContainer: FC<TiltingContainerProps> = (props) => {
    const tiltRef = useRef(null);

    const { glare, max, fullWidth, disabled, scale = 1.05, style, ...rest } = props;

    const options = {
        scale,
        speed: 1000,
        max: max ? max : 1,
        perspective: 150,
        maxGlare: 0.005,
        glare: glare ? true : false,
        fullPageListening: true,
        gyroscope: true,
    };

    useEffect(() => {
        tiltRef.current && VanillaTilt.init(tiltRef.current, options);
    }, [options, tiltRef]);

    // useEffect(() => {
    //     if (tiltRef.current) {

    //         const tilt = tiltRef.current as any;

    //         if (disabled) {
    //             tilt.vanillaTilt.destroy();
    //         } else {
    //             VanillaTilt.init(tiltRef.current, options)
    //         }
    //     }
    // }, [disabled]);

    if (disabled) {
        return <div>{props.children}</div>;
    }

    return (
        <div
            ref={tiltRef}
            style={{
                width: fullWidth ? '100%' : 'auto',
                ...(style as CSSProperties),
            }}
            {...rest}
        />
    );
};
