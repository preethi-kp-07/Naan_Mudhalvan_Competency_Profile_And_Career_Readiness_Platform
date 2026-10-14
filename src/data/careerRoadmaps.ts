import { RoadmapActivity } from '../types';

export interface CareerRoadmapDefinition {
  careerId: string;
  careerTitle: string;
  description: string;
  totalWeeks: number;
  recommendedNextSteps: string[];
  activities: RoadmapActivity[];
}

export const CAREER_ROADMAPS: Record<string, CareerRoadmapDefinition> = {
  'career-1': {
    careerId: 'career-1',
    careerTitle: 'Full Stack Software Engineer',
    description: 'Comprehensive 4-week end-to-end pathway covering web architecture, TypeScript frontend, Node.js API services, and relational database schema integration.',
    totalWeeks: 4,
    recommendedNextSteps: [
      'Complete the SQL & Relational Database Remedial Module',
      'Integrate authenticated REST endpoints with PostgreSQL in your project',
      'Retake the Competency Benchmark to verify 80%+ across Web & Databases'
    ],
    activities: [
      {
        id: 'road-fs-1',
        careerId: 'career-1',
        weekNumber: 1,
        title: 'Week 1: Modern Web Foundations, TypeScript & State Patterns',
        description: 'Master strict TypeScript interfaces, component lifecycle, custom hooks, and Tailwind CSS component systems.',
        competency: 'Web & API Engineering',
        resourceType: 'Notes',
        resourceId: 'mat-react-ts',
        isCompleted: true,
        dueDate: '2026-04-05',
      },
      {
        id: 'road-fs-2',
        careerId: 'career-1',
        weekNumber: 2,
        title: 'Week 2: Relational Databases, PostgreSQL Joins & Query Optimization',
        description: 'Tackle identified database gaps: multi-table joins, subqueries, indexing strategies, and transaction safety.',
        competency: 'Relational Databases & SQL',
        resourceType: 'Practice',
        resourceId: 'mat-1',
        isCompleted: false,
        dueDate: '2026-04-12',
      },
      {
        id: 'road-fs-3',
        careerId: 'career-1',
        weekNumber: 3,
        title: 'Week 3: Server Architecture, Express APIs & JWT Authentication',
        description: 'Construct secure RESTful endpoints with Zod validation, bcrypt password hashing, and HttpOnly session cookies.',
        competency: 'Web & API Engineering',
        resourceType: 'Video',
        resourceId: 'mat-4',
        isCompleted: false,
        dueDate: '2026-04-19',
      },
      {
        id: 'road-fs-4',
        careerId: 'career-1',
        weekNumber: 4,
        title: 'Week 4: End-to-End Full Stack Integration & Competency Re-evaluation',
        description: 'Deliver a production-ready web application connecting frontend client with PostgreSQL backend, followed by benchmark re-evaluation.',
        competency: 'Programming & Logic',
        resourceType: 'Re-assessment',
        isCompleted: false,
        dueDate: '2026-04-26',
      }
    ]
  },

  'career-2': {
    careerId: 'career-2',
    careerTitle: 'Frontend Web Specialist',
    description: 'Deep dive into performant web client engineering, accessible user interfaces (ARIA), modern state management, and Lighthouse web vitals.',
    totalWeeks: 4,
    recommendedNextSteps: [
      'Refine component accessibility compliance (ARIA & keyboard navigation)',
      'Deploy interactive web portfolio showcasing state management and animations',
      'Optimize core web vitals and bundle chunking'
    ],
    activities: [
      {
        id: 'road-fe-1',
        careerId: 'career-2',
        weekNumber: 1,
        title: 'Week 1: Advanced TypeScript & Component Architecture',
        description: 'Master generic components, design tokens, responsive layout grids, and modern CSS architecture.',
        competency: 'Web & API Engineering',
        resourceType: 'Notes',
        resourceId: 'mat-react-ts',
        isCompleted: true,
        dueDate: '2026-04-05',
      },
      {
        id: 'road-fe-2',
        careerId: 'career-2',
        weekNumber: 2,
        title: 'Week 2: Complex Client State & Asynchronous Data Fetching',
        description: 'Implement optimistic UI updates, cache invalidation, custom fetch hooks, and error boundary fallbacks.',
        competency: 'Web & API Engineering',
        resourceType: 'Practice',
        resourceId: 'mat-fe-state',
        isCompleted: true,
        dueDate: '2026-04-12',
      },
      {
        id: 'road-fe-3',
        careerId: 'career-2',
        weekNumber: 3,
        title: 'Week 3: Web Performance, Lighthouse Tuning & Accessibility',
        description: 'Eliminate render-blocking assets, optimize Largest Contentful Paint (LCP), and audit contrast ratios.',
        competency: 'Web & API Engineering',
        resourceType: 'Video',
        resourceId: 'mat-fe-perf',
        isCompleted: false,
        dueDate: '2026-04-19',
      },
      {
        id: 'road-fe-4',
        careerId: 'career-2',
        weekNumber: 4,
        title: 'Week 4: Frontend Automated Testing & UI Benchmark Assessment',
        description: 'Write unit tests for UI components and take the specialized frontend competency reassessment.',
        competency: 'Programming & Logic',
        resourceType: 'Re-assessment',
        isCompleted: false,
        dueDate: '2026-04-26',
      }
    ]
  },

  'career-3': {
    careerId: 'career-3',
    careerTitle: 'Backend & Database Engineer',
    description: 'Specialized track focusing on relational schema design, query execution plans (EXPLAIN ANALYZE), API security, and transaction concurrency.',
    totalWeeks: 4,
    recommendedNextSteps: [
      'Master PostgreSQL ACID transaction isolation levels (Serializable, Repeatable Read)',
      'Benchmark query latency before and after composite B-Tree indexes',
      'Implement structured error handling and token refresh middleware'
    ],
    activities: [
      {
        id: 'road-be-1',
        careerId: 'career-3',
        weekNumber: 1,
        title: 'Week 1: Advanced SQL, Normalization & ACID Guarantees',
        description: 'Deep dive into 3NF schema design, foreign key cascading, and database consistency locks under high concurrency.',
        competency: 'Relational Databases & SQL',
        resourceType: 'Notes',
        resourceId: 'mat-1',
        isCompleted: false,
        dueDate: '2026-04-05',
      },
      {
        id: 'road-be-2',
        careerId: 'career-3',
        weekNumber: 2,
        title: 'Week 2: Indexing Strategies & Query Execution Plans',
        description: 'Analyze EXPLAIN ANALYZE metrics, eliminate sequential table scans, and build composite B-Tree and GIN indexes.',
        competency: 'Relational Databases & SQL',
        resourceType: 'Video',
        resourceId: 'mat-2',
        isCompleted: false,
        dueDate: '2026-04-12',
      },
      {
        id: 'road-be-3',
        careerId: 'career-3',
        weekNumber: 3,
        title: 'Week 3: Robust REST APIs, JWT Security & Caching',
        description: 'Implement distributed authentication, rate limiting, and structured logging in Express.js.',
        competency: 'Web & API Engineering',
        resourceType: 'Practice',
        resourceId: 'mat-4',
        isCompleted: false,
        dueDate: '2026-04-19',
      },
      {
        id: 'road-be-4',
        careerId: 'career-3',
        weekNumber: 4,
        title: 'Week 4: Microservices Architecture & Database Capstone',
        description: 'Build a high-volume transactional backend and verify mastery through benchmark evaluation.',
        competency: 'Cloud & Infrastructure',
        resourceType: 'Re-assessment',
        isCompleted: false,
        dueDate: '2026-04-26',
      }
    ]
  },

  'career-4': {
    careerId: 'career-4',
    careerTitle: 'Data Analyst & Business Intelligence Specialist',
    description: 'Quantitative analytics roadmap covering advanced SQL data wrangling, Python Pandas transformation, statistical metrics, and automated dashboards.',
    totalWeeks: 4,
    recommendedNextSteps: [
      'Complete complex multi-table SQL aggregation challenges',
      'Build end-to-end data pipelines cleaning messy CSV datasets in Python',
      'Create interactive analytical reports highlighting key business KPIs'
    ],
    activities: [
      {
        id: 'road-da-1',
        careerId: 'career-4',
        weekNumber: 1,
        title: 'Week 1: Analytical SQL, Window Functions & Aggregations',
        description: 'Master PARTITION BY, RANK, DENSE_RANK, moving averages, and cohort retention queries.',
        competency: 'Relational Databases & SQL',
        resourceType: 'Notes',
        resourceId: 'mat-1',
        isCompleted: false,
        dueDate: '2026-04-05',
      },
      {
        id: 'road-da-2',
        careerId: 'career-4',
        weekNumber: 2,
        title: 'Week 2: Python for Data Analysis (Pandas & NumPy)',
        description: 'Clean missing data, handle date time conversions, group datasets, and compute statistical variances.',
        competency: 'Programming & Logic',
        resourceType: 'Practice',
        resourceId: 'mat-py-data',
        isCompleted: false,
        dueDate: '2026-04-12',
      },
      {
        id: 'road-da-3',
        careerId: 'career-4',
        weekNumber: 3,
        title: 'Week 3: Data Storytelling & Dashboard Visualizations',
        description: 'Craft meaningful charts and executive summaries communicating analytical insights with clarity.',
        competency: 'Professional Communication',
        resourceType: 'Video',
        resourceId: 'mat-viz-story',
        isCompleted: false,
        dueDate: '2026-04-19',
      },
      {
        id: 'road-da-4',
        careerId: 'career-4',
        weekNumber: 4,
        title: 'Week 4: Comprehensive Analytics Case Study & Re-assessment',
        description: 'Deliver actionable business intelligence findings from raw university records and complete benchmark.',
        competency: 'Problem Solving & DSA',
        resourceType: 'Re-assessment',
        isCompleted: false,
        dueDate: '2026-04-26',
      }
    ]
  },

  'career-5': {
    careerId: 'career-5',
    careerTitle: 'Software Engineer (Core Systems)',
    description: 'Foundational algorithmic engineering covering advanced data structures, algorithmic complexity, design patterns, and automated test coverage.',
    totalWeeks: 4,
    recommendedNextSteps: [
      'Solve algorithmic challenge problems on trees, graphs, and dynamic programming',
      'Apply SOLID design principles in a modular software project',
      'Automate unit testing with Jest or Vitest'
    ],
    activities: [
      {
        id: 'road-se-1',
        careerId: 'career-5',
        weekNumber: 1,
        title: 'Week 1: Data Structures Mastery (Trees, Graphs & Heaps)',
        description: 'Implement AVL trees, binary search trees, BFS/DFS graph traversals, and priority queues.',
        competency: 'Problem Solving & DSA',
        resourceType: 'Notes',
        resourceId: 'mat-dsa-trees',
        isCompleted: true,
        dueDate: '2026-04-05',
      },
      {
        id: 'road-se-2',
        careerId: 'career-5',
        weekNumber: 2,
        title: 'Week 2: Algorithmic Optimization & Dynamic Programming',
        description: 'Analyze time/space tradeoffs and solve recurrence relations, knapsack, and memoization problems.',
        competency: 'Problem Solving & DSA',
        resourceType: 'Practice',
        resourceId: 'mat-algo-dp',
        isCompleted: false,
        dueDate: '2026-04-12',
      },
      {
        id: 'road-se-3',
        careerId: 'career-5',
        weekNumber: 3,
        title: 'Week 3: Object-Oriented Design & Clean Architecture',
        description: 'Apply SOLID principles, Factory/Strategy design patterns, and write comprehensive test suites.',
        competency: 'Programming & Logic',
        resourceType: 'Video',
        resourceId: 'mat-clean-code',
        isCompleted: false,
        dueDate: '2026-04-19',
      },
      {
        id: 'road-se-4',
        careerId: 'career-5',
        weekNumber: 4,
        title: 'Week 4: Core Systems Benchmark & Re-assessment',
        description: 'Evaluate software engineering competencies across data structures and computational logic.',
        competency: 'Programming & Logic',
        resourceType: 'Re-assessment',
        isCompleted: false,
        dueDate: '2026-04-26',
      }
    ]
  }
};
