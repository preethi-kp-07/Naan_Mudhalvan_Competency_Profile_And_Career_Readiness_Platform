import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Plus,
  Users,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const SkillGapInterventionPage: React.FC = () => {
  const navigate = useNavigate();
  const cohort = adminService.getCohortSummary();
  const allStudents = adminService.getStudents();

  const [selectedCompetency, setSelectedCompetency] = useState('Relational Databases & SQL');
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Intervention Form
  const [interventionForm, setInterventionForm] = useState({
    title: 'Batch SQL Mastery & Query Optimization Remedial Drive',
    materialTitle: 'Comprehensive SQL Joins & Window Functions Workshop Guide',
    materialType: 'PDF Notes' as 'PDF Notes' | 'Video Lecture' | 'Practice Task' | 'External Guide',
    deadline: '2026-04-25',
    studentIds: ['user-stu-1', 'user-stu-5'], // Preethi S. and Deepa T.
  });

  const studentsWithGap = allStudents.filter((s) => {
    if (selectedCompetency === 'Relational Databases & SQL') {
      return s.mainSkillGap.includes('SQL');
    }
    if (selectedCompetency === 'Cloud & Infrastructure') {
      return s.mainSkillGap.includes('Cloud');
    }
    if (selectedCompetency === 'Problem Solving & DSA') {
      return s.mainSkillGap.includes('Structures') || s.mainSkillGap.includes('Logic');
    }
    return true;
  });

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.createIntervention({
      title: interventionForm.title,
      targetCompetency: selectedCompetency,
      studentIds: interventionForm.studentIds,
      materialTitle: interventionForm.materialTitle,
      materialType: interventionForm.materialType,
      deadline: interventionForm.deadline,
    });

    setIsInterventionModalOpen(false);
    setSuccessMessage(
      `Intervention package created and assigned to ${interventionForm.studentIds.length} students!`
    );
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Skill Gap & Remedial Intervention Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify cohort deficiencies and deploy targeted faculty learning support
          </p>
        </div>

        <button
          onClick={() => setIsInterventionModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Targeted Intervention</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Cohort Gaps Selector Pills */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Select Target Skill Domain for Batch Review</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cohort.commonSkillGaps.slice(0, 3).map((gap) => {
            const isSelected = selectedCompetency === gap.skill;

            return (
              <div
                key={gap.skill}
                onClick={() => setSelectedCompetency(gap.skill)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{gap.skill}</span>
                  <Badge variant={gap.severity === 'High' ? 'danger' : 'warning'} size="sm">
                    {gap.severity}
                  </Badge>
                </div>
                <div className="mt-2 flex items-baseline justify-between text-xs">
                  <span className="text-slate-500">{gap.affectedCount} Students Flagged</span>
                  <span className="font-bold text-slate-800">Avg {gap.avgScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Students Requiring Learning Support in Selected Domain */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Students Recommended for Support in "{selectedCompetency}"
            </h3>
            <p className="text-xs text-slate-500">
              Scoring below standard proficiency thresholds
            </p>
          </div>
          <Badge variant="warning" size="sm">
            {studentsWithGap.length} Candidates
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Register No.</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Domain Score</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentsWithGap.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="py-3 font-mono text-slate-500">{s.registerNumber}</td>
                  <td className="py-3 text-slate-600">{s.department}</td>
                  <td className="py-3 font-bold text-rose-600">
                    {s.id === 'user-stu-1' ? '52%' : '54%'} (Target: 80%)
                  </td>
                  <td className="py-3">
                    <Badge variant="warning" size="sm">Learning Support Recommended</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setInterventionForm({
                          ...interventionForm,
                          studentIds: [s.id],
                        });
                        setIsInterventionModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                    >
                      Assign Resource
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intervention Modal */}
      <Modal isOpen={isInterventionModalOpen} onClose={() => setIsInterventionModalOpen(false)} title="Create Faculty Intervention Plan">
        <form onSubmit={handleCreateIntervention} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Intervention Program Name *</label>
            <input
              type="text"
              required
              value={interventionForm.title}
              onChange={(e) => setInterventionForm({ ...interventionForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Competency</label>
            <input
              type="text"
              readOnly
              value={selectedCompetency}
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Remedial Material Title *</label>
            <input
              type="text"
              required
              value={interventionForm.materialTitle}
              onChange={(e) => setInterventionForm({ ...interventionForm, materialTitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Resource Type</label>
              <select
                value={interventionForm.materialType}
                onChange={(e) => setInterventionForm({ ...interventionForm, materialType: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="PDF Notes">PDF Notes</option>
                <option value="Video Lecture">Video Lecture</option>
                <option value="Practice Task">Practice Task</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Completion Deadline</label>
              <input
                type="date"
                value={interventionForm.deadline}
                onChange={(e) => setInterventionForm({ ...interventionForm, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsInterventionModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Deploy Intervention
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
