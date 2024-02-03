import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const initializeI18n = async (lng: string): Promise<void> => {
    // Lazy load translations
    await i18n
        .use(initReactI18next)
        .use(HttpApi)
        .init({
            backend: {
                loadPath: '/locales/{{lng}}.json',
            },
            lng,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            debug: true,
        });
};
