import { ADMIN_COHORT_SUMMARY } from '../data/mockData';
import { learningMaterialService } from './learningMaterialService';

export interface AdminStudentSummary {
  id: string;
  name: string;
  registerNumber: string;
  department: string;
  yearOfStudy: number;
  assessmentStatus: 'Completed' | 'Pending' | 'In Progress';
  overallScore: number;
  mainSkillGap: string;
  learningProgress: number; // %
  assignedMaterialsCount: number;
}

const MOCK_ADMIN_STUDENTS: AdminStudentSummary[] = [
  {
    id: 'user-stu-1',
    name: 'Preethi S.',
    registerNumber: '710022104042',
    department: 'Computer Science and Engineering',
    yearOfStudy: 3,
    assessmentStatus: 'Completed',
    overallScore: 74,
    mainSkillGap: 'Relational Databases & SQL (52%)',
    learningProgress: 33,
    assignedMaterialsCount: 3,
  },
  {
    id: 'user-stu-2',
    name: 'Karthik R.',
    registerNumber: '710022104028',
    department: 'Information Technology',
    yearOfStudy: 3,
    assessmentStatus: 'Completed',
    overallScore: 68,
    mainSkillGap: 'Cloud & Infrastructure (55%)',
    learningProgress: 45,
    assignedMaterialsCount: 2,
  },
  {
    id: 'user-stu-3',
    name: 'Ananya M.',
    registerNumber: '710022104015',
    department: 'Computer Science and Engineering',
    yearOfStudy: 4,
    assessmentStatus: 'Completed',
    overallScore: 88,
    mainSkillGap: 'None (Honor Standing)',
    learningProgress: 90,
    assignedMaterialsCount: 1,
  },
  {
    id: 'user-stu-4',
    name: 'Vignesh K.',
    registerNumber: '710022104058',
    department: 'Electronics and Communication',
    yearOfStudy: 3,
    assessmentStatus: 'Completed',
    overallScore: 58,
    mainSkillGap: 'Programming & Logic (50%)',
    learningProgress: 20,
    assignedMaterialsCount: 4,
  },
  {
    id: 'user-stu-5',
    name: 'Deepa T.',
    registerNumber: '710022104019',
    department: 'Information Technology',
    yearOfStudy: 3,
    assessmentStatus: 'Completed',
    overallScore: 71,
    mainSkillGap: 'Relational Databases & SQL (54%)',
    learningProgress: 50,
    assignedMaterialsCount: 2,
  },
  {
    id: 'user-stu-6',
    name: 'Arun Kumar M.',
    registerNumber: '710022104008',
    department: 'Computer Science and Engineering',
    yearOfStudy: 2,
    assessmentStatus: 'In Progress',
    overallScore: 62,
    mainSkillGap: 'Data Structures & Algorithms',
    learningProgress: 15,
    assignedMaterialsCount: 2,
  }
];

class AdminService {
  public getCohortSummary() {
    return { ...ADMIN_COHORT_SUMMARY };
  }

  public getStudents(): AdminStudentSummary[] {
    return [...MOCK_ADMIN_STUDENTS];
  }

  public createIntervention(data: {
    title: string;
    targetCompetency: string;
    studentIds: string[];
    materialTitle: string;
    materialType: 'PDF Notes' | 'Video Lecture' | 'Practice Task' | 'External Guide';
    deadline: string;
  }): void {
    // 1. Create a learning material for the intervention
    const material = learningMaterialService.addMaterial({
      title: data.materialTitle,
      description: `Targeted intervention module created for students needing improvement in ${data.targetCompetency}.`,
      resourceType: data.materialType,
      relatedSkill: data.targetCompetency,
      competency: data.targetCompetency,
      url: 'https://skilldevelopment.tn.gov.in/interventions/remedial-module',
      fileSizeOrDuration: 'Intervention Package',
      uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
      targetAudience: 'Individual Intervention',
      assignedStudentIds: data.studentIds,
      deadline: data.deadline,
    });

    // 2. Also ensure each student has it explicitly assigned
    data.studentIds.forEach(id => {
      learningMaterialService.assignMaterialToStudent(material.id, id);
    });
  }

  public exportCohortCSV(): void {
    const headers = [
      'Register Number',
      'Student Name',
      'Department',
      'Year',
      'Assessment Status',
      'Competency Score (%)',
      'Identified Skill Gap',
      'Learning Progress (%)'
    ];

    const rows = MOCK_ADMIN_STUDENTS.map(s => [
      `"${s.registerNumber}"`,
      `"${s.name}"`,
      `"${s.department}"`,
      s.yearOfStudy,
      `"${s.assessmentStatus}"`,
      s.overallScore,
      `"${s.mainSkillGap}"`,
      `${s.learningProgress}%`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NM_Cohort_Competency_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const adminService = new AdminService();
