import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  Info,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { CompetencyDonutChart } from '../../components/charts/CompetencyDonutChart';
import { CompetencyBarChart } from '../../components/charts/CompetencyBarChart';
import { CompetencyRadarChart } from '../../components/charts/CompetencyRadarChart';
import { Badge } from '../../components/common/Badge';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
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
            <span>Naan Mudhalvan Verified Competency Vector</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Competency Profile • என் திறன் விவரக்குறிப்பு
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            தொழில்துறை தேவைகளுடன் உங்கள் தற்போதைய திறனை ஒப்பிடும் வரைபடம்
          </p>
        </div>

        <button
          onClick={() => navigate('/student/assessment')}
          className="px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Retake Diagnostic • மீண்டும் எழுத</span>
        </button>
      </div>

      {/* 2. Overview Metric Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#07192F] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-900/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Standardized Benchmark Matrix</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Overall Competency Index: {overallScore}%
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              உங்கள் இணைய மென்பொருள் மற்றும் நிரலாக்கத் திறன் மிகச் சிறப்பாக உள்ளது. ரிலேஷனல் டேட்டாபேஸ் (SQL) பிரிவில் சிறிதளவு கூடுதல் பயிற்சி தேவைப்படுகிறது.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block tracking-wider">
                Current Standing
              </span>
              <span className="text-base font-extrabold text-white">Proficient (Tier 2)</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block tracking-wider">
                Last Evaluated
              </span>
              <span className="text-base font-bold text-emerald-300">Live Updated</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Easy Explainer Box for Students from Govt School/College */}
      <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-blue-950 shadow-2xs">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm text-blue-950">வரைபடங்களை எவ்வாறு புரிந்துகொள்வது? (How to read these charts):</p>
          <p className="text-blue-800 text-[11px] leading-relaxed">
            1. <strong>Bar Chart (ஒப்பீட்டு பட்டை):</strong> நீல நிற பார் (Blue) உங்கள் மதிப்பெண், சாம்பல் நிற பார் (Gray) நிறுவனங்கள் எதிர்பார்க்கும் 75% தகுதி வரம்பு. நீல நிறம் சாம்பல் நிறத்தை விட அதிகமாக இருந்தால் நீங்கள் தகுதி பெற்றுள்ளீர்கள்!
          </p>
          <p className="text-blue-800 text-[11px] leading-relaxed">
            2. <strong>Radar Map (திசை வரைபடம்):</strong> கோடுகள் வெளிப்புற விளிம்பை நோக்கி செல்லச் செல்ல உங்கள் திறன் நிபுணத்துவ நிலையை எட்டுகிறது என அர்த்தம்.
          </p>
        </div>
      </div>

      {/* 4. Visual Charts Grid (Radar, Bar, Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Vector Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Competency Vector Map • திறன் திசை வரைபடம்
            </h3>
            <p className="text-xs text-slate-500">Multidimensional Radar comparison vs Target standard</p>
          </div>
          <CompetencyRadarChart competencies={competencies} height={300} />
        </div>

        {/* Target Benchmark Comparison Bar Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Target Score Differential • இலக்கு ஒப்பீடு
            </h3>
            <p className="text-xs text-slate-500">Current score vs 75% Passing Threshold</p>
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
            <span>Demonstrated Core Strengths • சிறந்த திறன்கள்</span>
          </h3>

          <div className="space-y-3">
            {strengths.map((s) => (
              <div key={s.competency} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{s.competency}</span>
                  <Badge variant="success" size="sm">{s.score}% (Target: {s.targetScore}%)</Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  நிறுவன எதிர்பார்ப்பை விட அதிக மதிப்பெண். மேம்பட்ட திட்டங்களை உருவாக்க பரிந்துரைக்கப்படுகிறது.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Areas for Learning Focus • கவனம் தேவைப்படும் பகுதிகள்</span>
          </h3>

          <div className="space-y-3">
            {improvementAreas.map((s) => (
              <div key={s.competency} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{s.competency}</span>
                  <Badge variant="warning" size="sm">{s.score}% (Target: {s.targetScore}%)</Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  இலக்கை எட்ட {s.targetScore - s.score}% மதிப்பெண் இடைவெளி உள்ளது. பேராசிரியர்கள் ஒதுக்கிய குறிப்புகள் தயாராக உள்ளன.
                </p>
                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex justify-end">
                  <button
                    onClick={() => navigate(`/student/learning-materials?skill=${encodeURIComponent(s.competency)}`)}
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>பாடங்களைப் பார்க்க • View Materials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Full Competency Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
          Detailed Competency Matrix • முழுமையான திறன் அட்டவணை
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Competency Domain</th>
                <th className="pb-3">Your Score</th>
                <th className="pb-3">Target</th>
                <th className="pb-3">Proficiency Tier</th>
                <th className="pb-3">Last Evaluated</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competencies.map((c) => (
                <tr key={c.competency} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">{c.competency}</td>
                  <td className="py-3.5 font-extrabold text-blue-700 text-sm">{c.score}%</td>
                  <td className="py-3.5 text-slate-500 font-medium">{c.targetScore}%</td>
                  <td className="py-3.5">
                    <Badge variant={c.score >= 80 ? 'success' : c.score >= 60 ? 'info' : 'warning'} size="sm">
                      {c.level}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-slate-500">{c.lastAssessed}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => navigate('/student/skill-gaps')}
                      className="text-blue-700 hover:underline font-bold"
                    >
                      View Gap →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
