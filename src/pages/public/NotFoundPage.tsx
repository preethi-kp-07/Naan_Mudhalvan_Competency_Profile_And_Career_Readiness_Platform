import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
        <h2 className="text-base font-bold text-slate-800 mt-2">
          {language === 'ta' ? 'பக்கம் கிடைக்கவில்லை' : 'Page Not Found'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'நீங்கள் கோரிய பக்கம் நான் முதல்வன் திறன் மற்றும் தொழில் தயார்நிலை தளத்தில் இல்லை.'
            : 'The requested path does not exist in the Naan Mudhalvan Competency & Career Readiness portal.'}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
