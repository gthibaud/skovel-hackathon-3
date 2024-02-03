import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'auto';
export type Theme = 'light' | 'dark';

interface Settings {
    direction?: 'ltr' | 'rtl';
    language: 'en' | 'fr' | 'es';
    pinSidebar: boolean;
    themePreference: ThemePreference;
    userName?: string; // Used in the chat to display the user's name (if not connected) TODO move to InteractionsContext
}

export interface SettingsContextValue {
    settings: Settings;
    saveSettings: (update: Settings) => void;
}

interface SettingsProviderProps {
    children?: ReactNode;
}

const initialSettings: Settings = {
    direction: 'ltr',
    language: 'en',
    pinSidebar: true,
    themePreference: 'auto',
};

export const restoreSettings = (): Settings | undefined => {
    let settings: Settings;

    try {
        const storedData = window.localStorage.getItem('settings');

        if (storedData) {
            settings = JSON.parse(storedData);
        } else {
            settings = initialSettings;
        }
        return settings;
    } catch (err: any) {
        console.error(err);
        // If stored data is not a strigified JSON this will fail,
        // that's why we catch the error
    }
};

export const storeSettings = (settings: Settings): void => {
    window.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
    settings: initialSettings,
    saveSettings: () => {},
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
    const { children } = props;
    const [settings, setSettings] = useState<Settings>(initialSettings);

    // On initial load, restore settings from local storage
    useEffect(() => {
        const restoredSettings = restoreSettings();

        if (restoredSettings) {
            setSettings(restoredSettings);
        }
    }, []);

    /**
     * Save settings to local storage and state
     * @param updatedSettings New settings to save
     */
    const saveSettings = (updatedSettings: Settings): void => {
        setSettings(updatedSettings);
        storeSettings(updatedSettings);
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                saveSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

SettingsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);
