import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (langCode: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLang');
      if (savedLang) {
        setLanguageState(savedLang);
        i18n.locale = savedLang;
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (langCode: string) => {
    await AsyncStorage.setItem('selectedLang', langCode);
    setLanguageState(langCode);
    i18n.locale = langCode;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};