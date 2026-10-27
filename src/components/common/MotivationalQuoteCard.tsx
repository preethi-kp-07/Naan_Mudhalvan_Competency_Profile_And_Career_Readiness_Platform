import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';
import { getDailyQuote, MOTIVATIONAL_QUOTES } from '../../data/mockQuotes';
import { useLanguage } from '../../i18n/LanguageContext';
import { TAMIL_QUOTES } from '../../i18n/dataTranslations';

export const MotivationalQuoteCard: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState<number | undefined>(undefined);
  const [isRotating, setIsRotating] = useState(false);
  const { language } = useLanguage();

  const currentQuote = getDailyQuote(quoteIndex);
  const tamilQuote = TAMIL_QUOTES[currentQuote.id];

  const displayQuote = language === 'ta' && tamilQuote ? tamilQuote.quote : currentQuote.quote;
  const displayAuthor = language === 'ta' && tamilQuote ? tamilQuote.author : currentQuote.author;
  const displayCategory = language === 'ta' && tamilQuote ? tamilQuote.category : currentQuote.category;

  const handleNextQuote = () => {
    setIsRotating(true);
    setTimeout(() => {
      const nextIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      setQuoteIndex(nextIdx);
      setIsRotating(false);
    }, 200);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0B2545] to-[#133E87] rounded-xl p-5 text-white shadow-sm border border-blue-900/40">
      {/* Subtle decorative background watermark */}
      <Quote className="absolute -bottom-4 -right-2 w-28 h-28 text-white/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 max-w-3xl">
          <div className="p-2 bg-white/10 rounded-lg shrink-0 border border-white/15">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200">
                {language === 'ta' ? 'தினசரி கற்றல் ஊக்கம்' : 'Daily Learning Inspiration'} • {displayCategory}
              </span>
            </div>
            <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed italic">
              "{displayQuote}"
            </p>
            <p className="text-xs text-blue-200/90 mt-1 font-normal">
              — {displayAuthor}
            </p>
          </div>
        </div>

        <button
          onClick={handleNextQuote}
          title={language === 'ta' ? 'அடுத்த ஊக்க சிந்தனையை ஏற்றுக' : 'Load another inspirational thought'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors duration-150 shrink-0 self-end sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>{language === 'ta' ? 'புதிய சிந்தனை' : 'New Inspiration'}</span>
        </button>
      </div>
    </div>
  );
};
