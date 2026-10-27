import mongoose from 'mongoose';

const naanMudhalvanRecordSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  category: { type: String, required: true },
  partnerOrganization: { type: String, required: true },
  skillsLearned: [{ type: String }],
  status: { type: String, enum: ['Completed', 'In Progress', 'Enrolled'], default: 'In Progress' },
  startDate: { type: String },
  completionDate: { type: String },
  certificateUrl: { type: String },
  gradeOrScore: { type: String },
});

const studentSkillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  category: { type: String, enum: ['Technical', 'Soft Skills', 'Analytical', 'Domain'], default: 'Technical' },
  selfProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  verifiedScore: { type: Number, default: 0 },
  evidenceDescription: { type: String },
});

const competencyScoreSchema = new mongoose.Schema({
  competency: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  targetScore: { type: Number, required: true, default: 75 },
  level: { type: String, enum: ['Novice', 'Developing', 'Proficient', 'Advanced', 'Expert'], default: 'Developing' },
  lastAssessed: { type: String },
});

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    registerNumber: { type: String, required: true },
    collegeEmail: { type: String, required: true },
    personalEmail: { type: String },
    phone: { type: String },
    institution: { type: String, default: 'Government College of Engineering / Anna University Affiliated' },
    department: { type: String, required: true },
    degree: { type: String, default: 'B.E. Computer Science and Engineering' },
    yearOfStudy: { type: Number, default: 3 },
    currentSemester: { type: Number, default: 6 },
    cgpa: { type: Number, default: 8.5 },
    profileCompletion: { type: Number, default: 85 },
    naanMudhalvanRecords: [naanMudhalvanRecordSchema],
    skills: [studentSkillSchema],
    competencies: [competencyScoreSchema],
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
