import styled from '@emotion/styled';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { Copy } from 'gthibaud-icons-react';
import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { share } from '../../utils/share';

interface CodeBlockProps {
    children: string | string[] | null | number | readonly string[];
    showLineNumbers?: boolean;
    language?: string;
    wrapLongLines?: boolean;
}

const Highlighter = styled(SyntaxHighlighter)({
    flexGrow: 1,
    borderRadius: 8,
});

export const CodeBlock: FC<CodeBlockProps> = ({
    children,
    showLineNumbers = false,
    language = 'typescript',
    wrapLongLines = true,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                flexGrow: 1,
            }}
        >
            <Tooltip title="Copy to clipboard">
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '22px',
                        right: '27px',
                        zIndex: 1,
                        color: 'rgba(255,255,255,0.5)',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        transition: 'all 0.1s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            color: 'rgba(255,255,255,0.8)',
                        },
                    }}
                    onClick={() => share(children?.toString() || '')}
                >
                    <Copy
                        sx={{
                            width: 18,
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Highlighter
                language={language}
                style={vscDarkPlus}
                wrapLongLines={wrapLongLines}
                showLineNumbers={showLineNumbers}
                codeTagProps={{
                    style: {
                        fontFamily: theme.typography.code.fontFamily,
                        fontWeight: 600,
                    },
                }}
            >
                {children?.toString() || ' '}
            </Highlighter>
        </Box>
    );
};
