import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  showIcon = true,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 shadow-2xs select-none ${className}`}
    >
      {showIcon && (
        <span className="pl-2 pr-1 text-slate-500 hidden sm:inline-flex items-center" title="Language Selector">
          <Languages className="w-3.5 h-3.5" />
        </span>
      )}

      {/* English Option */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150 flex items-center gap-1 ${
          language === 'en'
            ? 'bg-white text-blue-700 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
        }`}
        title="Switch to English"
      >
        <span>English</span>
      </button>

      {/* Tamil Option */}
      <button
        type="button"
        onClick={() => setLanguage('ta')}
        aria-pressed={language === 'ta'}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150 flex items-center gap-1 font-tamil ${
          language === 'ta'
            ? 'bg-white text-blue-700 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
        }`}
        title="தமிழுக்கு மாறவும்"
      >
        <span>தமிழ்</span>
      </button>
    </div>
  );
};
