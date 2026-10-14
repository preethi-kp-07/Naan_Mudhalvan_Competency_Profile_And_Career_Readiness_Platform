import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Video,
  Code2,
} from 'lucide-react';
import { learningMaterialService } from '../../services/learningMaterialService';
import { adminService } from '../../services/adminService';
import { LearningMaterial } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const LearningMaterialManagementPage: React.FC = () => {
  const [materials, setMaterials] = useState<LearningMaterial[]>(learningMaterialService.getAllMaterials());
  const students = adminService.getStudents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);
  const [assignStudentId, setAssignStudentId] = useState('user-stu-1'); // Default to Preethi S.
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    resourceType: 'PDF Notes' as 'PDF Notes' | 'Video Lecture' | 'Practice Task' | 'External Guide',
    relatedSkill: 'Relational Databases & SQL',
    competency: 'Relational Databases & SQL',
    url: '',
    fileSizeOrDuration: '2.5 MB PDF Document',
    targetAudience: 'Individual Intervention' as 'All' | 'Batch 2026' | 'Individual Intervention',
    assignedStudentId: 'user-stu-1', // Default Preethi S.
    deadline: '2026-04-20',
  });

  const loadData = () => {
    setMaterials(learningMaterialService.getAllMaterials());
  };

  useEffect(() => {
    loadData();
    const unsub = learningMaterialService.subscribe(loadData);
    return unsub;
  }, []);

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title) return;

    const created = learningMaterialService.addMaterial({
      title: newResource.title,
      description: newResource.description,
      resourceType: newResource.resourceType,
      relatedSkill: newResource.relatedSkill,
      competency: newResource.competency,
      url: newResource.url || 'https://skilldevelopment.tn.gov.in/resources/sql-mastery',
      fileSizeOrDuration: newResource.fileSizeOrDuration,
      uploaderName: 'Dr. S. Sundaram (Faculty/Admin)',
      targetAudience: newResource.targetAudience,
      assignedStudentIds: [newResource.assignedStudentId],
      deadline: newResource.deadline,
    });

    setIsModalOpen(false);
    setSuccessBanner(
      `Resource "${created.title}" successfully created and assigned to Preethi S.!`
    );
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const handleOpenAssignModal = (mat: LearningMaterial) => {
    setSelectedMaterial(mat);
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    learningMaterialService.assignMaterialToStudent(selectedMaterial.id, assignStudentId);
    setIsAssignModalOpen(false);

    const targetStudent = students.find((s) => s.id === assignStudentId);
    setSuccessBanner(
      `Assigned "${selectedMaterial.title}" to ${targetStudent?.name || 'Selected Student'}.`
    );
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this learning material?')) {
      learningMaterialService.deleteMaterial(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Learning Material & Intervention Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload curated notes, assignments, and assign remedial resources directly to students
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload & Assign Material</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Connected Student-Faculty Flow Callout Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-blue-950">
          <Sparkles className="w-4 h-4 text-blue-700" />
          <span>Verified Student–Faculty Workflow Active</span>
        </div>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          When you upload or assign a resource here (e.g., assigning a SQL Guide to Preethi S.), it <strong>instantly appears</strong> in Preethi's Student Dashboard and Learning Materials portal. You can switch to the Student role at the top right to verify!
        </p>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>Active Learning Resources Library ({materials.length})</span>
          </span>
          <span className="text-xs text-slate-400 font-normal">Connected Mock State</span>
        </h2>

        <div className="space-y-4">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {mat.resourceType}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    {mat.relatedSkill}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">Audience: {mat.targetAudience}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{mat.title}</h3>
                <p className="text-slate-600 line-clamp-2">{mat.description}</p>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                  <span>Uploaded: {mat.assignedDate}</span>
                  {mat.deadline && <span className="text-rose-700 font-medium">• Due: {mat.deadline}</span>}
                  <span>• {mat.fileSizeOrDuration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleOpenAssignModal(mat)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Assign to Student</span>
                </button>

                <button
                  onClick={() => handleDelete(mat.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Modal for Uploading New Resource */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload & Assign Learning Material">
        <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Resource Title *</label>
            <input
              type="text"
              required
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              placeholder="e.g. Advanced SQL Joins and Query Optimization Notes"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Description & Learning Objectives</label>
            <textarea
              rows={2}
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              placeholder="Describe the topics covered and why this addresses their skill gap..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Resource Type *</label>
              <select
                value={newResource.resourceType}
                onChange={(e) => setNewResource({ ...newResource, resourceType: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="PDF Notes">PDF Notes</option>
                <option value="Video Lecture">Video Lecture</option>
                <option value="Practice Task">Practice Task</option>
                <option value="External Guide">External Guide</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Competency *</label>
              <select
                value={newResource.relatedSkill}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    relatedSkill: e.target.value,
                    competency: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Relational Databases & SQL">Relational Databases & SQL</option>
                <option value="Programming & Logic">Programming & Logic</option>
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Problem Solving & DSA">Problem Solving & DSA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Student *</label>
              <select
                value={newResource.assignedStudentId}
                onChange={(e) => setNewResource({ ...newResource, assignedStudentId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.registerNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Deadline</label>
              <input
                type="date"
                value={newResource.deadline}
                onChange={(e) => setNewResource({ ...newResource, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Resource URL / Link</label>
            <input
              type="text"
              value={newResource.url}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              placeholder="https://skilldevelopment.tn.gov.in/resources/sql-guide.pdf"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Publish & Assign
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal for Assigning Existing Resource to another Student */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign Resource to Student">
        <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">Selected Resource</span>
            <p className="font-bold text-slate-800 mt-0.5">{selectedMaterial?.title}</p>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Select Student to Assign *</label>
            <select
              value={assignStudentId}
              onChange={(e) => setAssignStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — Reg: {s.registerNumber} ({s.department})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAssignModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
