import mongoose from 'mongoose';

const assessmentAttemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    assessmentId: { type: String, default: 'general-readiness-2026' },
    title: { type: String, default: 'Competency Benchmark Assessment' },
    completedAt: { type: Date, default: Date.now },
    overallScore: { type: Number, required: true },
    competencyScores: { type: Map, of: Number },
    totalQuestions: { type: Number, default: 20 },
    correctAnswers: { type: Number, required: true },
    difficultyReached: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  },
  { timestamps: true }
);

export const AssessmentAttempt = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);
