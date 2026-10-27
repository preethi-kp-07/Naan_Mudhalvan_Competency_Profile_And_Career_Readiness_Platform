import mongoose from 'mongoose';

const learningMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    resourceType: {
      type: String,
      enum: ['PDF Notes', 'Video Lecture', 'Practice Task', 'External Guide'],
      required: true,
    },
    relatedSkill: { type: String, required: true },
    competency: { type: String, required: true },
    uploaderName: { type: String, default: 'Dr. S. Sundaram' },
    uploaderRole: { type: String, default: 'Faculty / Career Readiness Lead' },
    assignedToStudentIds: [{ type: String }],
    fileUrl: { type: String },
    fileSizeOrDuration: { type: String },
    completedByStudentIds: [{ type: String }],
    deadline: { type: String },
  },
  { timestamps: true }
);

export const LearningMaterial = mongoose.model('LearningMaterial', learningMaterialSchema);
