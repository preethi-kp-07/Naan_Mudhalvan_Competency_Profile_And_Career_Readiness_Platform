import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Briefcase,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_CAREER_ROLES } from '../../data/mockData';
import { CareerRole } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CareerManagementPage: React.FC = () => {
  const [careerRoles, setCareerRoles] = useState<CareerRole[]>(INITIAL_CAREER_ROLES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newRole, setNewRole] = useState({
    title: '',
    description: '',
    demandLevel: 'High' as 'Very High' | 'High' | 'Moderate',
    averageSalaryRange: '₹ 6 LPA - ₹ 12 LPA',
    keySkills: '',
    sqlTarget: 80,
    progTarget: 85,
    webTarget: 85,
    cloudTarget: 70,
  });

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.title) return;

    const created: CareerRole = {
      id: `career-${Date.now()}`,
      title: newRole.title,
      description: newRole.description,
      demandLevel: newRole.demandLevel,
      averageSalaryRange: newRole.averageSalaryRange,
      keySkills: newRole.keySkills.split(',').map((s) => s.trim()).filter(Boolean),
      requiredCompetencies: {
        'Relational Databases & SQL': Number(newRole.sqlTarget),
        'Programming & Logic': Number(newRole.progTarget),
        'Web & API Engineering': Number(newRole.webTarget),
        'Cloud & Infrastructure': Number(newRole.cloudTarget),
      },
    };

    setCareerRoles([...careerRoles, created]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Career & Competency Criteria Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure industry role vectors, competency target thresholds, and transparent readiness weights
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Career Benchmark Role</span>
        </button>
      </div>

      {/* Career Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                <span className="text-xs text-slate-500">{role.averageSalaryRange}</span>
              </div>
              <Badge variant="primary" size="sm">{role.demandLevel} Demand</Badge>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>

            {/* Target Competency Weights */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Configured Benchmark Targets (% Required)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(role.requiredCompetencies).map(([comp, target]) => (
                  <div key={comp} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block truncate">{comp}</span>
                    <span className="font-bold text-blue-900 text-xs">{target}% Target</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium mb-1">Key Technical Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {role.keySkills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Career Role Benchmark">
        <form onSubmit={handleCreateRole} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Role Title *</label>
            <input
              type="text"
              required
              value={newRole.title}
              onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
              placeholder="e.g. DevOps Engineer"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Role Description</label>
            <textarea
              rows={2}
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder="Responsibilities and industry expectations..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Demand Level</label>
              <select
                value={newRole.demandLevel}
                onChange={(e) => setNewRole({ ...newRole, demandLevel: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Salary Range</label>
              <input
                type="text"
                value={newRole.averageSalaryRange}
                onChange={(e) => setNewRole({ ...newRole, averageSalaryRange: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Key Skills (comma-separated)</label>
            <input
              type="text"
              value={newRole.keySkills}
              onChange={(e) => setNewRole({ ...newRole, keySkills: e.target.value })}
              placeholder="Docker, Kubernetes, AWS, CI/CD"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Career Role
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
