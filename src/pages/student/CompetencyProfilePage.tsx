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
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { CompetencyDonutChart } from '../../components/charts/CompetencyDonutChart';
import { CompetencyBarChart } from '../../components/charts/CompetencyBarChart';
import { Badge } from '../../components/common/Badge';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [competencies] = useState(studentService.getCompetencies());

  const overallScore = Math.round(
    competencies.reduce((acc, c) => acc + c.score, 0) / Math.max(1, competencies.length)
  );

  const strengths = competencies.filter((c) => c.score >= 80);
  const improvementAreas = competencies.filter((c) => c.score < 70);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Competency Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic skill vector measured through objective standardized benchmarks
          </p>
        </div>

        <button
          onClick={() => navigate('/student/assessment')}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Retake Diagnostic</span>
        </button>
      </div>

      {/* Overview Metric Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133E87] rounded-2xl p-6 text-white shadow-md border border-blue-900/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="info" size="sm">
              <ShieldCheck className="w-3 h-3 mr-1 inline" />
              Verified Competency Vector
            </Badge>
            <h2 className="text-2xl font-bold text-white">Overall Index: {overallScore}%</h2>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              Your profile indicates high proficiency in Web Engineering and Programming, with identified learning intervention required in Relational Databases & SQL.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-xl border border-white/15 shrink-0">
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-semibold block">Proficiency Level</span>
              <span className="text-base font-bold text-white">Proficient (Tier 2)</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-semibold block">Last Benchmark</span>
              <span className="text-base font-bold text-emerald-300">March 25, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Competency Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Competency scores and proportions across core pillars</p>
          <CompetencyDonutChart competencies={competencies} height={300} showCenterScore={true} />
        </div>

        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Target Score Differential</h3>
          <p className="text-xs text-slate-500 mb-4">Current verified score vs Industry benchmark</p>
          <CompetencyBarChart competencies={competencies} height={300} />
        </div>
      </div>

      {/* Strengths & Improvement Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demonstrated Core Strengths</span>
          </h3>

          <div className="space-y-3">
            {strengths.map((s) => (
              <div key={s.competency} className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{s.competency}</span>
                  <Badge variant="success" size="sm">{s.score}% (Target: {s.targetScore}%)</Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Exceeds benchmark thresholds. Recommended for advanced architecture tasks.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Areas for Learning Focus</span>
          </h3>

          <div className="space-y-3">
            {improvementAreas.map((s) => (
              <div key={s.competency} className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{s.competency}</span>
                  <Badge variant="warning" size="sm">{s.score}% (Target: {s.targetScore}%)</Badge>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Gap of {s.targetScore - s.score}% identified. Faculty intervention learning materials available.
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200/40 flex justify-end">
                  <button
                    onClick={() => navigate(`/student/learning-materials?skill=${encodeURIComponent(s.competency)}`)}
                    className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>View Faculty Materials</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Competency Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Detailed Competency Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Competency Domain</th>
                <th className="pb-3">Score</th>
                <th className="pb-3">Target</th>
                <th className="pb-3">Proficiency Tier</th>
                <th className="pb-3">Last Evaluated</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competencies.map((c) => (
                <tr key={c.competency} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-800">{c.competency}</td>
                  <td className="py-3 font-bold text-blue-900">{c.score}%</td>
                  <td className="py-3 text-slate-500">{c.targetScore}%</td>
                  <td className="py-3">
                    <Badge variant={c.score >= 80 ? 'success' : c.score >= 60 ? 'info' : 'warning'} size="sm">
                      {c.level}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-500">{c.lastAssessed}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate('/student/skill-gaps')}
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      View Gap
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
