import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Eye,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import { AssessmentQuestion, AssessmentAttempt } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

const IN_PROGRESS_KEY = 'nm_assessment_in_progress_answers';

export const CompetencyAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const allQuestions = assessmentService.getQuestions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(IN_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentAttempt | null>(null);

  // Synchronize in-progress answers to localStorage
  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, isSubmitted]);

  const currentQ: AssessmentQuestion = allQuestions[currentIndex] || allQuestions[0];
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitting || isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    setIsReviewModalOpen(false);
  };

  const handleConfirmSubmit = () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);

    try {
      const result = assessmentService.submitAssessment(selectedAnswers);
      setAssessmentResult(result);
      setIsSubmitted(true);
      setIsReviewModalOpen(false);
      localStorage.removeItem(IN_PROGRESS_KEY);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    localStorage.removeItem(IN_PROGRESS_KEY);
    setCurrentIndex(0);
    setIsSubmitted(false);
    setAssessmentResult(null);
  };

  // If already submitted, display the comprehensive evaluation report
  if (isSubmitted && assessmentResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in">
        {/* Success Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#07192F] rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl border border-blue-900/40">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Award className="w-9 h-9 text-amber-300" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>தேர்வு வெற்றிகரமாக முடிந்தது • Evaluation Complete</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Competency Benchmark Result
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-2 max-w-lg mx-auto leading-relaxed">
            அனைத்து 20 கேள்விகளும் மதிப்பீடு செய்யப்பட்டன. உங்கள் திறன் மதிப்பீடு மற்றும் தொழில் சார்ந்த கற்றல் வழிகாட்டி உடனடியாக புதுப்பிக்கப்பட்டுள்ளது.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-sm">
            <div className="text-left">
              <span className="text-[10px] text-blue-200 block uppercase font-bold tracking-wider">
                Overall Score (மொத்த மதிப்பெண்)
              </span>
              <span className="text-3xl sm:text-4xl font-black text-white">{assessmentResult.overallScore}%</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="text-left">
              <span className="text-[10px] text-blue-200 block uppercase font-bold tracking-wider">
                Accuracy (சரியான விடைகள்)
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                {assessmentResult.correctAnswers} / {assessmentResult.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Competency Breakdown Cards */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Competency-Wise Diagnostic Scores
              </h2>
              <p className="text-xs text-slate-500">திறன் வாரியான விரிவான மதிப்பெண் பட்டியல்</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Target Standard: 75%
            </span>
          </div>

          <div className="space-y-3.5">
            {Object.entries(assessmentResult.competencyScores).map(([comp, score]) => {
              const isProficient = score >= 80;
              const isDeveloping = score >= 60;
              return (
                <div
                  key={comp}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{comp}</span>
                      <p className="text-[11px] text-slate-500">
                        {isProficient
                          ? 'Excellent mastery! தகுதியான தேர்ச்சி'
                          : isDeveloping
                          ? 'Good understanding, needs slight practice. மிதமான நிலை'
                          : 'Priority skill gap. அதிக பயிற்சி தேவை'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-extrabold text-slate-900">{score}%</span>
                      <Badge variant={isProficient ? 'success' : isDeveloping ? 'info' : 'danger'} size="sm">
                        {isProficient ? 'Proficient' : isDeveloping ? 'Developing' : 'Needs Practice'}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isProficient ? 'bg-emerald-600' : isDeveloping ? 'bg-blue-600' : 'bg-rose-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRetake}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Retake Benchmark • மீண்டும் எழுதவும்</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/student/competency-profile')}
                className="px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-xl transition-colors"
              >
                Competency Profile
              </button>
              <button
                onClick={() => navigate('/student/skill-gaps')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
              >
                <span>Check Updated Skill Gaps</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12 animate-fade-in">
      {/* 1. Assessment Header & Live Auto-Save Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Competency Benchmark Assessment
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-saved</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              20 கேள்விகள் கொண்ட திறன் ஆய்வு மதிப்பீடு • 20 Career Readiness Evaluation
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 border border-slate-200 transition-colors"
              title="Review answer status"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Review ({answeredCount}/20)</span>
            </button>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
              Q {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Friendly guidance for college & school students */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/60">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>எதிர்மறை மதிப்பெண்கள் இல்லை (No negative marks). அமைதியாக யோசித்து விடையளிக்கவும்.</span>
          </span>
          <span className="font-bold text-blue-700 text-xs shrink-0">
            {Math.round((answeredCount / totalQuestions) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Quick Question Jump Ribbon (1 to 20 buttons for easy access) */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            விரைவு வழிசெலுத்தல் • Question Navigator
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {allQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-300'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                  title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Active Question Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="sm">{currentQ.competency}</Badge>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Difficulty Level:</span>
            <Badge
              variant={
                currentQ.difficulty === 'Hard'
                  ? 'danger'
                  : currentQ.difficulty === 'Medium'
                  ? 'warning'
                  : 'success'
              }
              size="sm"
            >
              {currentQ.difficulty}
            </Badge>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider block">
            கேள்வி எண் / Question #{currentIndex + 1}
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.questionText}
          </p>
        </div>

        {/* Options List with Big Click-Friendly Cards */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isSelectedOption = selectedAnswers[currentQ.id] === optIdx;
            const optionLetter = String.fromCharCode(65 + optIdx);

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-3.5 ${
                  isSelectedOption
                    ? 'border-blue-600 bg-blue-50/80 text-blue-950 shadow-sm ring-2 ring-blue-500/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-black transition-all ${
                    isSelectedOption
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'border border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                >
                  {optionLetter}
                </span>

                <span className="flex-1 leading-relaxed font-semibold">
                  {option}
                </span>

                {isSelectedOption && (
                  <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation & Submission Controls */}
        <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>முந்தையது • Previous</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="hidden sm:inline-flex px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Review Status
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <span>அடுத்தது • Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>சரிபார்த்து சமர்ப்பிக்கவும் • Submit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Answer Review & Submission Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Assessment Answers • விடைகளை சரிபார்க்கவும்"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            அனைத்து 20 கேள்விகளுக்கும் பதிலளித்துள்ளீர்களா என சரிபார்க்கவும். ஏதேனும் கேள்வியை மாற்ற விரும்பினால் அதன் எண்ணைக் கிளிக் செய்யவும்.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-60 overflow-y-auto p-1">
            {allQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'border-blue-600 ring-2 ring-blue-400 bg-blue-50 font-bold text-blue-900'
                      : isAnswered
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-medium'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs font-bold">Q{idx + 1}</span>
                  <span className="text-[10px] block mt-0.5 font-medium">
                    {isAnswered ? '✓ விடயளிக்கப்பட்டது' : 'விடையளிக்கவில்லை'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <span className="text-slate-700 font-semibold">
              Answered: <strong>{answeredCount} of {totalQuestions}</strong>
            </span>
            {answeredCount < totalQuestions ? (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {totalQuestions - answeredCount} மீதமுள்ளன
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                அனைத்தும் முடிக்கப்பட்டன!
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="px-4 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
            >
              தொடர்ந்து எழுதவும் • Back
            </button>
            <button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold shadow-sm disabled:opacity-50 flex items-center gap-2 transition-all hover:shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'மதிப்பிடப்படுகிறது...' : 'சமர்ப்பிக்கவும் • Final Submit'}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
