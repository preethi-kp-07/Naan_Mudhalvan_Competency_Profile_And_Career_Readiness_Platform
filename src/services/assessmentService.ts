import { AssessmentQuestion, AssessmentAttempt } from '../types';
import { SAMPLE_ASSESSMENT_QUESTIONS, INITIAL_ASSESSMENT_ATTEMPTS } from '../data/mockData';
import { studentService } from './studentService';

const ATTEMPTS_KEY = 'nm_assessment_attempts';
const QUESTIONS_KEY = 'nm_assessment_questions';

class AssessmentService {
  private questions: AssessmentQuestion[] = [];
  private attempts: AssessmentAttempt[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const savedQuestions = localStorage.getItem(QUESTIONS_KEY);
    if (savedQuestions) {
      try {
        const parsed = JSON.parse(savedQuestions);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          this.questions = parsed;
        } else {
          this.questions = [...SAMPLE_ASSESSMENT_QUESTIONS];
          localStorage.setItem(QUESTIONS_KEY, JSON.stringify(this.questions));
        }
      } catch {
        this.questions = [...SAMPLE_ASSESSMENT_QUESTIONS];
      }
    } else {
      this.questions = [...SAMPLE_ASSESSMENT_QUESTIONS];
    }

    const savedAttempts = localStorage.getItem(ATTEMPTS_KEY);
    this.attempts = savedAttempts ? JSON.parse(savedAttempts) : [...INITIAL_ASSESSMENT_ATTEMPTS];
  }

  public getQuestions(): AssessmentQuestion[] {
    return [...this.questions];
  }

  public getAttempts(): AssessmentAttempt[] {
    return [...this.attempts];
  }

  public addQuestion(question: Omit<AssessmentQuestion, 'id'>): AssessmentQuestion {
    const newQ: AssessmentQuestion = {
      ...question,
      id: `q-${Date.now()}`
    };
    this.questions.push(newQ);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(this.questions));
    return newQ;
  }

  public submitAssessment(answers: Record<string, number>): AssessmentAttempt {
    let correctCount = 0;
    const competencyBreakdown: Record<string, { correct: number; total: number }> = {};

    this.questions.forEach(q => {
      if (!competencyBreakdown[q.competency]) {
        competencyBreakdown[q.competency] = { correct: 0, total: 0 };
      }
      competencyBreakdown[q.competency].total += 1;

      const selected = answers[q.id];
      if (selected === q.correctOptionIndex) {
        correctCount += 1;
        competencyBreakdown[q.competency].correct += 1;
      }
    });

    const totalQuestions = this.questions.length;
    const overallScore = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

    const scoresMap: Record<string, number> = {};
    Object.entries(competencyBreakdown).forEach(([comp, stats]) => {
      const calculated = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
      scoresMap[comp] = calculated;
      // Also update studentService competency scores live!
      studentService.updateCompetencyScore(comp, calculated);
    });

    const newAttempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      assessmentId: 'benchmark-live-attempt',
      title: 'Competency Benchmark Assessment',
      completedAt: new Date().toISOString(),
      overallScore,
      competencyScores: scoresMap,
      totalQuestions,
      correctAnswers: correctCount,
      difficultyReached: correctCount > 6 ? 'Hard' : correctCount > 3 ? 'Medium' : 'Easy',
    };

    this.attempts.unshift(newAttempt);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(this.attempts));
    return newAttempt;
  }
}

export const assessmentService = new AssessmentService();
