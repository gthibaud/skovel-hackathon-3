import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { FC } from 'react';
import { DEFAULT_PAGE_SIZE } from '../../hooks/use-pagination';
import { ChevronLeft as ChevronLeftIcon } from '../../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';

interface PaginationProps {
    disabled: boolean;
    onPageChange: (newPage: number) => void;
    page: number;
    rowsCount: number;
    pageSize?: number;
}

const PaginationRoot = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(1),
}));

export const Pagination: FC<PaginationProps> = (props) => {
    const {
        disabled,
        onPageChange,
        page,
        rowsCount = 999999,
        pageSize = DEFAULT_PAGE_SIZE,
        ...other
    } = props;
    const pagesCount = Math.ceil(rowsCount / pageSize);
    const isFirstPage = page === 1;
    const isLastPage = page >= pagesCount;

    const handlePreviousPage = () => {
        onPageChange?.(page - 1);
    };

    const handleNextPage = () => {
        onPageChange?.(page + 1);
    };

    return (
        <PaginationRoot {...other}>
            {pagesCount > 0 && (
                <Typography
                    color="textSecondary"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: '13px',
                    }}
                    variant="body2"
                    whiteSpace="nowrap"
                >
                    Page{' '}
                    <Typography
                        color="textPrimary"
                        component="span"
                        sx={{ mx: 0.8, fontSize: '13px' }}
                        variant="subtitle2"
                    >
                        {page}
                    </Typography>
                    of{' '}
                    <Typography
                        color="textPrimary"
                        component="span"
                        sx={{ ml: 0.8, fontSize: '13px' }}
                        variant="subtitle2"
                    >
                        {pagesCount}
                    </Typography>
                </Typography>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
                disabled={isFirstPage || disabled}
                onClick={handlePreviousPage}
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                disabled={isLastPage || disabled}
                onClick={handleNextPage}
            >
                <ChevronRightIcon />
            </IconButton>
        </PaginationRoot>
    );
};
