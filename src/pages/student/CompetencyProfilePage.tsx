import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Compass,
  Info,
  ArrowRight,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { CompetencyBarChart } from '../../components/charts/CompetencyBarChart';
import { CompetencyRadarChart } from '../../components/charts/CompetencyRadarChart';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t, getCompetencyName, getLevelName } = useLanguage();
  const [competencies] = useState(studentService.getCompetencies());

  const overallScore = Math.round(
    competencies.reduce((acc, c) => acc + c.score, 0) / Math.max(1, competencies.length)
  );

  const strengths = competencies.filter((c) => c.score >= 80);
  const improvementAreas = competencies.filter((c) => c.score < 75);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span>{language === 'ta' ? 'சரிபார்க்கப்பட்ட திறன் வெக்டர்' : 'Verified Competency Vector'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('competency.pageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('competency.pageSubtitle')}
          </p>
        </div>

        <button
          onClick={() => navigate('/student/assessment')}
          className="px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{t('competency.retakeDiagnostic')}</span>
        </button>
      </div>

      {/* 2. Overview Metric Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#07192F] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-900/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'ta' ? 'தரப்படுத்தப்பட்ட அளவீட்டு அணி' : 'Standardized Benchmark Matrix'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'ta' ? `ஒட்டுமொத்தத் திறன் குறியீடு: ${overallScore}%` : `Overall Competency Index: ${overallScore}%`}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {language === 'ta'
                ? 'உங்கள் இணைய மென்பொருள் மற்றும் நிரலாக்கத் திறன் மிகச் சிறப்பாக உள்ளது. தொடர்புத் தரவுத்தளங்கள் (SQL) பிரிவில் கூடுதல் கவனம் தேவைப்படுகிறது.'
                : 'Your web engineering and programming competencies demonstrate high proficiency. Relational Databases & SQL represents an identified target for guided practice.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block tracking-wider">
                {t('competency.standing')}
              </span>
              <span className="text-base font-extrabold text-white">{getLevelName('Proficient')}</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block tracking-wider">
                {t('competency.lastEvaluated')}
              </span>
              <span className="text-base font-bold text-emerald-300">{language === 'ta' ? 'நேரலையாகப் புதுப்பிக்கப்பட்டது' : 'Live Updated'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Explainer Box */}
      <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-blue-950 shadow-2xs">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm text-blue-950">{t('competency.howToRead')}</p>
          <p className="text-blue-800 text-[11px] leading-relaxed">
            1. <strong>{t('competency.barChartExplainer')}</strong>
          </p>
          <p className="text-blue-800 text-[11px] leading-relaxed">
            2. <strong>{t('competency.radarChartExplainer')}</strong>
          </p>
        </div>
      </div>

      {/* 4. Visual Charts Grid (Radar, Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Vector Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {language === 'ta' ? 'திறன் திசை வரைபடம் (Radar Map)' : 'Competency Vector Map'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ta' ? 'அனைத்துத் துறைகளிலும் உங்கள் சமநிலையைக் காட்டுகிறது' : 'Multidimensional Radar comparison vs Target standard'}
            </p>
          </div>
          <CompetencyRadarChart competencies={competencies} height={300} />
        </div>

        {/* Target Benchmark Comparison Bar Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {language === 'ta' ? 'இலக்கு மதிப்பெண் ஒப்பீடு' : 'Target Score Differential'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ta' ? 'தற்போதைய மதிப்பெண் vs 75% தகுதி வரம்பு' : 'Current score vs 75% Passing Threshold'}
            </p>
          </div>
          <CompetencyBarChart competencies={competencies} height={300} />
        </div>
      </div>

      {/* 5. Strengths & Improvement Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{t('competency.strengths')}</span>
          </h3>

          <div className="space-y-3">
            {strengths.map((s) => (
              <div key={s.competency} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{getCompetencyName(s.competency)}</span>
                  <Badge variant="success" size="sm">
                    {s.score}% ({language === 'ta' ? 'இலக்கு' : 'Target'}: {s.targetScore}%)
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  {language === 'ta'
                    ? 'தொழில்துறை எதிர்பார்ப்பை விட அதிக மதிப்பெண். மேம்பட்ட திட்டங்களை உருவாக்கப் பரிந்துரைக்கப்படுகிறது.'
                    : 'Demonstrated mastery above employment benchmark. Recommended for advanced projects.'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>{t('competency.areasForImprovement')}</span>
          </h3>

          <div className="space-y-3">
            {improvementAreas.map((s) => (
              <div key={s.competency} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{getCompetencyName(s.competency)}</span>
                  <Badge variant="warning" size="sm">
                    {s.score}% ({language === 'ta' ? 'இலக்கு' : 'Target'}: {s.targetScore}%)
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  {language === 'ta'
                    ? `இலக்கை எட்ட ${s.targetScore - s.score}% மதிப்பெண் இடைவெளி உள்ளது. பேராசிரியர்கள் ஒதுக்கிய குறிப்புகள் தயாராக உள்ளன.`
                    : `Identified difference of ${s.targetScore - s.score}% from threshold. Remedial study materials assigned.`}
                </p>
                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex justify-end">
                  <button
                    onClick={() => navigate(`/student/learning-materials?skill=${encodeURIComponent(s.competency)}`)}
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>{t('materials.openResource')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
