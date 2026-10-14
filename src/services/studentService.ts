import {
  StudentProfile,
  NaanMudhalvanRecord,
  StudentSkill,
  Certification,
  StudentProject,
  Internship,
  CompetencyScore,
  CareerRole,
  SkillGapItem,
  RoadmapActivity,
  SkillPassport
} from '../types';

import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_NAAN_MUDHALVAN_RECORDS,
  INITIAL_STUDENT_SKILLS,
  INITIAL_CERTIFICATIONS,
  INITIAL_PROJECTS,
  INITIAL_INTERNSHIPS,
  INITIAL_COMPETENCY_SCORES,
  INITIAL_CAREER_ROLES,
  INITIAL_SKILL_GAPS,
  INITIAL_ROADMAP_ACTIVITIES,
  INITIAL_SKILL_PASSPORT
} from '../data/mockData';

import {
  CAREER_ROADMAPS,
  CareerRoadmapDefinition
} from '../data/careerRoadmaps';

const STORAGE_KEYS = {
  PROFILE: 'nm_student_profile',
  NM_RECORDS: 'nm_learning_records',
  SKILLS: 'nm_student_skills',
  CERTS: 'nm_student_certs',
  PROJECTS: 'nm_student_projects',
  INTERNSHIPS: 'nm_student_internships',
  COMPETENCIES: 'nm_student_competencies',
  ROADMAP: 'nm_student_roadmap',
  PASSPORT: 'nm_student_passport',
};

class StudentService {
  private profile: StudentProfile;
  private nmRecords: NaanMudhalvanRecord[];
  private skills: StudentSkill[];
  private certs: Certification[];
  private projects: StudentProject[];
  private internships: Internship[];
  private competencies: CompetencyScore[];
  private roadmap: RoadmapActivity[];
  private passport: SkillPassport;
  private listeners: Array<() => void> = [];

  constructor() {
    this.profile = this.getStored(STORAGE_KEYS.PROFILE, INITIAL_STUDENT_PROFILE);
    this.nmRecords = this.getStored(STORAGE_KEYS.NM_RECORDS, INITIAL_NAAN_MUDHALVAN_RECORDS);
    this.skills = this.getStored(STORAGE_KEYS.SKILLS, INITIAL_STUDENT_SKILLS);
    this.certs = this.getStored(STORAGE_KEYS.CERTS, INITIAL_CERTIFICATIONS);
    this.projects = this.getStored(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    this.internships = this.getStored(STORAGE_KEYS.INTERNSHIPS, INITIAL_INTERNSHIPS);
    this.competencies = this.getStored(STORAGE_KEYS.COMPETENCIES, INITIAL_COMPETENCY_SCORES);
    this.roadmap = this.getStored(STORAGE_KEYS.ROADMAP, INITIAL_ROADMAP_ACTIVITIES);
    this.passport = this.getStored(STORAGE_KEYS.PASSPORT, INITIAL_SKILL_PASSPORT);
  }

  private getStored<T>(key: string, fallback: T): T {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return fallback;
      }
    }
    return fallback;
  }

  private save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  // Profile
  public getProfile(): StudentProfile {
    return { ...this.profile };
  }

  public updateProfile(updated: Partial<StudentProfile>): StudentProfile {
    this.profile = { ...this.profile, ...updated };
    this.save(STORAGE_KEYS.PROFILE, this.profile);
    return this.profile;
  }

  // Naan Mudhalvan Records
  public getNaanMudhalvanRecords(): NaanMudhalvanRecord[] {
    return [...this.nmRecords];
  }

  public addNaanMudhalvanRecord(record: Omit<NaanMudhalvanRecord, 'id'>): NaanMudhalvanRecord {
    const newRecord: NaanMudhalvanRecord = {
      ...record,
      id: `nm-${Date.now()}`
    };
    this.nmRecords.unshift(newRecord);
    this.save(STORAGE_KEYS.NM_RECORDS, this.nmRecords);
    return newRecord;
  }

  public deleteNaanMudhalvanRecord(id: string): void {
    this.nmRecords = this.nmRecords.filter(r => r.id !== id);
    this.save(STORAGE_KEYS.NM_RECORDS, this.nmRecords);
  }

  // Skills
  public getSkills(): StudentSkill[] {
    return [...this.skills];
  }

  public addSkill(skill: Omit<StudentSkill, 'id'>): StudentSkill {
    const newSkill: StudentSkill = {
      ...skill,
      id: `skill-${Date.now()}`
    };
    this.skills.unshift(newSkill);
    this.save(STORAGE_KEYS.SKILLS, this.skills);
    return newSkill;
  }

  public deleteSkill(id: string): void {
    this.skills = this.skills.filter(s => s.id !== id);
    this.save(STORAGE_KEYS.SKILLS, this.skills);
  }

  // Certifications
  public getCertifications(): Certification[] {
    return [...this.certs];
  }

  public addCertification(cert: Omit<Certification, 'id'>): Certification {
    const newCert: Certification = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    this.certs.unshift(newCert);
    this.save(STORAGE_KEYS.CERTS, this.certs);
    return newCert;
  }

  public deleteCertification(id: string): void {
    this.certs = this.certs.filter(c => c.id !== id);
    this.save(STORAGE_KEYS.CERTS, this.certs);
  }

  // Projects
  public getProjects(): StudentProject[] {
    return [...this.projects];
  }

  public addProject(proj: Omit<StudentProject, 'id'>): StudentProject {
    const newProj: StudentProject = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    this.projects.unshift(newProj);
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
    return newProj;
  }

  public deleteProject(id: string): void {
    this.projects = this.projects.filter(p => p.id !== id);
    this.save(STORAGE_KEYS.PROJECTS, this.projects);
  }

  // Internships
  public getInternships(): Internship[] {
    return [...this.internships];
  }

  public addInternship(intern: Omit<Internship, 'id'>): Internship {
    const newIntern: Internship = {
      ...intern,
      id: `intern-${Date.now()}`
    };
    this.internships.unshift(newIntern);
    this.save(STORAGE_KEYS.INTERNSHIPS, this.internships);
    return newIntern;
  }

  public updateInternship(id: string, updated: Partial<Internship>): Internship | null {
    const index = this.internships.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.internships[index] = {
      ...this.internships[index],
      ...updated
    };
    this.save(STORAGE_KEYS.INTERNSHIPS, this.internships);
    return this.internships[index];
  }

  public deleteInternship(id: string): void {
    this.internships = this.internships.filter(i => i.id !== id);
    this.save(STORAGE_KEYS.INTERNSHIPS, this.internships);
  }

  // Competency Scores
  public getCompetencies(): CompetencyScore[] {
    return [...this.competencies];
  }

  public updateCompetencyScore(competencyName: string, newScore: number): void {
    const target = this.competencies.find(c => c.competency === competencyName);
    if (target) {
      target.score = newScore;
      target.level = newScore >= 85 ? 'Expert' : newScore >= 75 ? 'Advanced' : newScore >= 60 ? 'Proficient' : 'Developing';
      target.lastAssessed = new Date().toISOString().split('T')[0];
      this.save(STORAGE_KEYS.COMPETENCIES, this.competencies);
    }
  }

  // Career Roles
  public getCareerRoles(): CareerRole[] {
    return INITIAL_CAREER_ROLES.map(role => {
      // Dynamic recalculation based on current student competencies
      const matchEntries = Object.entries(role.requiredCompetencies);
      let totalMatch = 0;
      let readinessAcc = 0;

      matchEntries.forEach(([comp, target]) => {
        const studentComp = this.competencies.find(c => c.competency === comp);
        const score = studentComp ? studentComp.score : 50;
        // Vector cosine similarity ratio simulation
        const ratio = Math.min(score / target, 1.0);
        totalMatch += ratio;

        // Transparent readiness rule threshold: must be >= 90% of target to count as ready
        if (score >= target * 0.9) {
          readinessAcc += 1;
        } else if (score >= target * 0.7) {
          readinessAcc += 0.5;
        }
      });

      const fitPercentage = Math.round((totalMatch / matchEntries.length) * 100);
      const readinessPercentage = Math.round((readinessAcc / matchEntries.length) * 100);

      return {
        ...role,
        fitPercentage,
        readinessPercentage,
      };
    });
  }

  // Skill Gaps
  public getSkillGaps(): SkillGapItem[] {
    return INITIAL_SKILL_GAPS.map(gap => {
      const studentComp = this.competencies.find(c => c.competency === gap.competency);
      const currentScore = studentComp ? studentComp.score : gap.currentScore;
      const gapDiff = Math.max(0, gap.targetScore - currentScore);
      return {
        ...gap,
        currentScore,
        gapDifference: gapDiff,
        severity: gapDiff > 20 ? 'Critical' : gapDiff > 10 ? 'Moderate' : 'Minor',
      };
    });
  }

  // Roadmap
  public getRoadmap(careerId?: string): RoadmapActivity[] {
    const targetCareer = careerId && CAREER_ROADMAPS[careerId] ? careerId : 'career-1';
    const def = CAREER_ROADMAPS[targetCareer];
    const completedMap = this.getStored<Record<string, boolean>>('nm_roadmap_completed_map', {});

    if (def) {
      return def.activities.map(a => ({
        ...a,
        isCompleted: completedMap[a.id] !== undefined ? completedMap[a.id] : a.isCompleted
      }));
    }
    return [...this.roadmap];
  }

  public getRoadmapDefinition(careerId?: string): CareerRoadmapDefinition {
    const targetCareer = careerId && CAREER_ROADMAPS[careerId] ? careerId : 'career-1';
    const def = CAREER_ROADMAPS[targetCareer] || CAREER_ROADMAPS['career-1'];
    const activities = this.getRoadmap(targetCareer);
    return {
      ...def,
      activities
    };
  }

  public toggleRoadmapActivity(id: string, careerId?: string): void {
    const completedMap = this.getStored<Record<string, boolean>>('nm_roadmap_completed_map', {});
    // Check current state from getRoadmap
    const currentActivities = this.getRoadmap(careerId);
    const target = currentActivities.find(a => a.id === id);
    if (target) {
      completedMap[id] = !target.isCompleted;
      this.save('nm_roadmap_completed_map', completedMap);
    } else {
      const act = this.roadmap.find(a => a.id === id);
      if (act) {
        act.isCompleted = !act.isCompleted;
        this.save(STORAGE_KEYS.ROADMAP, this.roadmap);
      }
    }
  }

  // Skill Passport
  public getSkillPassport(): SkillPassport {
    return { ...this.passport };
  }

  public updateSkillPassport(updated: Partial<SkillPassport>): SkillPassport {
    this.passport = { ...this.passport, ...updated };
    this.save(STORAGE_KEYS.PASSPORT, this.passport);
    return this.passport;
  }
}

export const studentService = new StudentService();
