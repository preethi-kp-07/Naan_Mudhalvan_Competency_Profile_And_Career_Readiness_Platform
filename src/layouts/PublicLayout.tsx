import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { Footer } from '../components/common/Footer';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

export const PublicLayout: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner Disclaimer */}
      <div className="bg-[#07192F] text-blue-200 text-xs py-1.5 px-4 text-center border-b border-blue-900/40">
        <span className="font-medium">
          {t('common.platformSubtitle')}
        </span>
      </div>

      {/* Public Navbar */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0B2545] flex items-center justify-center text-white shadow-sm">
              <Compass className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0B2545] tracking-tight block leading-tight">
                NAAN MUDHALVAN
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">
                {t('common.platformTitle')}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/#features"
              className="text-xs font-medium text-slate-600 hover:text-blue-700 hidden md:inline-block px-2.5 py-1.5"
            >
              {t('nav.keyFeatures')}
            </Link>
            <Link
              to="/#how-it-works"
              className="text-xs font-medium text-slate-600 hover:text-blue-700 hidden md:inline-block px-2.5 py-1.5"
            >
              {t('nav.howItWorks')}
            </Link>

            {/* Language Selector */}
            <LanguageToggle />

            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t('common.goToDashboard')}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t('common.signIn')}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('landing.studentReg')}</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
