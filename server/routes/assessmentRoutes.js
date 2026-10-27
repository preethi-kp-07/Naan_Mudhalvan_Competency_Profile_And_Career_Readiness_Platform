import express from 'express';
import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { AssessmentAttempt } from '../models/AssessmentAttempt.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { INITIAL_SEED_QUESTIONS } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

export const assessmentRouter = express.Router();

// GET /api/assessments/questions
assessmentRouter.get('/questions', async (req, res) => {
  try {
    const { isConnected } = getDBStatus();
    let questions;

    if (isConnected) {
      questions = await AssessmentQuestion.find().lean();
    }

    if (!questions || questions.length === 0) {
      questions = INITIAL_SEED_QUESTIONS.map((q, idx) => ({ ...q, id: `q-${idx + 1}` }));
    }

    return res.json({ success: true, questions });
  } catch (err) {
    return res.status(500).json({ success: false, questions: INITIAL_SEED_QUESTIONS });
  }
});

// POST /api/assessments/submit
assessmentRouter.post('/submit', async (req, res) => {
  try {
    const { answers, userId = 'user-stu-1' } = req.body;
    const { isConnected } = getDBStatus();

    let allQuestions = [];
    if (isConnected) {
      allQuestions = await AssessmentQuestion.find().lean();
    }
    if (!allQuestions || allQuestions.length === 0) {
      allQuestions = INITIAL_SEED_QUESTIONS.map((q, idx) => ({ ...q, id: `q-${idx + 1}` }));
    }

    let correctCount = 0;
    const competencyBreakdown = {};

    allQuestions.forEach((q, idx) => {
      const qId = q._id ? q._id.toString() : q.id || `q-${idx + 1}`;
      if (!competencyBreakdown[q.competency]) {
        competencyBreakdown[q.competency] = { correct: 0, total: 0 };
      }
      competencyBreakdown[q.competency].total += 1;

      const userChoice = answers[qId] ?? answers[q.id] ?? answers[idx];
      if (userChoice === q.correctOptionIndex) {
        correctCount += 1;
        competencyBreakdown[q.competency].correct += 1;
      }
    });

    const totalQuestions = allQuestions.length;
    const overallScore = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

    const scoresMap = {};
    Object.entries(competencyBreakdown).forEach(([comp, stats]) => {
      scoresMap[comp] = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
    });

    const attemptData = {
      userId,
      assessmentId: 'benchmark-live-attempt',
      title: 'Competency Benchmark Assessment',
      completedAt: new Date().toISOString(),
      overallScore,
      competencyScores: scoresMap,
      totalQuestions,
      correctAnswers: correctCount,
      difficultyReached: correctCount > 4 ? 'Hard' : correctCount > 2 ? 'Medium' : 'Easy',
    };

    if (isConnected) {
      // Save attempt in MongoDB
      await AssessmentAttempt.create(attemptData);

      // Update StudentProfile competencies in MongoDB
      const compArray = Object.entries(scoresMap).map(([comp, score]) => ({
        competency: comp,
        score,
        targetScore: 75,
        level: score >= 80 ? 'Proficient' : score >= 60 ? 'Developing' : 'Novice',
        lastAssessed: new Date().toISOString().split('T')[0],
      }));

      await StudentProfile.findOneAndUpdate(
        { userId },
        { $set: { competencies: compArray } }
      );
    }

    return res.json({
      success: true,
      message: 'Assessment submitted and scored successfully',
      result: attemptData,
    });
  } catch (err) {
    console.error('Assessment submit error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});
