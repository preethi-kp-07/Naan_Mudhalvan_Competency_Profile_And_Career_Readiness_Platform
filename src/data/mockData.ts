import {
  User,
  StudentProfile,
  NaanMudhalvanRecord,
  StudentSkill,
  Certification,
  StudentProject,
  Internship,
  CompetencyScore,
  AssessmentQuestion,
  AssessmentAttempt,
  CareerRole,
  SkillGapItem,
  RoadmapActivity,
  LearningMaterial,
  NotificationItem,
  SkillPassport
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-stu-1',
    name: 'Preethi S.',
    email: 'preethi@college.edu',
    role: 'student',
    registerNumber: '710022104042',
    department: 'Computer Science and Engineering',
    yearOfStudy: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-stu-2',
    name: 'Karthik R.',
    email: 'karthik@college.edu',
    role: 'student',
    registerNumber: '710022104028',
    department: 'Information Technology',
    yearOfStudy: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-stu-3',
    name: 'Ananya M.',
    email: 'ananya@college.edu',
    role: 'student',
    registerNumber: '710022104015',
    department: 'Computer Science and Engineering',
    yearOfStudy: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-adm-1',
    name: 'Dr. S. Sundaram',
    email: 'faculty.admin@college.edu',
    role: 'admin',
    department: 'CSE / Career Readiness Cell',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'profile-stu-1',
  userId: 'user-stu-1',
  fullName: 'Preethi Shanmugam',
  registerNumber: '710022104042',
  collegeEmail: 'preethi@college.edu',
  personalEmail: 'preethi.s.cse@gmail.com',
  phone: '+91 98765 43210',
  institution: 'Government College of Engineering / Anna University Affiliated',
  department: 'Computer Science and Engineering',
  degree: 'B.E. Computer Science and Engineering',
  yearOfStudy: 3,
  currentSemester: 6,
  cgpa: 8.64,
  profileCompletion: 85,
};

export const INITIAL_NAAN_MUDHALVAN_RECORDS: NaanMudhalvanRecord[] = [
  {
    id: 'nm-1',
    courseName: 'Full Stack Web Development with Modern MERN & Cloud',
    category: 'Information Technology / Software Development',
    partnerOrganization: 'TNSDC / Naan Mudhalvan Training Partner',
    skillsLearned: ['React.js', 'Node.js', 'REST APIs', 'Cloud Deployment'],
    status: 'Completed',
    startDate: '2025-08-10',
    completionDate: '2025-11-20',
    certificateUrl: 'https://skilldevelopment.tn.gov.in/verify/NM-TN-2025-78901',
    gradeOrScore: 'Grade A+ (92%)',
  },
  {
    id: 'nm-2',
    courseName: 'Data Analytics & Database Foundations with Python',
    category: 'Emerging Technologies & Analytics',
    partnerOrganization: 'Naan Mudhalvan Industry Partner',
    skillsLearned: ['Python', 'Pandas', 'Basic SQL Queries', 'Data Visualization'],
    status: 'Completed',
    startDate: '2025-01-15',
    completionDate: '2025-04-10',
    certificateUrl: 'https://skilldevelopment.tn.gov.in/verify/NM-TN-2025-45120',
    gradeOrScore: 'Grade A (86%)',
  },
  {
    id: 'nm-3',
    courseName: 'Enterprise Cloud Architecture & DevOps Foundations',
    category: 'Cloud & Infrastructure',
    partnerOrganization: 'Naan Mudhalvan Center of Excellence',
    skillsLearned: ['Docker Basics', 'CI/CD Pipelines', 'Linux Command Line'],
    status: 'In Progress',
    startDate: '2026-01-10',
    gradeOrScore: 'In Progress (Module 4 of 6)',
  }
];

export const INITIAL_STUDENT_SKILLS: StudentSkill[] = [
  {
    id: 'skill-1',
    skillName: 'JavaScript & TypeScript',
    category: 'Technical',
    selfProficiency: 'Advanced',
    verifiedScore: 84,
    evidenceDescription: 'Built multiple full-stack applications with React and Node.js.',
  },
  {
    id: 'skill-2',
    skillName: 'Relational Databases & SQL',
    category: 'Technical',
    selfProficiency: 'Intermediate',
    verifiedScore: 52, // Key skill gap demonstrated
    evidenceDescription: 'Completed basic coursework; needs optimization and indexing practice.',
  },
  {
    id: 'skill-3',
    skillName: 'Data Structures & Algorithms',
    category: 'Analytical',
    selfProficiency: 'Intermediate',
    verifiedScore: 78,
    evidenceDescription: 'Solved 150+ problems on LeetCode/HackerRank.',
  },
  {
    id: 'skill-4',
    skillName: 'React.js Frontend Architecture',
    category: 'Technical',
    selfProficiency: 'Advanced',
    verifiedScore: 88,
    evidenceDescription: 'Developed responsive web applications using component-driven design.',
  },
  {
    id: 'skill-5',
    skillName: 'Technical & Professional Communication',
    category: 'Soft Skills',
    selfProficiency: 'Advanced',
    verifiedScore: 80,
    evidenceDescription: 'Presented research paper at college national symposium.',
  },
  {
    id: 'skill-6',
    skillName: 'Git & Version Control',
    category: 'Technical',
    selfProficiency: 'Advanced',
    verifiedScore: 85,
    evidenceDescription: 'Active open source contributions with pull request workflows.',
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Naan Mudhalvan Certified Full Stack Developer',
    issuingOrg: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    issueDate: '2025-11-20',
    credentialId: 'TNSDC-NM-2025-8941',
    verificationUrl: 'https://skilldevelopment.tn.gov.in/verify/NM-8941',
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Cloud Practitioner',
    issuingOrg: 'Amazon Web Services',
    issueDate: '2025-09-15',
    expiryDate: '2028-09-15',
    credentialId: 'AWS-CCP-9940124',
    verificationUrl: 'https://aws.amazon.com/verification',
  }
];

export const INITIAL_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'Smart Campus Resource & Lab Booking Portal',
    description: 'A responsive full-stack system streamlining laboratory equipment reservation and faculty approvals.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/preethi-s/smart-campus-portal',
    role: 'Lead Full Stack Developer',
    duration: '3 Months (Aug 2025 - Nov 2025)',
  },
  {
    id: 'proj-2',
    title: 'Crop Disease Detection using Deep Learning',
    description: 'An AI-driven mobile web dashboard for agricultural crop leaf defect diagnosis with advisory notes.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Tailwind CSS'],
    githubUrl: 'https://github.com/preethi-s/agri-leaf-care',
    role: 'ML Pipeline & API Developer',
    duration: '2 Months (Jan 2025 - Mar 2025)',
  }
];

import { TWENTY_ASSESSMENT_QUESTIONS } from './assessmentQuestions';

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    company: 'Cognitive Web Solutions Pvt. Ltd., Chennai',
    role: 'Software Development Intern (Full Stack)',
    employmentType: 'On-site',
    startDate: '2025-06-01',
    endDate: '2025-08-01',
    currentlyWorking: false,
    duration: 'June 2025 - August 2025 (8 Weeks)',
    skillsGained: ['React component modularization', 'RESTful API Integration', 'PostgreSQL Query Optimization', 'Agile Scrum'],
    description: 'Contributed to client-facing dashboard UI components and resolved API response caching bottlenecks.',
    certificateUrl: 'https://example.com/certificates/intern-cws-2025.pdf',
  }
];

export const INITIAL_COMPETENCY_SCORES: CompetencyScore[] = [
  {
    competency: 'Programming & Logic',
    score: 84,
    targetScore: 85,
    level: 'Advanced',
    lastAssessed: '2026-03-25',
  },
  {
    competency: 'Relational Databases & SQL',
    score: 52, // Key skill gap
    targetScore: 80,
    level: 'Developing',
    lastAssessed: '2026-03-25',
  },
  {
    competency: 'Problem Solving & DSA',
    score: 76,
    targetScore: 80,
    level: 'Proficient',
    lastAssessed: '2026-03-25',
  },
  {
    competency: 'Web & API Engineering',
    score: 86,
    targetScore: 85,
    level: 'Advanced',
    lastAssessed: '2026-03-25',
  },
  {
    competency: 'Professional Communication',
    score: 80,
    targetScore: 75,
    level: 'Proficient',
    lastAssessed: '2026-03-25',
  },
  {
    competency: 'Cloud & Infrastructure',
    score: 64,
    targetScore: 75,
    level: 'Developing',
    lastAssessed: '2026-03-25',
  }
];

export const SAMPLE_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = TWENTY_ASSESSMENT_QUESTIONS;

export const INITIAL_ASSESSMENT_ATTEMPTS: AssessmentAttempt[] = [
  {
    id: 'att-1',
    assessmentId: 'general-readiness-2026',
    title: 'Competency Benchmark Assessment',
    completedAt: '2026-03-25T14:30:00Z',
    overallScore: 74,
    competencyScores: {
      'Programming & Logic': 84,
      'Relational Databases & SQL': 52,
      'Problem Solving & DSA': 76,
      'Web & API Engineering': 86,
      'Professional Communication': 80,
      'Cloud & Infrastructure': 64,
    },
    totalQuestions: 20,
    correctAnswers: 15,
    difficultyReached: 'Hard',
  },
  {
    id: 'att-2',
    assessmentId: 'baseline-readiness-2025',
    title: 'Baseline Competency Diagnostic Assessment',
    completedAt: '2025-10-18T10:15:00Z',
    overallScore: 65,
    competencyScores: {
      'Programming & Logic': 72,
      'Relational Databases & SQL': 46,
      'Problem Solving & DSA': 68,
      'Web & API Engineering': 74,
      'Professional Communication': 75,
      'Cloud & Infrastructure': 55,
    },
    totalQuestions: 20,
    correctAnswers: 13,
    difficultyReached: 'Medium',
  }
];

export const INITIAL_CAREER_ROLES: CareerRole[] = [
  {
    id: 'career-1',
    title: 'Full Stack Software Engineer',
    description: 'Designs, develops, and deploys end-to-end web applications with modern frontend frameworks and robust backend microservices.',
    requiredCompetencies: {
      'Programming & Logic': 85,
      'Relational Databases & SQL': 80,
      'Problem Solving & DSA': 80,
      'Web & API Engineering': 85,
      'Professional Communication': 75,
      'Cloud & Infrastructure': 70,
    },
    keySkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs'],
    demandLevel: 'Very High',
    averageSalaryRange: '₹ 6.5 LPA - ₹ 14 LPA',
    fitPercentage: 86,
    readinessPercentage: 72,
    missingSkills: ['PostgreSQL Indexing & Optimization', 'Database Transaction Isolation', 'CI/CD Containerization'],
    nextSteps: [
      'Complete Faculty-Assigned SQL Remedial Module',
      'Implement multi-table joins in your portfolio project',
      'Take Competency Benchmark to raise score to 80%+'
    ]
  },
  {
    id: 'career-2',
    title: 'Frontend Web Specialist',
    description: 'Crafts responsive, accessible, high-performance web user interfaces with state management, animations, and clean UX design.',
    requiredCompetencies: {
      'Programming & Logic': 85,
      'Relational Databases & SQL': 55,
      'Problem Solving & DSA': 70,
      'Web & API Engineering': 90,
      'Professional Communication': 80,
      'Cloud & Infrastructure': 60,
    },
    keySkills: ['React.js', 'Tailwind CSS', 'TypeScript', 'UI/UX Design', 'Performance Tuning'],
    demandLevel: 'High',
    averageSalaryRange: '₹ 5.5 LPA - ₹ 11 LPA',
    fitPercentage: 92,
    readinessPercentage: 88,
    missingSkills: ['Advanced Lighthouse Web Vitals Optimization', 'Automated E2E Testing with Playwright'],
    nextSteps: [
      'Refine component accessibility (ARIA)',
      'Deploy interactive portfolio showcasing state management'
    ]
  },
  {
    id: 'career-3',
    title: 'Backend & Database Engineer',
    description: 'Specializes in scalable server-side systems, database schema architecture, caching layers, and high-throughput transaction pipelines.',
    requiredCompetencies: {
      'Programming & Logic': 85,
      'Relational Databases & SQL': 90,
      'Problem Solving & DSA': 85,
      'Web & API Engineering': 85,
      'Professional Communication': 70,
      'Cloud & Infrastructure': 80,
    },
    keySkills: ['PostgreSQL', 'Express.js', 'Redis', 'Database Indexing', 'API Security', 'System Design'],
    demandLevel: 'Very High',
    averageSalaryRange: '₹ 7 LPA - ₹ 15 LPA',
    fitPercentage: 76,
    readinessPercentage: 58,
    missingSkills: ['Complex SQL Aggregations & Window Functions', 'Query Execution Plans & Explain Analyze', 'Redis Caching'],
    nextSteps: [
      'Master Database Normalization and ACID guarantees',
      'Build a high-volume REST API with relational constraints'
    ]
  },
  {
    id: 'career-4',
    title: 'Data Analyst & Business Intelligence Specialist',
    description: 'Extracts, transforms, and analyzes complex structured data to provide actionable business intelligence and automated dashboard reports.',
    requiredCompetencies: {
      'Programming & Logic': 75,
      'Relational Databases & SQL': 85,
      'Problem Solving & DSA': 70,
      'Web & API Engineering': 60,
      'Professional Communication': 85,
      'Cloud & Infrastructure': 65,
    },
    keySkills: ['SQL', 'Python', 'Pandas', 'PowerBI / Tableau', 'Statistical Analysis'],
    demandLevel: 'High',
    averageSalaryRange: '₹ 5 LPA - ₹ 9.5 LPA',
    fitPercentage: 74,
    readinessPercentage: 62,
    missingSkills: ['Advanced SQL Joins', 'Analytical Window Functions', 'Data Storytelling'],
    nextSteps: [
      'Complete SQL and PowerBI projects using curated learning resources'
    ]
  },
  {
    id: 'career-5',
    title: 'Software Engineer (Core Systems)',
    description: 'Focuses on systems software, foundational algorithms, object-oriented design patterns, and high-reliability unit and integration testing.',
    requiredCompetencies: {
      'Programming & Logic': 90,
      'Relational Databases & SQL': 75,
      'Problem Solving & DSA': 90,
      'Web & API Engineering': 75,
      'Professional Communication': 75,
      'Cloud & Infrastructure': 75,
    },
    keySkills: ['Data Structures', 'Algorithms', 'System Design', 'Git', 'Testing', 'Clean Code'],
    demandLevel: 'Very High',
    averageSalaryRange: '₹ 8 LPA - ₹ 16 LPA',
    fitPercentage: 82,
    readinessPercentage: 74,
    missingSkills: ['Advanced Graph Algorithms', 'Concurrent Threading Models'],
    nextSteps: [
      'Solve Tree & Graph problems in competitive programming set',
      'Build an end-to-end automated testing suite'
    ]
  }
];

export const INITIAL_SKILL_GAPS: SkillGapItem[] = [
  {
    id: 'gap-sql',
    skillName: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    currentScore: 52,
    targetScore: 80,
    gapDifference: 28,
    severity: 'Critical',
    recommendedAction: 'Complete Faculty-Assigned SQL Module: Joins, Group By, Subqueries, and Indexes.',
  },
  {
    id: 'gap-cloud',
    skillName: 'Cloud & Infrastructure',
    competency: 'Cloud & Infrastructure',
    currentScore: 64,
    targetScore: 75,
    gapDifference: 11,
    severity: 'Moderate',
    recommendedAction: 'Review Docker containerization and deployment blueprints provided by faculty.',
  },
  {
    id: 'gap-dsa',
    skillName: 'Problem Solving & DSA',
    competency: 'Problem Solving & DSA',
    currentScore: 76,
    targetScore: 80,
    gapDifference: 4,
    severity: 'Minor',
    recommendedAction: 'Practice tree traversals and dynamic programming problem sets.',
  }
];

export const INITIAL_ROADMAP_ACTIVITIES: RoadmapActivity[] = [
  {
    id: 'road-1',
    careerId: 'career-1',
    weekNumber: 1,
    title: 'Week 1: SQL Fundamentals & Data Normalization',
    description: 'Master 1NF, 2NF, 3NF principles, primary/foreign key constraints, and basic filtering.',
    competency: 'Relational Databases & SQL',
    resourceType: 'Notes',
    resourceId: 'mat-1',
    isCompleted: true,
    dueDate: '2026-04-05',
  },
  {
    id: 'road-2',
    careerId: 'career-1',
    weekNumber: 2,
    title: 'Week 2: Advanced Multi-Table Joins & Aggregations',
    description: 'Hands-on practice with INNER, LEFT, RIGHT, and FULL OUTER JOINs, GROUP BY, and HAVING clauses.',
    competency: 'Relational Databases & SQL',
    resourceType: 'Practice',
    resourceId: 'mat-3',
    isCompleted: false,
    dueDate: '2026-04-12',
  },
  {
    id: 'road-3',
    careerId: 'career-1',
    weekNumber: 3,
    title: 'Week 3: Query Optimization, Indexing & Transactions',
    description: 'Learn B-Tree indexes, EXPLAIN ANALYZE execution plans, and ACID transaction locks.',
    competency: 'Relational Databases & SQL',
    resourceType: 'Video',
    resourceId: 'mat-2',
    isCompleted: false,
    dueDate: '2026-04-19',
  },
  {
    id: 'road-4',
    careerId: 'career-1',
    weekNumber: 4,
    title: 'Week 4: Mini-Project Integration & Competency Re-Assessment',
    description: 'Incorporate optimized PostgreSQL schema in your web project and retake the benchmark assessment.',
    competency: 'Relational Databases & SQL',
    resourceType: 'Re-assessment',
    resourceLink: '/student/assessment',
    isCompleted: false,
    dueDate: '2026-04-26',
  }
];

export const INITIAL_LEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-1',
    title: 'Comprehensive SQL Joins & Query Mastery Guide',
    description: 'Faculty-prepared lecture notes covering real-world multi-table joins, Venn diagram representations, and null handling in relational queries.',
    resourceType: 'PDF Notes',
    relatedSkill: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    url: '#in-app-pdf-sql-joins',
    content: 'Relational Joins Deep Dive: INNER JOIN matches intersecting keys. LEFT OUTER JOIN preserves left records and backfills nulls. ALWAYS specify ON predicates explicitly rather than comma-joins to prevent accidental Cartesian cross products.',
    fileSizeOrDuration: '2.4 MB PDF (34 Pages)',
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-26',
    deadline: '2026-04-15',
    targetAudience: 'Batch 2026',
    assignedStudentIds: ['user-stu-1', 'user-stu-2'],
    isCompletedByCurrentStudent: false,
  },
  {
    id: 'mat-2',
    title: 'PostgreSQL Indexing & Performance Tuning Masterclass',
    description: 'Recorded faculty seminar demonstrating how B-Tree and GIN indexes reduce query scan time from 450ms to 4ms on large datasets.',
    resourceType: 'Video Lecture',
    relatedSkill: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    url: '#in-app-video-indexing',
    fileSizeOrDuration: '42 Minutes Video',
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-27',
    deadline: '2026-04-18',
    targetAudience: 'Individual Intervention',
    assignedStudentIds: ['user-stu-1'],
    isCompletedByCurrentStudent: false,
  },
  {
    id: 'mat-3',
    title: 'Interactive 25-Query Database Problem Set',
    description: 'Step-by-step SQL practice lab with sample student and departmental schema, challenge problems, and verified outputs.',
    resourceType: 'Practice Task',
    relatedSkill: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    url: '#in-app-task-sql-lab',
    fileSizeOrDuration: '25 Practice Challenges',
    practiceTaskDetails: {
      overview: 'Interactive departmental query suite covering aggregation, filtering, and indexing.',
      objectives: ['Filter grouped metrics with HAVING', 'Calculate departmental percentiles with window functions'],
      sampleChallenge: 'Write a query to list all students whose verified score is higher than their department average.',
      expectedOutcome: 'Returns table of matching student IDs and positive score differentials.'
    },
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-28',
    deadline: '2026-04-22',
    targetAudience: 'Batch 2026',
    assignedStudentIds: ['user-stu-1', 'user-stu-3'],
    isCompletedByCurrentStudent: false,
  },
  {
    id: 'mat-4',
    title: 'Modern RESTful API Security Architecture with JWT & HttpOnly',
    description: 'Technical document outlining authentication middleware, CSRF token mitigation, and role-based access control.',
    resourceType: 'External Guide',
    relatedSkill: 'Web & API Engineering',
    competency: 'Web & API Engineering',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
    content: 'Security Best Practice: Never store bearer tokens in LocalStorage due to XSS vulnerability. Always issue HttpOnly, Secure, SameSite=Strict cookies to insulate authentication state from browser scripts.',
    fileSizeOrDuration: '18 min read',
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-10',
    deadline: '2026-04-01',
    targetAudience: 'All',
    assignedStudentIds: ['user-stu-1', 'user-stu-2', 'user-stu-3'],
    isCompletedByCurrentStudent: true,
  },
  {
    id: 'mat-react-ts',
    title: 'Modern React Component Architecture & TypeScript Patterns',
    description: 'Faculty guide on building reusable UI components, custom hooks, and strict prop contracts without type regressions.',
    resourceType: 'PDF Notes',
    relatedSkill: 'React.js Frontend Architecture',
    competency: 'Web & API Engineering',
    url: '#in-app-pdf-react-ts',
    content: 'React + TypeScript Rules: Strongly type all component props. Use discriminated unions for loading/success/error UI states. Leverage memoization with useMemo and useCallback selectively on expensive computations.',
    fileSizeOrDuration: '1.8 MB PDF (22 Pages)',
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-20',
    deadline: '2026-04-25',
    targetAudience: 'Batch 2026',
    assignedStudentIds: ['user-stu-1', 'user-stu-2'],
    isCompletedByCurrentStudent: true,
  },
  {
    id: 'mat-py-data',
    title: 'Python for Data Analysis: Pandas & Cleaning Pipelines',
    description: 'Comprehensive lab notes on data transformations, handling nulls, groupby operations, and statistical summarization.',
    resourceType: 'Practice Task',
    relatedSkill: 'Python & Data Analytics',
    competency: 'Programming & Logic',
    url: '#in-app-task-python-pandas',
    fileSizeOrDuration: '15 Lab Challenges',
    uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
    assignedDate: '2026-03-22',
    deadline: '2026-04-30',
    targetAudience: 'All',
    assignedStudentIds: ['user-stu-1', 'user-stu-3'],
    isCompletedByCurrentStudent: false,
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Learning Material Assigned',
    message: 'Dr. S. Sundaram assigned "Comprehensive SQL Joins & Query Mastery Guide" to address your identified skill gap.',
    type: 'assignment',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/student/learning-materials',
  },
  {
    id: 'notif-2',
    title: 'Competency Assessment Result Available',
    message: 'Your Competency Benchmark is processed. Overall Competency Score: 74%.',
    type: 'assessment',
    timestamp: '2 days ago',
    read: false,
    actionUrl: '/student/competency-profile',
  },
  {
    id: 'notif-3',
    title: 'Career Match Recommendation Updated',
    message: 'Your profile matches Full Stack Software Engineer (86% Fit, 72% Readiness). Review your roadmap.',
    type: 'achievement',
    timestamp: '3 days ago',
    read: true,
    actionUrl: '/student/career-matching',
  }
];

export const INITIAL_SKILL_PASSPORT: SkillPassport = {
  shareId: 'sp-tn-710022104042-88f',
  isPublic: true,
  shareUrl: window.location.origin + '/passport/sp-tn-710022104042-88f',
  visibleSections: {
    personalInfo: true,
    academicDetails: true,
    competencyScores: true,
    skills: true,
    certifications: true,
    projects: true,
    naanMudhalvanRecords: true,
  },
  customBio: 'Passionate 3rd-year Computer Science student specializing in modern web systems, TypeScript, and cloud-ready architectures. Actively completing Naan Mudhalvan skill certifications.',
  lastUpdated: '2026-03-29',
};

// Cohort aggregated data for Faculty/Admin Portal
export const ADMIN_COHORT_SUMMARY = {
  totalStudents: 142,
  activeStudents: 128,
  profilesCompleted: 116,
  assessmentParticipationRate: 88, // %
  averageCompetencyScore: 68.4,
  averageCareerReadiness: 62.1,
  studentsNeedingSupport: 24,
  materialsAssignedCount: 18,
  commonSkillGaps: [
    { skill: 'Relational Databases & SQL', affectedCount: 42, severity: 'High', avgScore: 54 },
    { skill: 'Cloud & Infrastructure', affectedCount: 36, severity: 'Medium', avgScore: 58 },
    { skill: 'Problem Solving & DSA', affectedCount: 28, severity: 'Medium', avgScore: 64 },
    { skill: 'System Design Principles', affectedCount: 22, severity: 'Low', avgScore: 66 },
  ],
  departmentBreakdown: [
    { department: 'Computer Science (CSE)', count: 68, avgScore: 72.5, readiness: 68.2 },
    { department: 'Information Tech (IT)', count: 44, avgScore: 69.1, readiness: 64.0 },
    { department: 'Electronics & Comm (ECE)', count: 30, avgScore: 61.8, readiness: 54.5 },
  ],
  scoreDistribution: [
    { range: '90-100% (Expert)', students: 14 },
    { range: '75-89% (Proficient)', students: 58 },
    { range: '60-74% (Developing)', students: 46 },
    { range: '< 60% (Needs Support)', students: 24 },
  ],
  recentAssessments: [
    { studentName: 'Preethi S.', regNo: '710022104042', dept: 'CSE', score: 74, date: '2026-03-25', status: 'Completed', keyGap: 'SQL Databases' },
    { studentName: 'Karthik R.', regNo: '710022104028', dept: 'IT', score: 68, date: '2026-03-24', status: 'Completed', keyGap: 'Cloud Basics' },
    { studentName: 'Ananya M.', regNo: '710022104015', dept: 'CSE', score: 88, date: '2026-03-23', status: 'Completed', keyGap: 'None (Honor)' },
    { studentName: 'Vignesh K.', regNo: '710022104058', dept: 'ECE', score: 58, date: '2026-03-22', status: 'Completed', keyGap: 'Programming & Logic' },
    { studentName: 'Deepa T.', regNo: '710022104019', dept: 'IT', score: 71, date: '2026-03-21', status: 'Completed', keyGap: 'SQL Databases' },
  ]
};
