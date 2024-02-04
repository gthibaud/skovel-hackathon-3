/** @jsxImportSource @emotion/react */

'use client';

import { FC } from 'react';
import './PulsingDot.css';

interface PulsingDotProps {
    color: string;
    size?: number;
}

export const PulsingDot: FC<PulsingDotProps> = ({ color, size = 16 }) => {
    const dimensions = {
        width: `${size / 1.6}px`,
        height: `${size / 1.6}px`,
    };

    return (
        <div
            className="dot"
            css={{
                background: color,
                opacity: 0.8,
                ...dimensions,

                '&:before': {
                    background: color,
                    ...dimensions,
                },
                '&:after': {
                    background: color,
                    ...dimensions,
                },
            }}
        />
    );
};
