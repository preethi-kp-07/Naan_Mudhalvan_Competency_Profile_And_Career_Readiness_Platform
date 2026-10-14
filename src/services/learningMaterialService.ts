import { LearningMaterial } from '../types';
import { INITIAL_LEARNING_MATERIALS } from '../data/mockData';

const MATERIALS_STORAGE_KEY = 'nm_demo_learning_materials';

class LearningMaterialService {
  private materials: LearningMaterial[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadMaterials();
  }

  private loadMaterials(): void {
    const saved = localStorage.getItem(MATERIALS_STORAGE_KEY);
    if (saved) {
      try {
        this.materials = JSON.parse(saved);
      } catch {
        this.materials = [...INITIAL_LEARNING_MATERIALS];
      }
    } else {
      this.materials = [...INITIAL_LEARNING_MATERIALS];
      this.saveMaterials();
    }
  }

  private saveMaterials(): void {
    localStorage.setItem(MATERIALS_STORAGE_KEY, JSON.stringify(this.materials));
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

  public getAllMaterials(): LearningMaterial[] {
    return [...this.materials];
  }

  public getMaterialsForStudent(studentId: string): LearningMaterial[] {
    return this.materials.filter(m => {
      if (m.targetAudience === 'All' || m.targetAudience === 'Batch 2026') return true;
      if (m.assignedStudentIds && m.assignedStudentIds.includes(studentId)) return true;
      return false;
    });
  }

  public addMaterial(newMat: Omit<LearningMaterial, 'id' | 'assignedDate'>): LearningMaterial {
    const created: LearningMaterial = {
      ...newMat,
      id: `mat-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      isCompletedByCurrentStudent: false,
    };
    this.materials.unshift(created);
    this.saveMaterials();
    return created;
  }

  public assignMaterialToStudent(materialId: string, studentId: string): void {
    const mat = this.materials.find(m => m.id === materialId);
    if (mat) {
      if (!mat.assignedStudentIds) {
        mat.assignedStudentIds = [];
      }
      if (!mat.assignedStudentIds.includes(studentId)) {
        mat.assignedStudentIds.push(studentId);
      }
      this.saveMaterials();
    }
  }

  public toggleCompletion(materialId: string): boolean {
    const mat = this.materials.find(m => m.id === materialId);
    if (mat) {
      mat.isCompletedByCurrentStudent = !mat.isCompletedByCurrentStudent;
      this.saveMaterials();
      return !!mat.isCompletedByCurrentStudent;
    }
    return false;
  }

  public deleteMaterial(materialId: string): void {
    this.materials = this.materials.filter(m => m.id !== materialId);
    this.saveMaterials();
  }
}

export const learningMaterialService = new LearningMaterialService();
