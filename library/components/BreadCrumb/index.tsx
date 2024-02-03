import { Breadcrumbs, Link, Typography } from '@mui/material';
import RouterLink from 'next/link';
import { FC } from 'react';

interface BreadcrumbProps {
    links: {
        label: string;
        to: string;
    }[];
    currentPage: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ links = [], currentPage = '' }) => {
    return (
        <Breadcrumbs
            separator="/"
            sx={{ mb: 2 }}
        >
            {links.map(({ label, to }, index) => (
                <Link
                    color="textSecondary"
                    href={to}
                    underline="hover"
                    component={RouterLink}
                >
                    {label}
                </Link>
            ))}
            <Typography color="textPrimary">{currentPage}</Typography>
        </Breadcrumbs>
    );
};
