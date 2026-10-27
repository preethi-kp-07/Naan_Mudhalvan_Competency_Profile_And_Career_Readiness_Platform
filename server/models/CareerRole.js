import mongoose from 'mongoose';

const careerRoleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    demandLevel: { type: String, enum: ['Moderate', 'High', 'Very High'], default: 'High' },
    averageSalaryRange: { type: String, required: true },
    requiredCompetencies: { type: Map, of: Number },
    keySkills: [{ type: String }],
    fitPercentage: { type: Number, default: 75 },
    readinessPercentage: { type: Number, default: 70 },
    missingSkills: [{ type: String }],
    nextSteps: [{ type: String }],
  },
  { timestamps: true }
);

export const CareerRole = mongoose.model('CareerRole', careerRoleSchema);
