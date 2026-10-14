// TypeScript Interfaces for Naan Mudhalvan Competency Profile and Career Readiness Platform

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registerNumber?: string;
  department?: string;
  yearOfStudy?: number;
  avatarUrl?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  registerNumber: string;
  collegeEmail: string;
  personalEmail?: string;
  phone?: string;
  institution: string;
  department: string;
  degree: string;
  yearOfStudy: number;
  currentSemester: number;
  cgpa: number;
  profileCompletion: number;
}

export interface NaanMudhalvanRecord {
  id: string;
  courseName: string;
  category: string;
  partnerOrganization: string;
  skillsLearned: string[];
  status: 'Completed' | 'In Progress' | 'Enrolled';
  startDate: string;
  completionDate?: string;
  certificateUrl?: string;
  gradeOrScore?: string;
}

export interface StudentSkill {
  id: string;
  skillName: string;
  category: 'Technical' | 'Soft Skills' | 'Analytical' | 'Domain';
  selfProficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verifiedScore?: number; // From competency assessment (0-100)
  evidenceDescription?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  role: string;
  duration: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Remote' | 'On-site' | 'Hybrid';
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  duration: string;
  skillsGained: string[];
  skills?: string[];
  description: string;
  certificateUrl?: string;
}

export interface CompetencyCategory {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface CompetencyScore {
  competency: string;
  score: number; // 0-100
  targetScore: number;
  level: 'Novice' | 'Developing' | 'Proficient' | 'Advanced' | 'Expert';
  lastAssessed: string;
}

export interface AssessmentQuestion {
  id: string;
  competency: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  options: string[];
  correctOptionIndex: number; // Hidden from student frontend in real API
  explanation?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  title: string;
  completedAt: string;
  overallScore: number;
  competencyScores: { [competency: string]: number };
  totalQuestions: number;
  correctAnswers: number;
  difficultyReached: 'Easy' | 'Medium' | 'Hard';
}

export interface CareerRole {
  id: string;
  title: string;
  description: string;
  requiredCompetencies: { [competency: string]: number };
  keySkills: string[];
  demandLevel: 'Very High' | 'High' | 'Moderate';
  averageSalaryRange: string;
  fitPercentage?: number; // Calculated via cosine similarity vector match
  readinessPercentage?: number; // Calculated via transparent threshold rules
  missingSkills?: string[];
  nextSteps?: string[];
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  competency: string;
  currentScore: number;
  targetScore: number;
  gapDifference: number;
  severity: 'Critical' | 'Moderate' | 'Minor';
  recommendedAction: string;
}

export interface RoadmapActivity {
  id: string;
  careerId?: string;
  weekNumber: number;
  title: string;
  description: string;
  competency: string;
  resourceType: 'Video' | 'Notes' | 'Practice' | 'Project' | 'Re-assessment';
  resourceLink?: string;
  resourceId?: string;
  isCompleted: boolean;
  dueDate?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  resourceType: 'PDF Notes' | 'Video Lecture' | 'Practice Task' | 'External Guide';
  relatedSkill: string;
  competency: string;
  url: string;
  content?: string;
  practiceTaskDetails?: {
    overview: string;
    objectives: string[];
    sampleChallenge: string;
    expectedOutcome: string;
  };
  fileSizeOrDuration?: string;
  uploaderName: string;
  assignedDate: string;
  deadline?: string;
  targetAudience: 'All' | 'Batch 2026' | 'Individual Intervention';
  assignedStudentIds?: string[]; // IDs of assigned students
  isCompletedByCurrentStudent?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'assignment' | 'assessment' | 'achievement' | 'alert';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface SkillPassport {
  shareId: string;
  isPublic: boolean;
  shareUrl: string;
  visibleSections: {
    personalInfo: boolean;
    academicDetails: boolean;
    competencyScores: boolean;
    skills: boolean;
    certifications: boolean;
    projects: boolean;
    naanMudhalvanRecords: boolean;
  };
  customBio?: string;
  lastUpdated: string;
}
