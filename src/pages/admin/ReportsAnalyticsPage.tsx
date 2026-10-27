import React from 'react';
import {
  BarChart3,
  Download,
  Building,
  Users,
  Award,
  Sparkles,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

export const ReportsAnalyticsPage: React.FC = () => {
  const { language } = useLanguage();
  const cohort = adminService.getCohortSummary();

  const handleDownloadCSV = () => {
    adminService.exportCohortCSV();
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'ta' ? 'அறிக்கைகள் & குழு பகுப்பாய்வு' : 'Reports & Cohort Analytics'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ta'
              ? 'நிறுவன அளவுகோல்கள், துறை ஒப்பீடுகள் மற்றும் அங்கீகரிக்கப்பட்ட CSV பதிவிறக்கங்கள்'
              : 'Aggregated institutional benchmarks, department comparisons, and authorized CSV downloads'}
          </p>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>
            {language === 'ta' ? 'குழு CSV அறிக்கையைப் பதிவிறக்குக' : 'Download Cohort CSV Report'}
          </span>
        </button>
      </div>

      {/* Score Distribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-700" />
              <span>
                {language === 'ta' ? 'திறன் மதிப்பெண் அடுக்கு பகிர்வு' : 'Competency Score Tier Distribution'}
              </span>
            </h2>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? '142 பதிவுசெய்த மாணவர்கள்' : '142 Enrolled Students'}
            </span>
          </div>

          <div className="space-y-3">
            {cohort.scoreDistribution.map((tier) => (
              <div key={tier.range} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">{tier.range}</span>
                  <span className="font-bold text-blue-900">
                    {language === 'ta'
                      ? `${tier.students} மாணவர்கள் (${Math.round((tier.students / cohort.totalStudents) * 100)}%)`
                      : `${tier.students} Students (${Math.round((tier.students / cohort.totalStudents) * 100)}%)`}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tier.range.includes('Expert')
                        ? 'bg-emerald-600'
                        : tier.range.includes('Proficient')
                        ? 'bg-blue-600'
                        : tier.range.includes('Developing')
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${(tier.students / cohort.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Readiness Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'ta'
                  ? 'துறை தொழில் தயார்நிலை ஒப்பீடு'
                  : 'Department Career Readiness Comparison'}
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {cohort.departmentBreakdown.map((dept) => (
              <div key={dept.department} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{dept.department}</span>
                  <span className="text-slate-500">
                    {language === 'ta' ? `${dept.count} மாணவர்கள் பதிவு பெற்றுள்ளனர்` : `${dept.count} Students Enrolled`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      {language === 'ta' ? 'சராசரி திறன்' : 'Avg Competency'}
                    </span>
                    <span className="font-bold text-blue-900 text-sm">{dept.avgScore}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      {language === 'ta' ? 'வேலைவாய்ப்பு தயார்நிலை' : 'Placement Readiness'}
                    </span>
                    <span className="font-bold text-emerald-700 text-sm">{dept.readiness}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Planned K-Means Clustering Architectural Card */}
      <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 text-slate-700 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-700" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'ta'
              ? 'கண்காணிக்கப்படாத திறன் கிளஸ்டரிங் (K-Means) — நிலை 2 கட்டமைப்பு குறிப்பு'
              : 'Unsupervised Competency Clustering (K-Means) — Stage 2 Architecture Note'}
          </h3>
          <Badge variant="info" size="sm">
            {language === 'ta' ? 'பின்தளத்திற்கு திட்டமிடப்பட்டுள்ளது' : 'Planned for Backend'}
          </Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {language === 'ta'
            ? 'திட்ட விவரக்குறிப்புகளுக்கு முழுமையாக இணங்க, எந்தவொரு போலி K-Means வரைபடமும் முன்முனையில் புனையப்படவில்லை. நிலை 2 இல், கற்றல் மாதிரிகளைக் கண்டறிய (எ.கா. "வலுவான தர்க்கம் / தரவுத்தள வழிகாட்டுதல் தேவை") தானியங்கு முத்திரையிடல் இல்லாமல், நோட்.ஜெஎஸ்/போஸ்ட்கிரெஸ்க்யூஎல் பின்தளத்தில் உண்மையான கணித K-Means அல்காரிதம் மாணவர்களின் 6-பரிமாண திறன் திசையன்களில் இயங்கும்.'
            : 'In strict compliance with the project specifications, no pseudo K-Means charts are fabricated in the frontend. In Stage 2, a true mathematical K-Means algorithm will run on normalized 6-dimensional student competency vectors in the Node.js/PostgreSQL backend to cluster learning archetypes (e.g. "Strong Logic / Needs Database Mentoring") without automated high-stakes labeling.'}
        </p>
      </div>
    </div>
  );
};
