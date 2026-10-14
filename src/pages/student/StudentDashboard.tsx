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
  Sparkles,
  ExternalLink,
  Target,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
      {/* 1. Welcome Section & Date Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Preethi'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Every skill you develop brings you closer to your career goals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/student/assessment')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-xs flex items-center gap-1.5"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Take Assessment</span>
          </button>
          <button
            onClick={() => navigate('/student/skill-gaps')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>View Skill Gaps</span>
          </button>
        </div>
      </div>

      {/* 2. Prominent Motivational Quote Card */}
      <MotivationalQuoteCard />

      {/* 3. Dashboard KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Overall Competency"
          value={`${overallScore}%`}
          subtitle="Cohort Avg: 68%"
          icon={Award}
          iconColor="text-blue-700 bg-blue-50 border-blue-200"
          trend={{ value: '+9%', isPositive: true }}
          onClick={() => navigate('/student/competency-profile')}
        />

        <StatCard
          title="Career Readiness"
          value={`${topCareer?.readinessPercentage || 72}%`}
          subtitle="Full Stack Role"
          icon={TrendingUp}
          iconColor="text-emerald-700 bg-emerald-50 border-emerald-200"
          onClick={() => navigate('/student/career-matching')}
        />

        <StatCard
          title="Profile Completion"
          value={`${profile.profileCompletion}%`}
          subtitle="Academic records"
          icon={UserCheck}
          iconColor="text-indigo-700 bg-indigo-50 border-indigo-200"
          onClick={() => navigate('/student/profile')}
        />

        <StatCard
          title="Assessments Taken"
          value={attempts.length}
          subtitle="Adaptive Benchmark"
          icon={CheckCircle2}
          iconColor="text-teal-700 bg-teal-50 border-teal-200"
          onClick={() => navigate('/student/progress-history')}
        />

        <StatCard
          title="Identified Gaps"
          value={skillGaps.length}
          subtitle="Actionable areas"
          icon={AlertTriangle}
          iconColor="text-amber-700 bg-amber-50 border-amber-200"
          onClick={() => navigate('/student/skill-gaps')}
        />

        <StatCard
          title="Pending Materials"
          value={pendingMaterialsCount}
          subtitle="Assigned by faculty"
          icon={BookOpen}
          iconColor="text-rose-700 bg-rose-50 border-rose-200"
          onClick={() => navigate('/student/learning-materials')}
        />
      </div>

      {/* 4. Competency Charts & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Competency Distribution Donut Chart */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Competency Distribution</h2>
              <p className="text-xs text-slate-500">Distribution across core career readiness domains</p>
            </div>
            <button
              onClick={() => navigate('/student/competency-profile')}
              className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Detailed View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <CompetencyDonutChart competencies={competencies} height={280} showCenterScore={true} />
        </div>

        {/* Competency Bar Comparison */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Target Benchmark Comparison</h2>
              <p className="text-xs text-slate-500">Current proficiency vs Required score</p>
            </div>
            <span className="text-xs text-slate-400 font-medium">Domain: Software Engineering</span>
          </div>
          <CompetencyBarChart competencies={competencies} height={280} />
        </div>
      </div>

      {/* 5. Identified Skill Gaps & Recommended Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical Skill Gaps */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Identified Priority Skill Gaps</span>
              </h2>
              <p className="text-xs text-slate-500">Areas flagged for learning intervention</p>
            </div>
            <button
              onClick={() => navigate('/student/skill-gaps')}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              View Full Roadmap →
            </button>
          </div>

          <div className="space-y-3">
            {skillGaps.map((gap) => (
              <div
                key={gap.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{gap.skillName}</span>
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
                      {gap.severity} Gap (-{gap.gapDifference}%)
                    </Badge>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    Current: <span className="text-rose-600">{gap.currentScore}%</span> / Target: {gap.targetScore}%
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {gap.recommendedAction}
                </p>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Faculty Remedial Resources Available
                  </span>
                  <button
                    onClick={() => navigate('/student/learning-materials')}
                    className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Open Learning Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Match Highlights */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-700" />
                  <span>Top Career Match</span>
                </h2>
                <p className="text-xs text-slate-500">Vector Fit & Rule-based Readiness</p>
              </div>
              <button
                onClick={() => navigate('/student/career-matching')}
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                All Roles →
              </button>
            </div>

            {topCareer && (
              <div className="bg-gradient-to-br from-blue-50/60 to-slate-50 p-4 rounded-xl border border-blue-200/70">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{topCareer.title}</h3>
                  <Badge variant="primary" size="sm">{topCareer.demandLevel} Demand</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{topCareer.description}</p>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Career Fit (Cosine Match)
                    </span>
                    <span className="text-xl font-bold text-blue-700">
                      {topCareer.fitPercentage}%
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Placement Readiness
                    </span>
                    <span className="text-xl font-bold text-emerald-700">
                      {topCareer.readinessPercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Missing Competencies: </span>
                  <span className="text-rose-700">SQL Indexing, Database ACID</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Average Salary: {topCareer?.averageSalaryRange}</span>
            <button
              onClick={() => navigate('/student/career-matching')}
              className="text-blue-700 font-semibold hover:underline"
            >
              Analyze Requirements
            </button>
          </div>
        </div>
      </div>

      {/* 6. Recently Assigned Faculty Learning Materials */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Recently Assigned Faculty Learning Materials</span>
            </h2>
            <p className="text-xs text-slate-500">
              Curated by faculty mentors to target your identified skill gaps
            </p>
          </div>
          <button
            onClick={() => navigate('/student/learning-materials')}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            View All Materials ({materials.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              className={`p-4 rounded-xl border transition-all ${
                mat.isCompletedByCurrentStudent
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <Badge variant={mat.isCompletedByCurrentStudent ? 'success' : 'warning'} size="sm">
                  {mat.isCompletedByCurrentStudent ? 'Completed' : 'Pending Action'}
                </Badge>
                <span className="text-[11px] text-slate-400">{mat.resourceType}</span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{mat.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{mat.description}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] truncate max-w-[140px]">
                  {mat.uploaderName}
                </span>
                <button
                  onClick={() => navigate('/student/learning-materials')}
                  className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>{mat.isCompletedByCurrentStudent ? 'Review' : 'Open Resource'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
