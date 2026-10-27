import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  FileCheck2,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { learningMaterialService } from '../../services/learningMaterialService';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const cohort = adminService.getCohortSummary();
  const [materials, setMaterials] = useState(learningMaterialService.getAllMaterials());

  useEffect(() => {
    const unsub = learningMaterialService.subscribe(() => {
      setMaterials(learningMaterialService.getAllMaterials());
    });
    return unsub;
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('admin.dashboardTitle')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('admin.dashboardSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => adminService.exportCohortCSV()}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('common.exportCSV')}</span>
          </button>

          <button
            onClick={() => navigate('/admin/learning-materials')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('admin.assignMaterial')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title={language === 'ta' ? 'செயலில் உள்ள மாணவர்கள்' : 'Active Students'}
          value={cohort.activeStudents}
          subtitle={language === 'ta' ? `மொத்தம்: ${cohort.totalStudents} மாணவர்கள்` : `Total: ${cohort.totalStudents} enrolled`}
          icon={Users}
          iconColor="text-blue-700 bg-blue-50 border-blue-200"
          onClick={() => navigate('/admin/students')}
        />

        <StatCard
          title={language === 'ta' ? 'சராசரித் திறன்' : 'Avg Competency'}
          value={`${cohort.averageCompetencyScore}%`}
          subtitle={language === 'ta' ? 'இலக்கு: 75.0%' : 'Target: 75.0%'}
          icon={Award}
          iconColor="text-emerald-700 bg-emerald-50 border-emerald-200"
          onClick={() => navigate('/admin/reports')}
        />

        <StatCard
          title={language === 'ta' ? 'சராசரித் தயார்நிலை' : 'Avg Readiness'}
          value={`${cohort.averageCareerReadiness}%`}
          subtitle={language === 'ta' ? 'அனைத்துப் பாத்திரங்களிலும்' : 'Across all roles'}
          icon={TrendingUp}
          iconColor="text-indigo-700 bg-indigo-50 border-indigo-200"
          onClick={() => navigate('/admin/careers')}
        />

        <StatCard
          title={language === 'ta' ? 'மதிப்பீட்டு விகிதம்' : 'Assessment Rate'}
          value={`${cohort.assessmentParticipationRate}%`}
          subtitle={language === 'ta' ? '142-இல் 125 பேர் முடித்தனர்' : '125 of 142 completed'}
          icon={FileCheck2}
          iconColor="text-teal-700 bg-teal-50 border-teal-200"
          onClick={() => navigate('/admin/assessments')}
        />

        <StatCard
          title={language === 'ta' ? 'பயிற்சி தேவைப்படுபவர்கள்' : 'Support Recommended'}
          value={cohort.studentsNeedingSupport}
          subtitle={language === 'ta' ? 'இடைவெளிகள் கண்டறியப்பட்டன' : 'Identified gaps'}
          icon={AlertTriangle}
          iconColor="text-amber-700 bg-amber-50 border-amber-200"
          onClick={() => navigate('/admin/interventions')}
        />

        <StatCard
          title={language === 'ta' ? 'செயலில் உள்ள வளங்கள்' : 'Materials Active'}
          value={materials.length}
          subtitle={language === 'ta' ? 'பேராசிரியர்களால் ஒதுக்கப்பட்டவை' : 'Curated by faculty'}
          icon={BookOpen}
          iconColor="text-rose-700 bg-rose-50 border-rose-200"
          onClick={() => navigate('/admin/learning-materials')}
        />
      </div>

      {/* Common Skill Gaps & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Most Common Skill Gaps in Cohort */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{language === 'ta' ? 'திரளின் முதன்மைத் தொழில்நுட்ப இடைவெளிகள்' : 'Most Prevalent Cohort Technical Gaps'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ta' ? 'தீர்வுப் பயிற்சி தேவைப்படும் முக்கியத் துறைகள்' : 'Highest priority domains needing remedial coursework'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/interventions')}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              {language === 'ta' ? 'நடவடிக்கை எடு →' : 'Take Action →'}
            </button>
          </div>

          <div className="space-y-3">
            {cohort.commonSkillGaps.map((gap) => (
              <div
                key={gap.skill}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{gap.skill}</span>
                    <Badge variant={gap.severity === 'High' ? 'danger' : 'warning'} size="sm">
                      {language === 'ta' ? (gap.severity === 'High' ? 'உயர் முன்னுரிமை' : 'நடுத்தர முன்னுரிமை') : `${gap.severity} Priority`}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {language === 'ta'
                      ? `${gap.affectedCount} மாணவர்கள் (சராசரி ${gap.avgScore}%)`
                      : `${gap.affectedCount} Students Affected (Avg ${gap.avgScore}%)`}
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full ${
                      gap.severity === 'High' ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${(gap.affectedCount / cohort.totalStudents) * 100}%` }}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs pt-1 border-t border-slate-200/50">
                  <span className="text-[11px] text-slate-500">
                    {language === 'ta'
                      ? `ப்ரீத்தி எஸ். (52%) மற்றும் 41 பிற மாணவர்கள் உட்பட்டவர்கள்`
                      : 'Includes Preethi S. (52%) and 41 other students'}
                  </span>
                  <button
                    onClick={() => navigate('/admin/interventions')}
                    className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ta' ? 'பயிற்சித் தொகுதியை ஒதுக்கு' : 'Assign Remedial Module'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Comparison */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-700" />
                  <span>{language === 'ta' ? 'துறை வாரியான செயல்திறன்' : 'Department Performance'}</span>
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ta' ? 'திறன் மற்றும் தயார்நிலை சராசரிகள்' : 'Competency & Readiness averages'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {cohort.departmentBreakdown.map((dept) => (
                <div key={dept.department} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{dept.department}</span>
                    <span className="text-[11px] text-slate-500">
                      {language === 'ta' ? `${dept.count} மாணவர்கள்` : `${dept.count} Students`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">
                        {language === 'ta' ? 'சராசரித் திறன்' : 'Avg Competency'}
                      </span>
                      <span className="font-bold text-blue-900">{dept.avgScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">
                        {language === 'ta' ? 'வேலைவாய்ப்புத் தயார்நிலை' : 'Placement Readiness'}
                      </span>
                      <span className="font-bold text-emerald-700">{dept.readiness}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {language === 'ta' ? 'மதிப்பீட்டுக் காலம்: கல்வி ஆண்டு 2025–2026' : 'Benchmark window: Academic Year 2025–2026'}
            </span>
            <button
              onClick={() => navigate('/admin/reports')}
              className="text-blue-700 font-semibold hover:underline"
            >
              {language === 'ta' ? 'விரிவான திரள் பகுப்பாய்வு →' : 'Detailed Cohort Analytics →'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Assessment Benchmark Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-700" />
              <span>{language === 'ta' ? 'சமீபத்திய கண்டறியும் மதிப்பீட்டு முடிவுகள்' : 'Recent Diagnostic Assessment Benchmark Results'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ta' ? 'மாணவர் திறன் பதிவுகளுடன் இணைக்கப்பட்ட நேரலை சமர்ப்பிப்புகள்' : 'Live submissions mapped to student competency records'}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/students')}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            {language === 'ta' ? `அனைத்து மாணவர்களையும் பார் (${cohort.totalStudents}) →` : `View All Students (${cohort.totalStudents}) →`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">{language === 'ta' ? 'மாணவர் பெயர்' : 'Student Name'}</th>
                <th className="pb-3">{language === 'ta' ? 'பதிவு எண்' : 'Register No.'}</th>
                <th className="pb-3">{language === 'ta' ? 'துறை' : 'Department'}</th>
                <th className="pb-3">{language === 'ta' ? 'பெற்ற மதிப்பெண்' : 'Score Achieved'}</th>
                <th className="pb-3">{language === 'ta' ? 'முதன்மைத் தொழில்நுட்ப இடைவெளி' : 'Key Technical Gap'}</th>
                <th className="pb-3">{language === 'ta' ? 'தேதி' : 'Date'}</th>
                <th className="pb-3 text-right">{language === 'ta' ? 'தலையீடு' : 'Intervention'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cohort.recentAssessments.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-800">{item.studentName}</td>
                  <td className="py-3 font-mono text-slate-500">{item.regNo}</td>
                  <td className="py-3 text-slate-600">{item.dept}</td>
                  <td className="py-3 font-bold text-blue-900">{item.score}%</td>
                  <td className="py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        item.keyGap.includes('None')
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {language === 'ta' && item.keyGap.includes('None') ? 'எதுவுமில்லை' : item.keyGap}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{item.date}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate('/admin/interventions')}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      {language === 'ta' ? 'வளத்தை ஒதுக்கு' : 'Assign Resource'}
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
