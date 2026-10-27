import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { LearningMaterial } from '../models/LearningMaterial.js';
import { CareerRole } from '../models/CareerRole.js';

export const INITIAL_SEED_USERS = [
  {
    name: 'Preethi S.',
    email: 'preethi@college.edu',
    password: 'demo123',
    role: 'student',
    registerNumber: '710022104042',
    department: 'Computer Science and Engineering',
    yearOfStudy: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Dr. S. Sundaram',
    email: 'faculty.admin@college.edu',
    password: 'demo123',
    role: 'admin',
    department: 'CSE / Career Readiness Cell',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_SEED_PROFILE = {
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
  naanMudhalvanRecords: [
    {
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
  ],
  competencies: [
    { competency: 'Programming & Logic', score: 84, targetScore: 85, level: 'Advanced' },
    { competency: 'Relational Databases & SQL', score: 52, targetScore: 80, level: 'Developing' },
    { competency: 'Problem Solving & DSA', score: 76, targetScore: 80, level: 'Proficient' },
    { competency: 'Web & API Engineering', score: 86, targetScore: 85, level: 'Advanced' },
    { competency: 'Professional Communication', score: 80, targetScore: 75, level: 'Proficient' },
    { competency: 'Cloud & Infrastructure', score: 64, targetScore: 75, level: 'Developing' },
  ],
};

export const INITIAL_SEED_QUESTIONS = [
  {
    competency: 'Programming & Logic',
    difficulty: 'Easy',
    questionText: 'In modern TypeScript, what is the core advantage of using an interface or type alias instead of the "any" type?',
    options: [
      'It increases JavaScript runtime execution speed in the V8 engine.',
      'It enforces compile-time static type safety, catching type-mismatch bugs before deployment.',
      'It automatically parses JSON responses without needing runtime checks.',
      'It reduces the final compiled bundle size by stripping variable names.'
    ],
    correctOptionIndex: 1,
    explanation: 'TypeScript interfaces and type aliases provide compile-time guarantees and IntelliSense without adding runtime bundle weight.'
  },
  {
    competency: 'Relational Databases & SQL',
    difficulty: 'Medium',
    questionText: 'In a relational database (PostgreSQL/MySQL), what is the primary operational trade-off when adding a B-Tree index to an existing table column?',
    options: [
      'It speeds up SELECT query filtering at the cost of additional disk storage and slower INSERT/UPDATE/DELETE write latency.',
      'It enforces strict database table normalization but disables concurrent transactions.',
      'It eliminates the need for foreign key constraints across relational entities.',
      'It converts non-clustered indexes directly into in-memory hash tables.'
    ],
    correctOptionIndex: 0,
    explanation: 'Indexes speed up read operations via B-Tree lookups, but every write requires updating the index structure and consumes storage.'
  },
  {
    competency: 'Web & API Engineering',
    difficulty: 'Easy',
    questionText: 'In RESTful architectural principles, which HTTP verb should be utilized for an idempotent modification that replaces an entire resource representation?',
    options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
    correctOptionIndex: 1,
    explanation: 'PUT replaces the entire resource representation idempotently. PATCH performs partial updates, and POST creates subordinate resources.'
  },
  {
    competency: 'Problem Solving & DSA',
    difficulty: 'Medium',
    questionText: 'What is the worst-case time complexity of retrieving a key from a balanced Binary Search Tree (AVL or Red-Black Tree) containing N elements?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctOptionIndex: 1,
    explanation: 'Self-balancing binary search trees maintain a maximum height proportional to log(N), guaranteeing O(log N) lookup time.'
  },
  {
    competency: 'Cloud & Infrastructure',
    difficulty: 'Medium',
    questionText: 'What is the primary role of a container runtime like Docker in modern microservices architectures?',
    options: [
      'It emulates complete hardware virtualization including custom BIOS kernels.',
      'It packages an application with all dependencies into an isolated container sharing the host kernel.',
      'It replaces database indexing with distributed disk caching.',
      'It executes code exclusively in web browser WebAssembly engines.'
    ],
    correctOptionIndex: 1,
    explanation: 'Containers package runtime, libraries, and code together, isolating execution while leveraging the host OS kernel efficiently.'
  },
  {
    competency: 'Professional Communication',
    difficulty: 'Easy',
    questionText: 'When delivering a technical presentation to cross-functional stakeholders including non-technical managers, what is the best strategy?',
    options: [
      'Use deep compiler terminology and low-level memory assembly jargon exclusively.',
      'Focus on business value, system reliability, user impact, and clear architectural diagrams.',
      'Skip demonstrations and ask non-engineers to read the GitHub pull request comments.',
      'Refuse to answer questions until the final production deployment is completed.'
    ],
    correctOptionIndex: 1,
    explanation: 'Effective technical communication bridges the gap between deep code details and broad business objectives.'
  }
];

export const INITIAL_SEED_MATERIALS = [
  {
    title: 'Advanced Relational Database Indexing & Query Optimization Guide',
    description: 'Comprehensive institutional lecture notes explaining B-Tree indexing, EXPLAIN ANALYZE interpretation, and composite key best practices.',
    resourceType: 'PDF Notes',
    relatedSkill: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    uploaderName: 'Dr. S. Sundaram',
    uploaderRole: 'Faculty / Career Readiness Lead',
    assignedToStudentIds: ['user-stu-1'],
    fileUrl: '/docs/materials/SQL_Indexing_Masterclass.pdf',
    fileSizeOrDuration: '2.4 MB (42 Pages)',
    deadline: '2026-04-15',
    completedByStudentIds: [],
  },
  {
    title: 'Modern Full-Stack Microservices & REST API Architecture',
    description: 'Recorded faculty masterclass on stateless JWT authentication, Express routing, and PostgreSQL connection pooling.',
    resourceType: 'Video Lecture',
    relatedSkill: 'Web & API Engineering',
    competency: 'Web & API Engineering',
    uploaderName: 'Dr. S. Sundaram',
    uploaderRole: 'Faculty / Career Readiness Lead',
    assignedToStudentIds: ['user-stu-1'],
    fileUrl: 'https://youtube.com/watch?v=demo_web_api',
    fileSizeOrDuration: '48 Mins (1080p HD)',
    deadline: '2026-04-20',
    completedByStudentIds: ['user-stu-1'],
  },
  {
    title: 'Docker Containerization & Linux CI/CD Pipeline Lab Task',
    description: 'Practical hands-on lab task containerizing a Node/Express backend with Docker Compose and GitHub Actions workflows.',
    resourceType: 'Practice Task',
    relatedSkill: 'Cloud & Infrastructure',
    competency: 'Cloud & Infrastructure',
    uploaderName: 'Dr. S. Sundaram',
    uploaderRole: 'Faculty / Career Readiness Lead',
    assignedToStudentIds: ['user-stu-1'],
    fileUrl: '/labs/Docker_CI_CD_HandsOn.md',
    fileSizeOrDuration: 'Lab Exercise (90 Mins)',
    deadline: '2026-04-28',
    completedByStudentIds: [],
  }
];

export const seedInitialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial Naan Mudhalvan users into MongoDB...');
      await User.insertMany(INITIAL_SEED_USERS);
      console.log('✅ Users seeded successfully!');
    }

    const questionCount = await AssessmentQuestion.countDocuments();
    if (questionCount === 0) {
      console.log('🌱 Seeding assessment questions into MongoDB...');
      await AssessmentQuestion.insertMany(INITIAL_SEED_QUESTIONS);
      console.log('✅ Questions seeded successfully!');
    }

    const materialCount = await LearningMaterial.countDocuments();
    if (materialCount === 0) {
      console.log('🌱 Seeding learning materials into MongoDB...');
      await LearningMaterial.insertMany(INITIAL_SEED_MATERIALS);
      console.log('✅ Learning materials seeded successfully!');
    }

    const profileCount = await StudentProfile.countDocuments();
    if (profileCount === 0) {
      console.log('🌱 Seeding student profile into MongoDB...');
      await StudentProfile.create(INITIAL_SEED_PROFILE);
      console.log('✅ Student profile seeded successfully!');
    }
  } catch (err) {
    console.warn('⚠️ Seeding note:', err.message);
  }
};
