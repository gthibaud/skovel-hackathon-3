import { ReactNode, Suspense } from 'react';
import { LoadingProgressBar } from '../../library/components/LoadingProgressBar';

export const Loadable = (Component: any, fallback?: ReactNode) => (props: any) => (
    <Suspense fallback={fallback ? fallback : <LoadingProgressBar />}>
        <Component {...props} />
    </Suspense>
);
