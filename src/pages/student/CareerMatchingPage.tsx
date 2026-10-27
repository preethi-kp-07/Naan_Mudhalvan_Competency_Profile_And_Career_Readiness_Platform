import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Target,
  ArrowRight,
  HelpCircle,
  Calculator,
  Code2,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useLanguage } from '../../i18n/LanguageContext';

export const CareerMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t, getCompetencyName } = useLanguage();
  const [careerRoles] = useState(studentService.getCareerRoles());
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Target className="w-3.5 h-3.5 text-blue-700" />
            <span>{language === 'ta' ? 'தொழில்துறை சீரமைப்பு அளவீடு' : 'Naan Mudhalvan Industry Alignment Matrix'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('career.pageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('career.pageSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsFormulaModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold rounded-xl bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 transition-all shadow-xs flex items-center gap-2"
        >
          <Calculator className="w-4 h-4 text-blue-600" />
          <span>{t('career.howCalculated')}</span>
        </button>
      </div>

      {/* 2. Explanatory Banner: Fit % vs Readiness % */}
      <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-blue-200/90 rounded-3xl p-5 sm:p-6 text-xs text-blue-950 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-extrabold text-blue-950 text-sm">
          <HelpCircle className="w-4 h-4 text-blue-700" />
          <span>{t('career.fitVsReadiness')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-white/80 rounded-2xl border border-blue-100">
            <strong className="text-blue-900 block font-bold mb-0.5">
              {language === 'ta' ? '1. தொழில் பொருத்தம் (Career Fit - Cosine Match):' : '1. Career Fit (Cosine Vector Match):'}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('career.fitExplainer')}
            </p>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-blue-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              {language === 'ta' ? '2. வேலைவாய்ப்பு தயார்நிலை (Placement Readiness):' : '2. Placement Readiness (Threshold Compliance):'}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('career.readinessExplainer')}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Career Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{role.averageSalaryRange}</p>
                </div>
                <Badge variant={role.demandLevel === 'Very High' ? 'danger' : 'info'} size="sm">
                  {role.demandLevel} {t('career.demand')}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">{role.description}</p>

              {/* Fit vs Readiness Metrics */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block tracking-wider">
                    {t('student.careerFit')}
                  </span>
                  <span className="text-2xl font-black text-blue-700 mt-0.5 block">{role.fitPercentage}%</span>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block tracking-wider">
                    {t('student.readiness')}
                  </span>
                  <span className="text-2xl font-black text-emerald-700 mt-0.5 block">{role.readinessPercentage}%</span>
                </div>
              </div>

              {/* Required Competencies */}
              <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  {t('career.requiredCompetencies')}:
                </span>
                <div className="space-y-1.5">
                  {Object.entries(role.requiredCompetencies).map(([comp, target]) => (
                    <div key={comp} className="flex items-center justify-between text-xs text-slate-600">
                      <span>{getCompetencyName(comp)}</span>
                      <span className="font-bold text-slate-800">{target}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills Warning */}
              {role.missingSkills && role.missingSkills.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50/60 rounded-2xl border border-amber-200/70 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">
                    {t('career.missingSkills')}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.missingSkills.map((s) => (
                      <span key={s} className="bg-white border border-amber-200 px-2 py-0.5 rounded-lg text-[10px] font-semibold text-amber-900">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">4-Week Structured Plan</span>
              <button
                onClick={() => navigate(`/student/skill-gaps?career=${role.id}`)}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>{t('career.exploreRoadmap')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formula & Calculation Modal */}
      <Modal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        title={t('career.formulaTitle')}
      >
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            {language === 'ta'
              ? 'நான் முதல்வன் தளம் மாணவர்களின் வேலைவாய்ப்புப் பொருத்தத்தை இரு சுயாதீனக் கணித அளவீடுகள் மூலம் கணக்கிடுகிறது:'
              : 'The Naan Mudhalvan platform separates placement evaluation into two distinct mathematical metrics:'}
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-blue-900">1. Cosine Similarity Formula (Career Fit %):</h4>
            <code className="block bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] my-1">
              Cosine_Fit = (A · B) / (||A|| × ||B||) × 100
            </code>
            <p className="text-[11px] text-slate-600">
              {language === 'ta'
                ? 'இங்கு A என்பது மாணவரின் 6-பரிமாணத் திறன் வெக்டர்; B என்பது குறிப்பிட்ட பணிக்கான இலட்சியத் தேவை வெக்டர்.'
                : 'Where A is the student\'s 6-dimensional competency vector and B is the ideal industry requirement vector.'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h4 className="font-bold text-emerald-900">2. Threshold Rule Compliance (Readiness %):</h4>
            <p className="text-[11px] text-slate-600">
              {language === 'ta'
                ? 'கட்டாயத் திறன்களில் மாணவர் குறைந்தபட்ச தகுதி அளவை (75%) எட்டியுள்ளாரா என்பதைச் சோதிக்கும் வெளிப்படையான விதி.'
                : 'Measures mandatory threshold compliance (e.g. at least 75% across core programming and database disciplines).'}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsFormulaModalOpen(false)}
              className="px-4 py-2 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
