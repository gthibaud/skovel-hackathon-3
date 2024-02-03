import { alpha, Box, Tab, Tabs } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export type TabLayout = {
    href: string;
    label: string;
};
export interface TabsLayoutProps {
    outletContext?: any;
    tabs: TabLayout[];
    sx?: any;
}

export const TabsLayout: FC<TabsLayoutProps> = ({ tabs, outletContext, sx }) => {
    const location = useLocation();

    return (
        <Box
            sx={{
                borderBottom: 2,
                borderColor: (theme) => `${alpha(theme.palette.divider, 0.8)}`,
                ...sx,
            }}
        >
            <Tabs
                allowScrollButtonsMobile
                sx={{
                    mt: -2,
                    mb: '-2px',
                }}
                value={tabs.findIndex((tab) => tab.href === location.pathname)}
                variant="scrollable"
                indicatorColor="primary"
            >
                {tabs.map((option) => (
                    <Tab
                        component={RouterLink}
                        key={option.href}
                        label={option.label}
                        to={option.href}
                        sx={{
                            fontWeight: '500',
                            fontSize: '13px',
                            py: 0,
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};
