import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema(
  {
    competency: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true },
    explanation: { type: String },
  },
  { timestamps: true }
);

export const AssessmentQuestion = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
