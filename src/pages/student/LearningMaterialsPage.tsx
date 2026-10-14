import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Video,
  Code2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Filter,
  User,
  Calendar,
  Eye,
  Sparkles,
  X,
  Target,
} from 'lucide-react';
import { learningMaterialService } from '../../services/learningMaterialService';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { LearningMaterial, CareerRole } from '../../types';
import { Badge } from '../../components/common/Badge';
import { ResourceViewerModal } from '../../components/common/ResourceViewerModal';

export const LearningMaterialsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSkill = searchParams.get('skill');
  const urlCareerId = searchParams.get('career');

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterSkill, setFilterSkill] = useState<string>(urlSkill || 'All');
  const [activeCareer, setActiveCareer] = useState<CareerRole | null>(null);

  // Resource Viewer Modal
  const [viewerMaterial, setViewerMaterial] = useState<LearningMaterial | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const loadData = () => {
    setMaterials(learningMaterialService.getMaterialsForStudent(user?.id || 'user-stu-1'));
  };

  useEffect(() => {
    loadData();
    const unsub = learningMaterialService.subscribe(loadData);
    return unsub;
  }, [user]);

  useEffect(() => {
    if (urlSkill) {
      setFilterSkill(urlSkill);
    }
  }, [urlSkill]);

  useEffect(() => {
    if (urlCareerId) {
      const careers = studentService.getCareerRoles();
      const matched = careers.find((c) => c.id === urlCareerId);
      if (matched) {
        setActiveCareer(matched);
      }
    } else {
      setActiveCareer(null);
    }
  }, [urlCareerId]);

  const handleToggle = (id: string) => {
    learningMaterialService.toggleCompletion(id);
    loadData();
    if (viewerMaterial && viewerMaterial.id === id) {
      setViewerMaterial({
        ...viewerMaterial,
        isCompletedByCurrentStudent: !viewerMaterial.isCompletedByCurrentStudent,
      });
    }
  };

  const handleOpenMaterial = (mat: LearningMaterial) => {
    setViewerMaterial(mat);
    setIsViewerOpen(true);
  };

  const handleClearFilters = () => {
    setFilterType('All');
    setFilterSkill('All');
    setActiveCareer(null);
    setSearchParams({});
  };

  // Filter logic: accounts for resourceType, skill, and optional career-specific skills
  const filteredMaterials = materials.filter((m) => {
    const matchesType = filterType === 'All' || m.resourceType === filterType;

    let matchesSkill = true;
    if (filterSkill !== 'All') {
      matchesSkill = m.relatedSkill === filterSkill || m.competency === filterSkill;
    }

    let matchesCareer = true;
    if (activeCareer) {
      // Check if material's related skill matches any key skills of the career or requiredCompetencies
      const careerSkills = [
        ...activeCareer.keySkills.map((s) => s.toLowerCase()),
        ...Object.keys(activeCareer.requiredCompetencies).map((c) => c.toLowerCase()),
      ];
      const matSkillLower = m.relatedSkill.toLowerCase();
      const matCompLower = m.competency.toLowerCase();

      matchesCareer =
        careerSkills.some((cs) => matSkillLower.includes(cs) || cs.includes(matSkillLower)) ||
        careerSkills.some((cs) => matCompLower.includes(cs) || cs.includes(matCompLower));
    }

    return matchesType && matchesSkill && matchesCareer;
  });

  const completedCount = materials.filter((m) => m.isCompletedByCurrentStudent).length;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty-Assigned Learning Materials</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional remedial modules, lab tasks, and verified lecture resources managed by your department faculty
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Your Progress</span>
            <span className="text-xs font-bold text-slate-800">
              {completedCount} of {materials.length} Completed
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">
            {Math.round((completedCount / Math.max(1, materials.length)) * 100)}%
          </div>
        </div>
      </div>

      {/* Career or Skill Context Banner if Filtered */}
      {activeCareer && (
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-blue-700 shrink-0" />
            <div>
              <span className="font-bold">Career-Filtered Recommendations: {activeCareer.title}</span>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Showing learning materials targeting required competencies: {activeCareer.keySkills.join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-800 rounded-lg border border-blue-300 hover:bg-blue-100/70 transition-colors flex items-center gap-1 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-700">Filter By Resource:</span>
          {['All', 'PDF Notes', 'Video Lecture', 'Practice Task', 'External Guide'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                filterType === type
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Skill:</span>
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs"
          >
            <option value="All">All Skills</option>
            <option value="Relational Databases & SQL">Relational Databases & SQL</option>
            <option value="Web & API Engineering">Web & API Engineering</option>
            <option value="Programming & Logic">Programming & Logic</option>
            <option value="Problem Solving & DSA">Problem Solving & DSA</option>
            <option value="Professional Communication">Professional Communication</option>
            <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
          </select>

          {(filterSkill !== 'All' || filterType !== 'All' || activeCareer) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-600 hover:underline font-semibold ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => {
          const isDone = mat.isCompletedByCurrentStudent;

          return (
            <div
              key={mat.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs transition-all flex flex-col justify-between ${
                isDone
                  ? 'border-emerald-200/80 bg-emerald-50/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={isDone ? 'success' : 'warning'} size="sm">
                    {isDone ? 'Completed' : 'Pending Study'}
                  </Badge>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    {mat.resourceType === 'PDF Notes' && <FileText className="w-3.5 h-3.5 text-rose-500" />}
                    {mat.resourceType === 'Video Lecture' && <Video className="w-3.5 h-3.5 text-blue-500" />}
                    {mat.resourceType === 'Practice Task' && <Code2 className="w-3.5 h-3.5 text-amber-500" />}
                    {mat.resourceType === 'External Guide' && <BookOpen className="w-3.5 h-3.5 text-teal-500" />}
                    {mat.resourceType}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2.5">{mat.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mat.description}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
                  <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">
                    Skill: {mat.relatedSkill}
                  </span>
                  {mat.fileSizeOrDuration && (
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                      {mat.fileSizeOrDuration}
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Assigned By: <strong>{mat.uploaderName}</strong></span>
                  </div>
                  {mat.deadline && (
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Target Deadline: {mat.deadline}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Opens in-app modal (Requirement 7) */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenMaterial(mat)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Learning Material</span>
                </button>

                <button
                  onClick={() => handleToggle(mat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Mark Incomplete' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs space-y-3">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-semibold text-slate-700">No learning materials found for this filter criteria.</p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            Reset Filters & View All Materials
          </button>
        </div>
      )}

      {/* In-App Dedicated Resource Viewer Modal (Requirement 7) */}
      <ResourceViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        material={viewerMaterial}
        onToggleComplete={handleToggle}
      />
    </div>
  );
};
