import React, { useState } from 'react';
import {
  History,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  FileCheck2,
  BookOpen,
} from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import { studentService } from '../../services/studentService';
import { TrendLineChart } from '../../components/charts/TrendLineChart';
import { Badge } from '../../components/common/Badge';

export const ProgressHistoryPage: React.FC = () => {
  const attempts = assessmentService.getAttempts();
  const roadmap = studentService.getRoadmap();

  // Progress trend data for LineChart
  const trendData = [
    { date: 'Oct 2025', overall: 65, sql: 46, programming: 72, web: 74 },
    { date: 'Dec 2025', overall: 69, sql: 48, programming: 78, web: 80 },
    { date: 'Feb 2026', overall: 71, sql: 50, programming: 82, web: 83 },
    { date: 'Mar 2026', overall: 74, sql: 52, programming: 84, web: 86 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Progress History & Trajectory</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Longitudinal audit of benchmark scores, competency evolution, and completed milestones
        </p>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Score Evolution Across Semesters</h2>
            <p className="text-xs text-slate-500">Tracking Overall Index, SQL & Programming progression</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            +9% Overall Growth
          </span>
        </div>
        <TrendLineChart data={trendData} height={280} />
      </div>

      {/* Assessment Attempt History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-700" />
          <span>Completed Diagnostic Assessments</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Assessment Title</th>
                <th className="pb-3">Date Completed</th>
                <th className="pb-3">Score Achieved</th>
                <th className="pb-3">Questions</th>
                <th className="pb-3">Peak Difficulty</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-800">{att.title}</td>
                  <td className="py-3 text-slate-500">{new Date(att.completedAt).toLocaleDateString()}</td>
                  <td className="py-3 font-bold text-blue-900 text-sm">{att.overallScore}%</td>
                  <td className="py-3 text-slate-600">{att.correctAnswers} / {att.totalQuestions}</td>
                  <td className="py-3">
                    <Badge variant={att.difficultyReached === 'Hard' ? 'danger' : 'warning'} size="sm">
                      {att.difficultyReached}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">Verified</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Meaningful Learning Activity Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-700" />
          <span>Activity Timeline & Interventions</span>
        </h2>

        <div className="space-y-4 pl-4 border-l-2 border-slate-200 ml-2">
          <div className="relative">
            <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
            <p className="text-xs font-bold text-slate-800">
              Completed Module: "Modern RESTful API Security Architecture"
            </p>
            <p className="text-[11px] text-slate-500">March 28, 2026 • Marked completed by student</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white" />
            <p className="text-xs font-bold text-slate-800">
              Faculty Assigned: "PostgreSQL Indexing & Performance Tuning"
            </p>
            <p className="text-[11px] text-slate-500">March 27, 2026 • Assigned by Dr. S. Sundaram for SQL remedial intervention</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white" />
            <p className="text-xs font-bold text-slate-800">
              Evaluated Benchmark: Competency Benchmark Assessment
            </p>
            <p className="text-[11px] text-slate-500">March 25, 2026 • Overall Score: 74%</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-white" />
            <p className="text-xs font-bold text-slate-800">
              Earned Certification: Naan Mudhalvan Certified Full Stack Developer
            </p>
            <p className="text-[11px] text-slate-500">November 20, 2025 • Grade A+ (TNSDC)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
