import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const usePagination = (
    dynamicObject: UseQueryResult<any, unknown>,
    setNextPageToken?: (nextPageToken: string | undefined) => void,
): [number, (pageNumber: number) => void] => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageTokenStack, setPageTokenStack] = useState<(string | undefined)[]>([undefined]);

    const handlePageChange = (page: number) => {
        // If the page is the previous page, get the previous page token
        if (page === currentPage - 1) {
            // Remove the last element from the stack
            const pageTokenStackTmp = pageTokenStack.slice(0, pageTokenStack.length - 1);

            // Set the stack
            setPageTokenStack(pageTokenStackTmp);
        }

        // If the page is the next page, get the next page token
        if (page === currentPage + 1) {
            const pageToken = dynamicObject.data?.nextPageToken;

            // Set the previous page token
            setPageTokenStack([...pageTokenStack, pageToken]);
        }

        // Set the current page
        setCurrentPage(page);
    };

    useEffect(() => {
        // Set the next page token
        setNextPageToken && setNextPageToken(pageTokenStack[pageTokenStack.length - 1]);
    }, [pageTokenStack]);

    return [currentPage, handlePageChange];
};

export const usePaginationStatic = (
    items: any[],
): [number, any[], (pageNumber: number) => void] => {
    const [currentItems, setCurrentItems] = useState<any[]>(items.slice(0, DEFAULT_PAGE_SIZE));
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;
        const endIndex = startIndex + DEFAULT_PAGE_SIZE;

        // Extract current items from items
        const pageItems = items.slice(startIndex, endIndex);

        // Set thecurrent items
        setCurrentItems(pageItems);

        // Set the current page
        setCurrentPage(page);
    };

    // On items list change (ex : a category is selected), update the current items
    useEffect(() => {
        handlePageChange(currentPage);
    }, [items]);

    return [currentPage, currentItems, handlePageChange];
};

export const DEFAULT_PAGE_SIZE = 50;
