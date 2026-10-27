import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Target,
  Award,
  Users,
  Sparkles,
  BarChart2,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2545] via-[#0D2E55] to-[#07192F] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t('landing.topTag')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {t('landing.heroTitle')}{' '}
            <span className="text-blue-400">{t('landing.heroTitleHighlight')}</span>{' '}
            {t('landing.heroTitleSuffix')}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t('landing.heroDescription')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('landing.exploreDemo')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t('landing.studentReg')}</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-left">
            <div>
              <p className="text-2xl font-bold text-white">6+</p>
              <p className="text-xs text-blue-200">{t('landing.metricCompetencies')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-blue-200">{t('landing.metricPrivacy')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Adaptive</p>
              <p className="text-xs text-blue-200">{t('landing.metricDiagnostic')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">QR Code</p>
              <p className="text-xs text-blue-200">{t('landing.metricPassport')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
            {t('landing.coreArch')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t('landing.coreArchTitle')}
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            {t('landing.coreArchSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featureCompTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featureCompDesc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featureGapTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featureGapDesc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featureFacultyTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featureFacultyDesc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featureRoadmapTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featureRoadmapDesc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featureMatchTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featureMatchDesc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('landing.featurePassportTitle')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t('landing.featurePassportDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">{t('landing.workflow')}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              {t('landing.workflowTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-800">{t('landing.step1Title')}</h4>
              <p className="text-xs text-slate-600 mt-1">
                {t('landing.step1Desc')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-800">{t('landing.step2Title')}</h4>
              <p className="text-xs text-slate-600 mt-1">
                {t('landing.step2Desc')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-800">{t('landing.step3Title')}</h4>
              <p className="text-xs text-slate-600 mt-1">
                {t('landing.step3Desc')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                4
              </span>
              <h4 className="text-sm font-bold text-slate-800">{t('landing.step4Title')}</h4>
              <p className="text-xs text-slate-600 mt-1">
                {t('landing.step4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portal Entry Points */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-[#0B2545] text-white p-8 rounded-2xl shadow-md border border-blue-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">{t('landing.forLearners')}</span>
            <h3 className="text-xl font-bold mt-1 text-white">{t('landing.studentPortal')}</h3>
            <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">
              {t('landing.studentPortalDesc')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold bg-white text-blue-900 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>{t('landing.loginAsStudent')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-[#07192F] text-white p-8 rounded-2xl shadow-md border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{t('landing.forEducators')}</span>
            <h3 className="text-xl font-bold mt-1 text-white">{t('landing.facultyPortal')}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t('landing.facultyPortalDesc')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>{t('landing.loginAsFaculty')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
