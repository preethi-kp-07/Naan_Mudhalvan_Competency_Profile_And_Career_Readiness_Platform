import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left">
          <p className="font-semibold text-slate-700">
            {t('footer.line1')}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {t('footer.line2')}
          </p>
        </div>
        <div className="text-right sm:text-right text-[11px] text-slate-400">
          <p className="font-medium text-slate-500">{t('footer.version')}</p>
          <p className="text-slate-400">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};
