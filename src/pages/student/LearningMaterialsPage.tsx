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
  Award,
  Zap,
} from 'lucide-react';
import { learningMaterialService } from '../../services/learningMaterialService';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { LearningMaterial, CareerRole } from '../../types';
import { Badge } from '../../components/common/Badge';
import { ResourceViewerModal } from '../../components/common/ResourceViewerModal';
import { useLanguage } from '../../i18n/LanguageContext';

export const LearningMaterialsPage: React.FC = () => {
  const { t, language } = useLanguage();
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

  const filteredMaterials = materials.filter((m) => {
    const matchesType = filterType === 'All' || m.resourceType === filterType;

    let matchesSkill = true;
    if (filterSkill !== 'All') {
      matchesSkill = m.relatedSkill === filterSkill || m.competency === filterSkill;
    }

    let matchesCareer = true;
    if (activeCareer) {
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
  const progressPercent = Math.round((completedCount / Math.max(1, materials.length)) * 100);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header Banner with Naan Mudhalvan Context */}
      <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50/50 p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ta' ? 'நான் முதல்வன் கற்றல் மையம்' : 'Naan Mudhalvan Remedial Learning Hub'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('materials.pageTitle')}
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
            {t('materials.pageSubtitle')}
          </p>
        </div>

        {/* Progress Circular Pill */}
        <div className="flex items-center gap-3.5 bg-white px-5 py-3 rounded-2xl border border-slate-200/90 shadow-xs shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
              {language === 'ta' ? 'கற்றல் நிலை' : 'Learning Progress'}
            </span>
            <span className="text-sm font-extrabold text-slate-800">
              {completedCount} / {materials.length} {language === 'ta' ? 'முடிக்கப்பட்டது' : 'Finished'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Career or Skill Context Banner if Filtered */}
      {activeCareer && (
        <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 flex items-center justify-between gap-3 text-xs text-blue-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <span className="font-bold text-sm">
                {language === 'ta' ? 'தொழில் இலக்கு: ' : 'Career Target: '}
                {activeCareer.title}
              </span>
              <p className="text-[11px] text-blue-700 mt-0.5">
                {language === 'ta'
                  ? `தேவையான திறன்களுக்கான கற்றல் வளங்கள்: ${activeCareer.keySkills.join(', ')}`
                  : `Showing learning materials targeting required competencies: ${activeCareer.keySkills.join(', ')}`}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-3 py-1.5 text-xs font-semibold bg-white text-blue-800 rounded-xl border border-blue-300 hover:bg-blue-100/70 transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'வடிகட்டலை நீக்கு' : 'Clear Filter'}</span>
          </button>
        </div>
      )}

      {/* 2. Modern Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-700">{language === 'ta' ? 'வடிவம்:' : 'Format:'}</span>
          {[
            { id: 'All', label: t('common.all') },
            { id: 'PDF Notes', label: t('materials.pdfNotes') },
            { id: 'Video Lecture', label: t('materials.videos') },
            { id: 'Practice Task', label: t('materials.practiceTasks') },
            { id: 'External Guide', label: t('materials.externalGuides') },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilterType(id)}
              className={`px-3 py-1.5 rounded-xl transition-all font-semibold ${
                filterType === id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">{language === 'ta' ? 'திறன் களம்:' : 'Skill Domain:'}</span>
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
          >
            <option value="All">{language === 'ta' ? 'அனைத்து திறன்கள்' : 'All Skills'}</option>
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
              className="text-xs text-rose-600 hover:underline font-bold ml-1"
            >
              {language === 'ta' ? 'மீட்டமை' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* 3. Course / Material Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMaterials.map((mat) => {
          const isDone = mat.isCompletedByCurrentStudent;

          return (
            <div
              key={mat.id}
              className={`bg-white rounded-3xl border p-6 shadow-sm transition-all flex flex-col justify-between hover:shadow-md ${
                isDone
                  ? 'border-emerald-300/80 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                {/* Top Tags Bar */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t('materials.completedTag')}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{t('materials.pendingTag')}</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                      {mat.resourceType === 'PDF Notes' && <FileText className="w-3.5 h-3.5 text-rose-500" />}
                      {mat.resourceType === 'Video Lecture' && <Video className="w-3.5 h-3.5 text-blue-500" />}
                      {mat.resourceType === 'Practice Task' && <Code2 className="w-3.5 h-3.5 text-amber-500" />}
                      {mat.resourceType === 'External Guide' && <BookOpen className="w-3.5 h-3.5 text-teal-500" />}
                      <span>{mat.resourceType}</span>
                    </span>
                  </div>

                  {mat.fileSizeOrDuration && (
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      ⏱️ {mat.fileSizeOrDuration}
                    </span>
                  )}
                </div>

                {/* Course Title & Description */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {mat.description}
                </p>

                {/* Skill & TNSDC Attribution */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-1 rounded-lg font-semibold">
                    🎯 Domain: {mat.relatedSkill}
                  </span>
                  <span className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-medium">
                    🏛️ {language === 'ta' ? 'பேராசிரியர்:' : 'Faculty:'} {mat.uploaderName}
                  </span>
                </div>

                {mat.deadline && (
                  <div className="mt-3 text-[11px] text-rose-700 font-semibold flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200/60 w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'இலக்கு தேதி: ' : 'Target Deadline: '}{mat.deadline}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenMaterial(mat)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('materials.openResource')}</span>
                </button>

                <button
                  onClick={() => handleToggle(mat.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isDone
                      ? (language === 'ta' ? 'முடிவடையாததாகக் குறி' : 'Mark Incomplete')
                      : (language === 'ta' ? 'முடிந்ததாகக் குறி ✓' : 'Mark Completed ✓')}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs space-y-3 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-bold text-slate-800 text-sm">
            {language === 'ta' ? 'வடிகட்டலுக்கு ஏற்ற கற்றல் வளங்கள் எதுவும் கிடைக்கவில்லை.' : 'No learning materials found for this filter criteria.'}
          </p>
          <p className="text-slate-500">
            {language === 'ta' ? 'வேறு பிரிவை தேர்ந்தெடுக்கவும் அல்லது வடிகட்டல்களை நீக்கவும்.' : 'Try selecting another domain or clearing your filters.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            {language === 'ta' ? 'வடிகட்டல்களை மீட்டமைத்து அனைத்தையும் பார்' : 'Reset Filters & View All'}
          </button>
        </div>
      )}

      {/* In-App Dedicated Resource Viewer Modal */}
      <ResourceViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        material={viewerMaterial}
        onToggleComplete={handleToggle}
      />
    </div>
  );
};
