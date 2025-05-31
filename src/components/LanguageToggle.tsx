
import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="h-9 w-9"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">{language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}</span>
    </Button>
  );
};

export default LanguageToggle;
