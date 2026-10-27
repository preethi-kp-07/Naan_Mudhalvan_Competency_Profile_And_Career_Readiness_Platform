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
import { useLanguage } from '../../i18n/LanguageContext';

export const CareerManagementPage: React.FC = () => {
  const { language } = useLanguage();
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
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'ta'
              ? 'தொழில் & திறன் அளவுகோல் மேலாண்மை'
              : 'Career & Competency Criteria Management'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ta'
              ? 'தொழில்துறை பங்கு வெக்டார்கள், திறன் இலக்கு வரம்புகள் மற்றும் தயார்நிலை எடைகளை உள்ளமைக்கவும்'
              : 'Configure industry role vectors, competency target thresholds, and transparent readiness weights'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'தொழில் அளவுகோல் பங்கைச் சேர்க்கவும்' : 'Add Career Benchmark Role'}</span>
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
              <Badge variant="primary" size="sm">
                {role.demandLevel === 'Very High'
                  ? (language === 'ta' ? 'மிக அதிக தேவை' : 'Very High Demand')
                  : role.demandLevel === 'High'
                  ? (language === 'ta' ? 'அதிக தேவை' : 'High Demand')
                  : (language === 'ta' ? 'மிதமான தேவை' : 'Moderate Demand')}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>

            {/* Target Competency Weights */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {language === 'ta'
                  ? 'உள்ளமைக்கப்பட்ட அளவுகோல் இலக்குகள் (% தேவை)'
                  : 'Configured Benchmark Targets (% Required)'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(role.requiredCompetencies).map(([comp, target]) => (
                  <div key={comp} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block truncate">{comp}</span>
                    <span className="font-bold text-blue-900 text-xs">
                      {target}% {language === 'ta' ? 'இலக்கு' : 'Target'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium mb-1">
                {language === 'ta' ? 'முக்கிய தொழில்நுட்பத் திறன்கள்:' : 'Key Technical Stack:'}
              </span>
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={language === 'ta' ? 'தொழில் பங்கு அளவுகோலைச் சேர்க்கவும்' : 'Add Career Role Benchmark'}
      >
        <form onSubmit={handleCreateRole} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'ta' ? 'பங்கு தலைப்பு *' : 'Role Title *'}
            </label>
            <input
              type="text"
              required
              value={newRole.title}
              onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
              placeholder={language === 'ta' ? 'எ.கா. DevOps பொறியாளர்' : 'e.g. DevOps Engineer'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'ta' ? 'பங்கு விளக்கம்' : 'Role Description'}
            </label>
            <textarea
              rows={2}
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder={language === 'ta' ? 'பொறுப்புகள் மற்றும் தொழில்துறை எதிர்பார்ப்புகள்...' : 'Responsibilities and industry expectations...'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'ta' ? 'தேவை நிலை' : 'Demand Level'}
              </label>
              <select
                value={newRole.demandLevel}
                onChange={(e) => setNewRole({ ...newRole, demandLevel: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Very High">{language === 'ta' ? 'மிக அதிகம்' : 'Very High'}</option>
                <option value="High">{language === 'ta' ? 'அதிகம்' : 'High'}</option>
                <option value="Moderate">{language === 'ta' ? 'மிதமானது' : 'Moderate'}</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'ta' ? 'சம்பள வரம்பு' : 'Salary Range'}
              </label>
              <input
                type="text"
                value={newRole.averageSalaryRange}
                onChange={(e) => setNewRole({ ...newRole, averageSalaryRange: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'ta' ? 'முக்கிய திறன்கள் (காற்புள்ளியால் பிரிக்கப்பட்டது)' : 'Key Skills (comma-separated)'}
            </label>
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
              {language === 'ta' ? 'ரத்துசெய்' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              {language === 'ta' ? 'தொழில் பங்கைச் சேமிக்கவும்' : 'Save Career Role'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
