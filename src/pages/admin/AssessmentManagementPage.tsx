import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import { AssessmentQuestion } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedQuestion } from '../../i18n/dataTranslations';

export const AssessmentManagementPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(assessmentService.getQuestions());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    competency: 'Relational Databases & SQL',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOptionIndex: 0,
    explanation: '',
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.questionText || !newQuestion.optionA || !newQuestion.optionB) return;

    const created = assessmentService.addQuestion({
      competency: newQuestion.competency,
      difficulty: newQuestion.difficulty,
      questionText: newQuestion.questionText,
      options: [
        newQuestion.optionA,
        newQuestion.optionB,
        newQuestion.optionC || 'None of the above',
        newQuestion.optionD || 'All of the above',
      ],
      correctOptionIndex: Number(newQuestion.correctOptionIndex),
      explanation: newQuestion.explanation,
    });

    setQuestions([...questions, created]);
    setIsModalOpen(false);
    setNewQuestion({
      competency: 'Relational Databases & SQL',
      difficulty: 'Medium',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOptionIndex: 0,
      explanation: '',
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('admin.manageQuestionsTitle')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('admin.manageQuestionsSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t('admin.addQuestionBtn')}</span>
        </button>
      </div>

      {/* Active Assessments Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">{language === 'ta' ? 'உள்ளமைக்கப்பட்ட கேள்விகள்' : 'Configured Questions'}</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{questions.length}</p>
          <span className="text-[11px] text-slate-400">{language === 'ta' ? '6 திறன் பிரிவுகளில்' : 'Across 6 competency categories'}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">{language === 'ta' ? 'தகவமைப்பு மதிப்பீட்டு முறை' : 'Adaptive Engine'}</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{language === 'ta' ? 'செயலில்' : 'Active'}</p>
          <span className="text-[11px] text-slate-400">{language === 'ta' ? 'எளிது → நடுத்தரம் → கடினம் முன்னேற்றம்' : 'Easy → Medium → Hard progression'}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">{language === 'ta' ? 'திரள் பங்கேற்பு' : 'Cohort Participation'}</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">88% (125/142)</p>
          <span className="text-[11px] text-slate-400">{language === 'ta' ? 'தற்போதைய மதிப்பீட்டுக் காலம்' : 'Active benchmark window'}</span>
        </div>
      </div>

      {/* Question List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-700" />
          <span>{language === 'ta' ? 'கேள்வி வங்கிப் பட்டியல்' : 'Question Bank Registry'}</span>
        </h2>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const locQ = getLocalizedQuestion(q, language);

            return (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 font-bold text-slate-700 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <Badge variant="primary" size="sm">{locQ.competency}</Badge>
                    <Badge
                      variant={
                        q.difficulty === 'Hard'
                          ? 'danger'
                          : q.difficulty === 'Medium'
                          ? 'warning'
                          : 'success'
                      }
                      size="sm"
                    >
                      {language === 'ta'
                        ? q.difficulty === 'Hard' ? 'கடினம்' : q.difficulty === 'Medium' ? 'நடுத்தரம்' : 'எளிது'
                        : q.difficulty}
                    </Badge>
                  </div>
                </div>

                <p className="font-semibold text-slate-900 mt-2 text-xs">{locQ.questionText}</p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {locQ.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded-lg border ${
                        optIdx === q.correctOptionIndex
                          ? 'border-emerald-300 bg-emerald-50/60 font-semibold text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                      {optIdx === q.correctOptionIndex && (
                        <span className="ml-1.5 text-emerald-700 font-bold">
                          {language === 'ta' ? '(சரியானது)' : '(Correct)'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {locQ.explanation && (
                  <p className="mt-2 text-[11px] text-slate-500 italic bg-white p-2 rounded border border-slate-200">
                    <strong>{language === 'ta' ? 'விளக்கம்:' : 'Explanation:'}</strong> {locQ.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Creating Question */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('admin.createQuestionModalTitle')}>
        <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">{language === 'ta' ? 'திறன் வகை *' : 'Competency Category *'}</label>
              <select
                value={newQuestion.competency}
                onChange={(e) => setNewQuestion({ ...newQuestion, competency: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Relational Databases & SQL">Relational Databases & SQL</option>
                <option value="Programming & Logic">Programming & Logic</option>
                <option value="Web & API Engineering">Web & API Engineering</option>
                <option value="Problem Solving & DSA">Problem Solving & DSA</option>
                <option value="Professional Communication">Professional Communication</option>
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">{language === 'ta' ? 'கடினத்தன்மை நிலை *' : 'Difficulty Level *'}</label>
              <select
                value={newQuestion.difficulty}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, difficulty: e.target.value as any })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Easy">{language === 'ta' ? 'எளிது (Easy)' : 'Easy'}</option>
                <option value="Medium">{language === 'ta' ? 'நடுத்தரம் (Medium)' : 'Medium'}</option>
                <option value="Hard">{language === 'ta' ? 'கடினம் (Hard)' : 'Hard'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('admin.questionField')} *</label>
            <textarea
              rows={2}
              required
              value={newQuestion.questionText}
              onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
              placeholder={language === 'ta' ? 'எ.கா. PostgreSQL-ல் முழு-உரைத் தேடலுக்கு உகந்த அட்டவணை வகை எது?' : 'e.g. Which index type in PostgreSQL is optimized for full-text search?'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-700 block">{language === 'ta' ? 'தேர்வு விருப்பங்கள் *' : 'Multiple Choice Options *'}</label>
            <input
              type="text"
              required
              value={newQuestion.optionA}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
              placeholder={t('admin.optionAField')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              required
              value={newQuestion.optionB}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
              placeholder={t('admin.optionBField')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              value={newQuestion.optionC}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
              placeholder={t('admin.optionCField')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              value={newQuestion.optionD}
              onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
              placeholder={t('admin.optionDField')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('admin.correctOptionField')} *</label>
            <select
              value={newQuestion.correctOptionIndex}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, correctOptionIndex: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value={0}>{language === 'ta' ? 'விருப்பம் A சரியானது' : 'Option A is Correct'}</option>
              <option value={1}>{language === 'ta' ? 'விருப்பம் B சரியானது' : 'Option B is Correct'}</option>
              <option value={2}>{language === 'ta' ? 'விருப்பம் C சரியானது' : 'Option C is Correct'}</option>
              <option value={3}>{language === 'ta' ? 'விருப்பம் D சரியானது' : 'Option D is Correct'}</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('admin.explanationField')}</label>
            <textarea
              rows={2}
              value={newQuestion.explanation}
              onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
              placeholder={language === 'ta' ? 'மாணவர் புரிதலுக்காக இவ்விருப்பம் ஏன் சரியானது என்பதை விளக்குங்கள்...' : 'Explain why this option is correct for student remedial review...'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
