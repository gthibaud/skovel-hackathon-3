"use client"

import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { createCustomTheme } from '@/theme/mui-theme';
import { themeBase } from '@/theme/themeBase';
import { themeDark } from '@/theme/themeDark';
import { themeLight } from '@/theme/themeLight';
import { Theme, ThemeProvider } from '@emotion/react';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../../library/components/Navbar';
import { mergeObjects } from '../../library/utils/partialObjects';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { settings } = useSettings();

    const [currentTheme, setCurrentTheme] = useState<Theme>(themeLight);
    const [muiTheme, setMuiTheme] = useState<any>(
        createCustomTheme({
            direction: settings.direction,
            theme: settings.themePreference,
        }),
    );

    // Use a mediaQuery hook to detect system theme preference
    const prefersDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });

    // On system theme preference change, if auto, update the theme
    useEffect(() => {
        switch (settings.themePreference) {
            case 'auto':
                setCurrentTheme(prefersDarkMode ? themeDark : themeLight);
                setMuiTheme(
                    createCustomTheme({
                        direction: settings.direction,
                        theme: prefersDarkMode ? 'dark' : 'light',
                    }),
                );
                break;
            case 'dark':
                setCurrentTheme(themeDark);
                setMuiTheme(
                    createCustomTheme({
                        direction: settings.direction,
                        theme: 'dark',
                    }),
                );
                break;
            case 'light':
                setCurrentTheme(themeLight);
                setMuiTheme(
                    createCustomTheme({
                        direction: settings.direction,
                        theme: 'light',
                    }),
                );
                break;
            default:
                setCurrentTheme(themeLight);
                setMuiTheme(
                    createCustomTheme({
                        direction: settings.direction,
                        theme: 'light',
                    }),
                );
                break;
        }
    }, [prefersDarkMode, settings.themePreference, settings.direction]);

    return (
        <QueryClientProvider client={queryClient}>
            <SettingsProvider>
                <ThemeProviderMUI theme={muiTheme}>
                    <ThemeProvider
                        theme={mergeObjects(themeBase, currentTheme)}
                    >
                        <html lang="en">
                            <body className={inter.className}>
                                <Navbar />
                                {children}
                            </body>
                        </html>
                    </ThemeProvider>
                </ThemeProviderMUI>
            </SettingsProvider>
        </QueryClientProvider>
    );
}
