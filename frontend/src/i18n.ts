import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file dịch thuật

// en
import enCommon from './locales/en/common.json';
import enLandingPage from './locales/en/landingPage.json';

// vi
import viCommon from './locales/vi/common.json';
import viLandingPage from './locales/vi/landingPage.json';
// import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(LanguageDetector)
    .use(initReactI18next) // Truyền instance i18n vào react-i18next
    .init({
        resources: {
            en: {
                common: enCommon,
                landingPage: enLandingPage,
            },
            vi: {
                common: viCommon,
                landingPage: viLandingPage,
            },
        },
        // lng: 'vi', // Ngôn ngữ mặc định khi khởi tạo
        fallbackLng: 'en', // Ngôn ngữ dự phòng nếu ngôn ngữ hiện tại không có bản dịch cho một khóa nào đó

        ns: ['common', 'landingPage'],
        defaultNS: 'common',

        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'], // Nơi lưu trữ ngôn ngữ đã phát hiện
        },

        interpolation: {
            escapeValue: false, // React đã bảo vệ khỏi XSS, nên không cần escape giá trị
        },
        // debug: true, // Bật debug để xem log của i18next trong console (hữu ích khi phát triển)
    });

export default i18n;

export const languageList: { [key: string]: string } = {
    vi: 'Tiếng Việt',
    en: 'English',
}