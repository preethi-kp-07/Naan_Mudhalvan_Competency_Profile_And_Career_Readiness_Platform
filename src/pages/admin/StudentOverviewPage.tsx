import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Eye,
  Plus,
  ShieldCheck,
  Award,
  AlertTriangle,
  BookOpen,
  X,
  FileCheck2,
} from 'lucide-react';
import { adminService, AdminStudentSummary } from '../../services/adminService';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

export const StudentOverviewPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const students = adminService.getStudents();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<AdminStudentSummary | null>(null);

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.registerNumber.includes(search);
    const matchesDept = deptFilter === 'All' || s.department.includes(deptFilter);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{language === 'ta' ? 'மாணவர் திறன் மேலோட்டம்' : 'Student Competency Overview'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட திறன் அளவீடுகள், கண்டறியப்பட்ட இடைவெளிகள் மற்றும் கற்றல் முன்னேற்ற அடைவு'
              : 'Cohort directory with authorized competency vectors, identified gaps, and learning progression'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
          <span>{language === 'ta' ? 'தரவு பாதுகாப்பு: தனிப்பட்ட தொடர்பு விவரங்கள் பாதுகாக்கப்படுகின்றன' : 'Data Minimization Enforced: Private contact details & addresses protected'}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'ta' ? 'மாணவர் பெயர் அல்லது பதிவு எண் கொண்டு தேடவும்...' : 'Search by student name or register number...'}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-700 shrink-0">{language === 'ta' ? 'துறை:' : 'Department:'}</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white w-full sm:w-auto"
          >
            <option value="All">{language === 'ta' ? 'அனைத்துத் துறைகள்' : 'All Departments'}</option>
            <option value="Computer Science">Computer Science (CSE)</option>
            <option value="Information Technology">Information Tech (IT)</option>
            <option value="Electronics">Electronics & Comm (ECE)</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">{t('admin.colStudent')}</th>
                <th className="pb-3">{language === 'ta' ? 'பதிவு எண்' : 'Register Number'}</th>
                <th className="pb-3">{t('admin.colDepartment')}</th>
                <th className="pb-3">{t('admin.colStatus')}</th>
                <th className="pb-3">{t('admin.colScore')}</th>
                <th className="pb-3">{t('admin.colGap')}</th>
                <th className="pb-3">{language === 'ta' ? 'கற்றல் முன்னேற்றம்' : 'Learning Progress'}</th>
                <th className="pb-3 text-right">{t('admin.colAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="py-3 font-mono text-slate-500">{s.registerNumber}</td>
                  <td className="py-3 text-slate-600">
                    {s.department.replace('Engineering', 'Engg')} • {language === 'ta' ? `ஆண்டு ${s.yearOfStudy}` : `Year ${s.yearOfStudy}`}
                  </td>
                  <td className="py-3">
                    <Badge variant={s.assessmentStatus === 'Completed' ? 'success' : 'warning'} size="sm">
                      {language === 'ta' ? (s.assessmentStatus === 'Completed' ? 'முடிந்தது' : 'நிலுவையில்') : s.assessmentStatus}
                    </Badge>
                  </td>
                  <td className="py-3 font-bold text-blue-900">{s.overallScore}%</td>
                  <td className="py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        s.mainSkillGap.includes('None')
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {language === 'ta' && s.mainSkillGap.includes('None') ? 'எதுவுமில்லை' : s.mainSkillGap}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${s.learningProgress}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-700 text-[11px]">{s.learningProgress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-md border border-blue-200 inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{language === 'ta' ? 'பார்வையிடு' : 'Review'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorized Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-500 font-mono">Reg No: {selectedStudent.registerNumber}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t('admin.colDepartment')}</span>
                  <span className="font-semibold text-slate-800">{selectedStudent.department}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{language === 'ta' ? 'கல்வி ஆண்டு' : 'Year of Study'}</span>
                  <span className="font-semibold text-slate-800">
                    {language === 'ta' ? `ஆண்டு ${selectedStudent.yearOfStudy} (6வது செமஸ்டர்)` : `Year ${selectedStudent.yearOfStudy} (6th Semester)`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{language === 'ta' ? 'ஒட்டுமொத்தத் திறன்' : 'Overall Competency'}</span>
                  <span className="text-base font-bold text-blue-900">{selectedStudent.overallScore}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{language === 'ta' ? 'ஒதுக்கப்பட்ட கற்றல் வளங்கள்' : 'Curated Materials Assigned'}</span>
                  <span className="text-base font-bold text-emerald-700">
                    {language === 'ta' ? `${selectedStudent.assignedMaterialsCount} செயலில்` : `${selectedStudent.assignedMaterialsCount} Active`}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ta' ? 'கண்டறியப்பட்ட முதன்மைத் திறன் இடைவெளி' : 'Identified Priority Skill Gap'}</span>
                </h4>
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-amber-900">
                  <span className="font-semibold block">{selectedStudent.mainSkillGap}</span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    {language === 'ta'
                      ? 'மதிப்பீட்டு மதிப்பெண் பரிந்துரைக்கப்பட்ட 80% வரம்பிற்குக் கீழே உள்ளது. உடனடித் தீர்வுப் பயிற்சி பரிந்துரைக்கப்படுகிறது.'
                      : 'Benchmark performance falls below the recommended 80% threshold. Immediate remedial practice recommended.'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>{language === 'ta' ? 'ஒதுக்கப்பட்ட கற்றல் முன்னேற்றம்' : 'Assigned Learning Progress'}</span>
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between text-slate-700 mb-1">
                    <span>{language === 'ta' ? 'பணி நிறைவு' : 'Task Completion'}</span>
                    <span className="font-bold">{selectedStudent.learningProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${selectedStudent.learningProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-700 inline mr-1" />
                <span>
                  <strong>{language === 'ta' ? 'தரவு பாதுகாப்பு அறிவிப்பு:' : 'Data Minimization Notice:'}</strong>{' '}
                  {language === 'ta'
                    ? 'தனியுரிமைக் கொள்கைகளின்படி முக்கியத் தனிப்பட்ட தரவுகள் (முகவரி, தொலைபேசி எண்கள், சான்றுகள்) பேராசிரியர் பார்வையில் இருந்து பாதுகாக்கப்படுகின்றன.'
                    : 'Sensitive personal data (residential address, phone numbers, credentials) is protected from faculty views in accordance with platform privacy policies.'}
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
              >
                {t('common.close')}
              </button>
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  navigate('/admin/learning-materials');
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('admin.assignMaterial')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
