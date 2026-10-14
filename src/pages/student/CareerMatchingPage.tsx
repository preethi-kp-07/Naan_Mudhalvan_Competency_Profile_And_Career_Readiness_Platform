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
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';

export const CareerMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [careerRoles] = useState(studentService.getCareerRoles());

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Career Matching & Readiness</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Objective alignment between your competency vector and industry career pathways
        </p>
      </div>

      {/* Explanatory Banner: Fit % vs Readiness % */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-blue-950">
          <HelpCircle className="w-4 h-4 text-blue-700" />
          <span>Understanding Fit % vs Readiness %</span>
        </div>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          <strong>Career Fit (Cosine Vector Similarity):</strong> Measures how well your skill distribution matches the shape of the role's required competency profile.
        </p>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          <strong>Career Readiness (Threshold Rule Scoring):</strong> Evaluates whether your verified scores meet minimum passing criteria across non-negotiable requirements (e.g. SQL & Databases for Full Stack). Fit % and Readiness % are calculated separately and do not represent a probability of being hired.
        </p>
      </div>

      {/* Career Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{role.title}</h2>
                  <span className="text-[11px] text-slate-500">{role.averageSalaryRange}</span>
                </div>
                <Badge
                  variant={role.demandLevel === 'Very High' ? 'success' : 'info'}
                  size="sm"
                >
                  {role.demandLevel} Demand
                </Badge>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{role.description}</p>

              {/* Match Percentage Metrics */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Career Fit (Vector Match)
                  </span>
                  <span className="text-2xl font-black text-blue-800 mt-1 block">
                    {role.fitPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-400">Cosine Alignment</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Placement Readiness
                  </span>
                  <span className="text-2xl font-black text-emerald-700 mt-1 block">
                    {role.readinessPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-400">Threshold Compliance</span>
                </div>
              </div>

              {/* Required Skills Badges */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Required Competencies & Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {role.keySkills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Warning */}
              {role.missingSkills && role.missingSkills.length > 0 && (
                <div className="bg-rose-50/50 border border-rose-200/60 p-3 rounded-xl mb-4 text-xs">
                  <span className="font-semibold text-rose-900 block mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    Missing or Sub-Threshold Skills:
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
                    {role.missingSkills.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Next Steps */}
              {role.nextSteps && (
                <div className="text-xs space-y-1 text-slate-600">
                  <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                    Recommended Learning Pathway:
                  </span>
                  {role.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate(`/student/learning-materials?career=${role.id}`)}
                className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Learning Materials</span>
              </button>

              <button
                onClick={() => navigate(`/student/skill-gaps?career=${role.id}`)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1 shadow-2xs"
              >
                <span>View Roadmap</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
