import { FC } from 'react';
import { getZIndex } from '../../utils/z-index';

interface CornersLayoutProps {
    background?: JSX.Element;
    topLeft?: JSX.Element;
    topRight?: JSX.Element;
    bottomCenter?: JSX.Element;
    bottomLeft?: JSX.Element;
    bottomRight?: JSX.Element;
    cornerOffset?: number;
}

/**
 * The corners layout provides a responsive layout with an element background and the possibility to add elements in each corner.
 */
export const CornersLayout: FC<CornersLayoutProps> = (props) => {
    const {
        background = <></>,
        topLeft = <></>,
        topRight = <></>,
        bottomCenter = <></>,
        bottomLeft = <></>,
        bottomRight = <></>,
        cornerOffset = 12,
    } = props;

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                height: '100%',
                width: '100%',
            }}
        >
            {background}
            <div
                style={{
                    position: 'absolute',
                    zIndex: getZIndex('2'),
                    top: `calc(env(safe-area-inset-top) + ${cornerOffset}px)`,
                    left: `${cornerOffset}px`,
                }}
            >
                {topLeft}
            </div>
            <div
                style={{
                    position: 'absolute',
                    zIndex: getZIndex('2'),
                    top: `calc(env(safe-area-inset-top) + ${cornerOffset}px)`,
                    right: `${cornerOffset}px`,
                }}
            >
                {topRight}
            </div>
            <div
                style={{
                    position: 'absolute',
                    zIndex: getZIndex('2'),
                    bottom: `${cornerOffset}px`,
                    left: `${cornerOffset}px`,
                    right: `${cornerOffset}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {bottomCenter}
            </div>
            <div
                style={{
                    position: 'absolute',
                    zIndex: getZIndex('2'),
                    bottom: `${cornerOffset}px`,
                    left: `${cornerOffset}px`,
                }}
            >
                {bottomLeft}
            </div>
            <div
                style={{
                    position: 'absolute',
                    zIndex: getZIndex('2'),
                    bottom: `${cornerOffset}px`,
                    right: `${cornerOffset}px`,
                }}
            >
                {bottomRight}
            </div>
        </div>
    );
};
