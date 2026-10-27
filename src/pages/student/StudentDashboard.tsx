import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Target,
  FileCheck2,
  Compass,
  GraduationCap,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { studentService } from '../../services/studentService';
import { learningMaterialService } from '../../services/learningMaterialService';
import { assessmentService } from '../../services/assessmentService';
import { MotivationalQuoteCard } from '../../components/common/MotivationalQuoteCard';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { CompetencyDonutChart } from '../../components/charts/CompetencyDonutChart';
import { CompetencyBarChart } from '../../components/charts/CompetencyBarChart';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, language, getCompetencyName, getSeverityName } = useLanguage();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(studentService.getProfile());
  const [competencies, setCompetencies] = useState(studentService.getCompetencies());
  const [careerRoles, setCareerRoles] = useState(studentService.getCareerRoles());
  const [skillGaps, setSkillGaps] = useState(studentService.getSkillGaps());
  const [materials, setMaterials] = useState<any[]>([]);
  const [attempts, setAttempts] = useState(assessmentService.getAttempts());

  useEffect(() => {
    const update = () => {
      setProfile(studentService.getProfile());
      setCompetencies(studentService.getCompetencies());
      setCareerRoles(studentService.getCareerRoles());
      setSkillGaps(studentService.getSkillGaps());
      setMaterials(learningMaterialService.getMaterialsForStudent(user?.id || 'user-stu-1'));
      setAttempts(assessmentService.getAttempts());
    };

    update();
    const unsubStudent = studentService.subscribe(update);
    const unsubMat = learningMaterialService.subscribe(update);

    return () => {
      unsubStudent();
      unsubMat();
    };
  }, [user]);

  // Overall competency score average
  const overallScore = Math.round(
    competencies.reduce((acc, curr) => acc + curr.score, 0) / Math.max(1, competencies.length)
  );

  const topCareer = careerRoles[0];
  const pendingMaterialsCount = materials.filter((m) => !m.isCompletedByCurrentStudent).length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Welcome Section & Quick Action Bar */}
      <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50/50 p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>{t('student.welcomeBannerTag')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('student.welcomeGreeting', 'Welcome, {name}!', { name: user?.name ? user.name.split(' ')[0] : 'Preethi' })} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {t('student.welcomeSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/student/assessment')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-700 hover:bg-blue-800 text-white transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{t('student.takeAssessmentBtn')}</span>
          </button>
          <button
            onClick={() => navigate('/student/skill-gaps')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-all shadow-xs flex items-center gap-2"
          >
            <Target className="w-4 h-4 text-blue-600" />
            <span>{t('student.viewGapsBtn')}</span>
          </button>
        </div>
      </div>

      {/* 2. 4-Step Visual Journey */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-blue-700" />
            <span>{language === 'ta' ? 'எளிய 4 படி தொழில் தயார்நிலைப் பயணம்' : '4-Step Career Readiness Journey'}</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'ta' ? 'படிபடியான வழிகாட்டுதல்' : 'Step-by-step guidance'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            onClick={() => navigate('/student/assessment')}
            className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-blue-700 text-white text-xs font-bold flex items-center justify-center">1</span>
              <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              {language === 'ta' ? '1. திறன் தேர்வு (Assess)' : '1. Take Assessment'}
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {language === 'ta' ? '20 கேள்விகள் மூலம் உங்கள் உண்மையான திறனை சோதிக்கவும்.' : 'Take 20 diagnostic questions to test your real skill level.'}
            </p>
          </div>

          <div
            onClick={() => navigate('/student/competency-profile')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              {language === 'ta' ? '2. திறன் வரைபடம் (Profile)' : '2. Competency Profile'}
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {language === 'ta' ? 'தொழில்துறை தரத்துடன் உங்கள் மதிப்பெண்களை ஒப்பிடுக.' : 'Radar charts compare your score against industry standard.'}
            </p>
          </div>

          <div
            onClick={() => navigate('/student/skill-gaps')}
            className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              {language === 'ta' ? '3. இடைவெளிகள் (Bridge Gaps)' : '3. Bridge Skill Gaps'}
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {language === 'ta' ? '4-வார கற்றல் வழிகாட்டியைப் பின்பற்றி பயிற்சிகளை முடிக்கவும்.' : 'Follow the 4-week learning roadmap and finish assigned labs.'}
            </p>
          </div>

          <div
            onClick={() => navigate('/student/skill-passport')}
            className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              {language === 'ta' ? '4. பாஸ்போர்ட் (Get Placed)' : '4. Skill Passport'}
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {language === 'ta' ? 'வேலைவாய்ப்புத் தேர்வாளர்களுக்கு QR குறியீட்டைப் பகிரவும்.' : 'Share your QR Skill Passport with recruiters and companies.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Motivational Quote Card */}
      <MotivationalQuoteCard />

      {/* 4. Dashboard KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title={t('student.overallIndex')}
          value={`${overallScore}%`}
          subtitle={language === 'ta' ? 'இலக்கு: 75%' : 'Target: 75%'}
          icon={Award}
          iconColor="text-blue-700 bg-blue-50 border-blue-200"
          trend={{ value: '+9%', isPositive: true }}
          onClick={() => navigate('/student/competency-profile')}
        />

        <StatCard
          title={t('student.readiness')}
          value={`${topCareer?.readinessPercentage || 72}%`}
          subtitle={language === 'ta' ? 'வேலைவாய்ப்புத் தகுதி' : 'Career Readiness'}
          icon={TrendingUp}
          iconColor="text-emerald-700 bg-emerald-50 border-emerald-200"
          onClick={() => navigate('/student/career-matching')}
        />

        <StatCard
          title={t('profile.tabPersonal')}
          value={`${profile.profileCompletion}%`}
          subtitle={language === 'ta' ? 'சுயவிவர நிறைவு' : 'Profile Completed'}
          icon={UserCheck}
          iconColor="text-indigo-700 bg-indigo-50 border-indigo-200"
          onClick={() => navigate('/student/profile')}
        />

        <StatCard
          title={t('student.recentAttempts')}
          value={attempts.length}
          subtitle={language === 'ta' ? 'எழுதிய தேர்வுகள்' : 'Evaluations Completed'}
          icon={CheckCircle2}
          iconColor="text-teal-700 bg-teal-50 border-teal-200"
          onClick={() => navigate('/student/progress-history')}
        />

        <StatCard
          title={t('student.criticalGaps')}
          value={skillGaps.length}
          subtitle={language === 'ta' ? 'கவனம் தேவைப்படும் திறன்கள்' : 'Identified Areas'}
          icon={AlertTriangle}
          iconColor="text-amber-700 bg-amber-50 border-amber-200"
          onClick={() => navigate('/student/skill-gaps')}
        />

        <StatCard
          title={t('student.pendingTasks')}
          value={pendingMaterialsCount}
          subtitle={language === 'ta' ? 'நிலுவையிலுள்ள பணிகள்' : 'Assigned Modules'}
          icon={BookOpen}
          iconColor="text-rose-700 bg-rose-50 border-rose-200"
          onClick={() => navigate('/student/learning-materials')}
        />
      </div>

      {/* 5. Competency Charts & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Competency Distribution Donut Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {t('student.distributionTitle')}
              </h2>
              <p className="text-xs text-slate-500">{t('student.distributionSubtitle')}</p>
            </div>
            <button
              onClick={() => navigate('/student/competency-profile')}
              className="text-xs text-blue-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>{t('common.viewDetails')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <CompetencyDonutChart competencies={competencies} height={280} showCenterScore={true} />
        </div>

        {/* Competency Bar Comparison */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {language === 'ta' ? 'இலக்கு ஒப்பீட்டு வரைபடம்' : 'Target Benchmark Comparison'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ta' ? 'தற்போதைய மதிப்பெண் vs 75% தகுதி வரம்பு' : 'Current score vs Industry required pass standard (75%)'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {language === 'ta' ? 'தொழில்நுட்பக் களம்' : 'Tech Domain'}
            </span>
          </div>
          <CompetencyBarChart competencies={competencies} height={280} />
        </div>
      </div>

      {/* 6. Identified Skill Gaps & Top Career Match */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical Skill Gaps */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{t('student.gapAttention')}</span>
              </h2>
              <p className="text-xs text-slate-500">{t('student.gapAttentionSubtitle')}</p>
            </div>
            <button
              onClick={() => navigate('/student/skill-gaps')}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              {t('student.viewRoadmap')} →
            </button>
          </div>

          <div className="space-y-3">
            {skillGaps.map((gap) => (
              <div
                key={gap.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{gap.skillName}</span>
                    <Badge
                      variant={
                        gap.severity === 'Critical'
                          ? 'danger'
                          : gap.severity === 'Moderate'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {getSeverityName(gap.severity)} (-{gap.gapDifference}%)
                    </Badge>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {language === 'ta' ? 'தற்போது:' : 'Current:'} <span className="text-rose-600 font-extrabold">{gap.currentScore}%</span> / {language === 'ta' ? 'இலக்கு:' : 'Target:'} {gap.targetScore}%
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {gap.recommendedAction}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-200/70 text-xs">
                  <span className="text-slate-500 text-[11px] font-medium">
                    🏛️ {language === 'ta' ? 'பேராசிரியர் ஒதுக்கிய கற்றல் பொருட்கள் தயாராக உள்ளன' : 'Faculty remedial lab & video modules ready'}
                  </span>
                  <button
                    onClick={() => navigate('/student/learning-materials')}
                    className="text-blue-700 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>{t('student.openMaterial')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Career Match */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-700" />
                  <span>{t('student.topCareerMatch')}</span>
                </h2>
                <p className="text-xs text-slate-500">{t('student.topCareerSubtitle')}</p>
              </div>
              <button
                onClick={() => navigate('/student/career-matching')}
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                {language === 'ta' ? 'அனைத்து பணிகள்' : 'All Roles'} →
              </button>
            </div>

            {topCareer && (
              <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 p-5 rounded-2xl border border-blue-200/80">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{topCareer.title}</h3>
                  <Badge variant="primary" size="sm">{topCareer.demandLevel} Demand</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{topCareer.description}</p>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {t('student.careerFit')}
                    </span>
                    <span className="text-2xl font-extrabold text-blue-700 mt-0.5 block">
                      {topCareer.fitPercentage}%
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {t('student.readiness')}
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700 mt-0.5 block">
                      {topCareer.readinessPercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-slate-800">
                    {language === 'ta' ? 'முக்கிய இடைவெளி: ' : 'Primary Gap: '}
                  </span>
                  <span className="text-rose-700 font-semibold">SQL Indexing, Database ACID</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              {language === 'ta' ? `சராசரி ஊதியம்: ${topCareer?.averageSalaryRange}` : `Average Salary: ${topCareer?.averageSalaryRange}`}
            </span>
            <button
              onClick={() => navigate('/student/career-matching')}
              className="text-blue-700 font-bold hover:underline"
            >
              {language === 'ta' ? 'தேவைகளை ஆய்வு செய்' : 'Analyze Requirements'}
            </button>
          </div>
        </div>
      </div>

      {/* 7. Recently Assigned Faculty Learning Materials */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>{t('student.facultyAssignedMaterials')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t('student.facultyMaterialsSub')}
            </p>
          </div>
          <button
            onClick={() => navigate('/student/learning-materials')}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            {language === 'ta' ? `அனைத்து வளங்கள் (${materials.length}) →` : `View All Materials (${materials.length}) →`}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              className={`p-4 rounded-2xl border transition-all ${
                mat.isCompletedByCurrentStudent
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <Badge variant={mat.isCompletedByCurrentStudent ? 'success' : 'warning'} size="sm">
                  {mat.isCompletedByCurrentStudent ? t('common.completed') : t('common.pending')}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-400">{mat.resourceType}</span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{mat.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{mat.description}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] truncate max-w-[140px] font-medium">
                  {mat.uploaderName}
                </span>
                <button
                  onClick={() => navigate('/student/learning-materials')}
                  className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>{mat.isCompletedByCurrentStudent ? t('common.review') : t('materials.openResource')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
