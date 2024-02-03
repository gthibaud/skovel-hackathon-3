import { Skeleton } from '@mui/material';
import { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface MarkdownProps {
    isLoading?: boolean;
    children?: string;
}

export const Markdown: FC<MarkdownProps> = ({ isLoading, children = '' }) => {
    return isLoading ? (
        <Skeleton
            width="100%"
            height="100%"
        />
    ) : (
        <ReactMarkdown>{children}</ReactMarkdown>
    );
};
