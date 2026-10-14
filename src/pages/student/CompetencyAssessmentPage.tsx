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
        <div className="bg-gradient-to-r from-[#0B2545] to-[#133E87] rounded-2xl p-6 text-white text-center shadow-md border border-blue-900/50">
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8 text-amber-300" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
            Assessment Completed Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
            Competency Benchmark Result
          </h1>
          <p className="text-xs text-blue-100/90 mt-1 max-w-lg mx-auto">
            Your answers have been graded across all 20 questions. Your competency vector, skill gaps, and career roadmaps are updated live.
          </p>

          <div className="mt-6 inline-flex items-center gap-6 bg-white/10 px-8 py-3.5 rounded-xl border border-white/20">
            <div className="text-left">
              <span className="text-[10px] text-blue-200 block uppercase font-medium">Overall Score</span>
              <span className="text-3xl font-extrabold text-white">{assessmentResult.overallScore}%</span>
            </div>
            <div className="h-9 w-px bg-white/20" />
            <div className="text-left">
              <span className="text-[10px] text-blue-200 block uppercase font-medium">Correct Questions</span>
              <span className="text-xl font-bold text-emerald-300">
                {assessmentResult.correctAnswers} / {assessmentResult.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Competency Breakdown Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Competency-Wise Diagnostic Scores
          </h2>

          <div className="space-y-3">
            {Object.entries(assessmentResult.competencyScores).map(([comp, score]) => (
              <div key={comp} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{comp}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{score}%</span>
                    <Badge variant={score >= 80 ? 'success' : score >= 60 ? 'info' : 'danger'} size="sm">
                      {score >= 80 ? 'Proficient' : score >= 60 ? 'Developing' : 'Needs Practice'}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-blue-600' : 'bg-rose-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRetake}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Benchmark</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/student/competency-profile')}
                className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
              >
                View Competency Profile
              </button>
              <button
                onClick={() => navigate('/student/skill-gaps')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Check Updated Skill Gaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Assessment Header (Requirement 4: Competency Benchmark Assessment) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Competency Benchmark Assessment</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive 20-question evaluation across core career readiness domains
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 border border-slate-200 transition-colors"
              title="Review answer status"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Review ({answeredCount}/20)</span>
            </button>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>Progress: {answeredCount} of {totalQuestions} answered</span>
            <span>{Math.round((answeredCount / totalQuestions) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Active Question Card (Requirement 5) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="sm">{currentQ.competency}</Badge>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400">Level:</span>
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

        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
            Question #{currentIndex + 1} of {totalQuestions}
          </span>
          <p className="text-base font-semibold text-slate-900 leading-relaxed">
            {currentQ.questionText}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, optIdx) => {
            const isSelectedOption = selectedAnswers[currentQ.id] === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all duration-150 flex items-start gap-3 ${
                  isSelectedOption
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    isSelectedOption
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-slate-300 bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 mt-0.5">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submission Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
            >
              Review All
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Review & Submit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- Answer Review & Submission Modal (Requirement 5) --- */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Assessment Answers"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Review your answers across all 20 questions before final evaluation. Click any question number to review or change your response.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-60 overflow-y-auto p-1">
            {allQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'border-blue-600 ring-2 ring-blue-400 bg-blue-50 font-bold text-blue-900'
                      : isAnswered
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-medium'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs">Q{idx + 1}</span>
                  <span className="text-[10px] block mt-0.5">
                    {isAnswered ? '✓ Answered' : 'Unanswered'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="text-slate-600 font-medium">
              Answered: <strong>{answeredCount} of {totalQuestions}</strong>
            </span>
            {answeredCount < totalQuestions && (
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {totalQuestions - answeredCount} questions remaining
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700"
            >
              Back to Assessment
            </button>
            <button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Evaluating...' : 'Confirm Final Submission'}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
