import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Target,
  BookOpen,
  Award,
  Users,
  Sparkles,
  BarChart2,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2545] via-[#0D2E55] to-[#07192F] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tamil Nadu Higher Education Skill Ecosystem Project</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Naan Mudhalvan Competency Profile & <span className="text-blue-400">Career Readiness</span> Platform
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Connecting students and faculty through objective competency assessments, transparent skill-gap identification, tailored faculty learning roadmaps, and career matching.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Demo Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Student Registration</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-left">
            <div>
              <p className="text-2xl font-bold text-white">6+</p>
              <p className="text-xs text-blue-200">Core Competencies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-blue-200">Data Privacy Control</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Adaptive</p>
              <p className="text-xs text-blue-200">Diagnostic Scoring</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">QR Code</p>
              <p className="text-xs text-blue-200">Shareable Skill Passport</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
            Core Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Structured for Meaningful Learning & Employability
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            Designed specifically to solve the disconnect between classroom curriculum and industry-ready skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Competency Assessments</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Diagnostic, adaptive multiple-choice tests assessing programming, relational databases, data structures, and communication without bias.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Skill-Gap Identification</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Pinpoints exact technical deficiencies (e.g. SQL joins, system design) with clear severity levels and constructive recommended steps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Faculty Learning Interventions</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Faculty members review cohort gaps and directly assign curated PDF guides, practice exercises, and videos to students needing support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Personalized 4-Week Roadmaps</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Week-wise milestone plans broken into manageable modules with trackable task completions to prepare students for target roles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Career Fit & Readiness Matching</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Separates vector-based Career Fit % from transparent rule-based Career Readiness %, providing honest feedback on placement suitability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Shareable Skill Passport</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Student-controlled public profile with fine-grained privacy toggles and QR code generation for recruiter presentations.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              How the Student-Faculty Ecosystem Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-800">Register & Take Assessment</h4>
              <p className="text-xs text-slate-600 mt-1">
                Student builds their academic record and completes an adaptive multi-competency assessment.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-800">Identify Technical Gaps</h4>
              <p className="text-xs text-slate-600 mt-1">
                The platform computes competency vectors and flags gaps (e.g. low SQL score) relative to industry roles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-800">Faculty Remedial Support</h4>
              <p className="text-xs text-slate-600 mt-1">
                Faculty analyzes cohort heatmaps and assigns targeted learning notes, tasks, or video lectures.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                4
              </span>
              <h4 className="text-sm font-bold text-slate-800">Track Progress & Re-assess</h4>
              <p className="text-xs text-slate-600 mt-1">
                Student completes learning activities, retakes the evaluation, and shares their verified Skill Passport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portal Entry Points */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-[#0B2545] text-white p-8 rounded-2xl shadow-md border border-blue-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">For Learners</span>
            <h3 className="text-xl font-bold mt-1 text-white">Student Portal</h3>
            <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">
              Access your personalized competency distribution, view identified skill gaps, complete faculty-assigned learning modules, and prepare for placement interviews.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold bg-white text-blue-900 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Login as Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-[#07192F] text-white p-8 rounded-2xl shadow-md border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">For Educators</span>
            <h3 className="text-xl font-bold mt-1 text-white">Faculty & Admin Portal</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Monitor cohort skill heatmaps, assign targeted remedial resources to students needing support, manage assessment question banks, and export CSV reports.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Login as Faculty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
