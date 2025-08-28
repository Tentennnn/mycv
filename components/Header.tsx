
import React from 'react';
import { useCvStore, useTranslations } from '../hooks/useCvStore';

const Header: React.FC = () => {
    const { language, setLanguage, theme, setTheme } = useCvStore();
    const t = useTranslations();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
            <h1 className={`text-2xl font-bold ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>{t('title')}</h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        {t('toggle_en')}
                    </button>
                    <button
                        onClick={() => setLanguage('km')}
                        className={`px-3 py-1 rounded-full text-sm font-khmer ${language === 'km' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        {t('toggle_km')}
                    </button>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
