import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  TrendingUp,
  Target,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Calculator,
  X,
  Code2,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CareerMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [careerRoles] = useState(studentService.getCareerRoles());
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Target className="w-3.5 h-3.5 text-blue-700" />
            <span>Naan Mudhalvan Industry Alignment Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Career Matching & Readiness • வேலைவாய்ப்பு பொருத்தம்
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            உங்கள் திறன் வெக்டருக்கும் தொழில்துறை பணிகளுக்கும் உள்ள துல்லியமான பொருத்தம்
          </p>
        </div>

        <button
          onClick={() => setIsFormulaModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold rounded-xl bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 transition-all shadow-xs flex items-center gap-2"
        >
          <Calculator className="w-4 h-4 text-blue-600" />
          <span>How Score is Calculated? • சூத்திரம்</span>
        </button>
      </div>

      {/* 2. Explanatory Banner: Fit % vs Readiness % */}
      <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-blue-200/90 rounded-3xl p-5 sm:p-6 text-xs text-blue-950 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-extrabold text-blue-950 text-sm">
          <HelpCircle className="w-4 h-4 text-blue-700" />
          <span>புரிந்துகொள்ளுதல்: Fit % (பொருத்தம்) vs Readiness % (தயார்நிலை)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-white/80 rounded-2xl border border-blue-100">
            <strong className="text-blue-900 block font-bold mb-0.5">
              1. Career Fit (Cosine Vector Match):
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              உங்கள் திறன்களின் வடிவம் (Distribution shape) இந்த வேலைக்கான தேவைகளுடன் எவ்வளவு சதவீதம் பொருந்துகிறது என்பதை கோசைன் வெக்டர் கணிதம் மூலம் கணக்கிடுகிறது.
            </p>
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-blue-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              2. Placement Readiness (Threshold Compliance):
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              இந்த வேலைக்கான கட்டாயத் தேவைகளில் (எ.கா: SQL & Databases-ல் குறைந்தபட்சம் 75%) நீங்கள் தேர்ச்சி பெற்றுள்ளீர்களா என்பதை உறுதி செய்கிறது.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Career Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">{role.title}</h2>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block mt-1">
                    💰 {role.averageSalaryRange}
                  </span>
                </div>
                <Badge
                  variant={role.demandLevel === 'Very High' ? 'success' : 'info'}
                  size="sm"
                >
                  {role.demandLevel} Demand
                </Badge>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{role.description}</p>

              {/* Match Percentage Dual Metrics */}
              <div className="grid grid-cols-2 gap-3.5 my-5">
                <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-200/80 p-3.5 rounded-2xl text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-900 block tracking-wider">
                    Career Fit (பொருத்தம்)
                  </span>
                  <span className="text-3xl font-black text-blue-800 mt-1 block">
                    {role.fitPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Vector Alignment</span>
                </div>

                <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-200/80 p-3.5 rounded-2xl text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block tracking-wider">
                    Placement Readiness
                  </span>
                  <span className="text-3xl font-black text-emerald-700 mt-1 block">
                    {role.readinessPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Threshold Passing</span>
                </div>
              </div>

              {/* Required Skills Badges */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Required Competencies & Skills • தேவைப்படும் திறன்கள்
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {role.keySkills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Warning */}
              {role.missingSkills && role.missingSkills.length > 0 && (
                <div className="bg-rose-50/60 border border-rose-200/80 p-3.5 rounded-2xl mb-4 text-xs">
                  <span className="font-bold text-rose-900 block mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    முக்கிய குறைபாடுகள் (Sub-Threshold Skills):
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
                    {role.missingSkills.map((m) => (
                      <li key={m} className="font-medium">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Next Steps */}
              {role.nextSteps && (
                <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
                  <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                    அடுத்த கட்ட கற்றல் வழிமுறை (Recommended Steps):
                  </span>
                  {role.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px]">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => navigate(`/student/learning-materials?career=${role.id}`)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Labs • பாடங்கள்</span>
              </button>

              <button
                onClick={() => navigate(`/student/skill-gaps?career=${role.id}`)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-sm transition-all hover:shadow-md"
              >
                <span>Roadmap • வழிகாட்டி</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formula & Academic Methodology Modal (Impresses Guide & Explains Math) */}
      <Modal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        title="Mathematical Methodology: Cosine Vector Fit & Threshold Scoring"
      >
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p className="font-medium text-slate-800">
            This platform uses mathematical vector space modeling to evaluate students objectively without relying on simple unweighted percentage averages:
          </p>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] space-y-2">
            <span className="text-emerald-400 block font-bold">// 1. Cosine Vector Similarity (Career Fit %)</span>
            <p className="text-slate-300">
              Cosine Similarity = ( A • B ) / ( ||A|| * ||B|| )
            </p>
            <p className="text-slate-400 text-[10px]">
              Where vector A = Student Competency Scores, vector B = Role Required Target Scores.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] space-y-2">
            <span className="text-blue-400 block font-bold">// 2. Placement Readiness Compliance (Readiness %)</span>
            <p className="text-slate-300">
              Readiness % = Sum( min(Score_i, Target_i) * Weight_i ) / Sum( Target_i * Weight_i )
            </p>
            <p className="text-slate-400 text-[10px]">
              Critical core skills (e.g. Relational DB for Full Stack) have gating thresholds. If score &lt; 60%, readiness is capped.
            </p>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            This distinction allows university evaluators and recruiters to identify high-potential candidates who only need a 2-week remedial refresher vs candidates lacking foundational logic.
          </p>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setIsFormulaModalOpen(false)}
              className="px-4 py-2 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
            >
              புரிந்துகொண்டேன் • Got it
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
