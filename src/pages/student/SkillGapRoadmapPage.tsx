import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  Target,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { learningMaterialService } from '../../services/learningMaterialService';
import { Badge } from '../../components/common/Badge';
import { ResourceViewerModal } from '../../components/common/ResourceViewerModal';
import { LearningMaterial } from '../../types';
import { CAREER_ROADMAPS } from '../../data/careerRoadmaps';
import { useLanguage } from '../../i18n/LanguageContext';

export const SkillGapRoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t, getSeverityName } = useLanguage();

  const careerParam = searchParams.get('career') || 'career-1';
  const [selectedCareerId, setSelectedCareerId] = useState<string>(careerParam);
  const [skillGaps, setSkillGaps] = useState(studentService.getSkillGaps());
  const [roadmapDef, setRoadmapDef] = useState(studentService.getRoadmapDefinition(selectedCareerId));

  // In-app resource viewer modal state
  const [viewerMaterial, setViewerMaterial] = useState<LearningMaterial | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (careerParam && CAREER_ROADMAPS[careerParam]) {
      setSelectedCareerId(careerParam);
    }
  }, [careerParam]);

  useEffect(() => {
    const update = () => {
      setSkillGaps(studentService.getSkillGaps());
      setRoadmapDef(studentService.getRoadmapDefinition(selectedCareerId));
    };

    update();
    const unsub = studentService.subscribe(update);
    return unsub;
  }, [selectedCareerId]);

  const handleCareerChange = (newCareerId: string) => {
    setSelectedCareerId(newCareerId);
    setSearchParams({ career: newCareerId });
    setRoadmapDef(studentService.getRoadmapDefinition(newCareerId));
  };

  const handleToggleActivity = (id: string) => {
    studentService.toggleRoadmapActivity(id, selectedCareerId);
    setRoadmapDef(studentService.getRoadmapDefinition(selectedCareerId));
  };

  const handleOpenActivityResource = (resourceId?: string, competency?: string) => {
    const allMaterials = learningMaterialService.getAllMaterials();
    let target = resourceId ? allMaterials.find((m) => m.id === resourceId) : null;
    if (!target && competency) {
      target = allMaterials.find((m) => m.relatedSkill === competency || m.competency === competency) || null;
    }
    if (target) {
      setViewerMaterial(target);
      setIsViewerOpen(true);
    } else {
      navigate(`/student/learning-materials?skill=${encodeURIComponent(competency || '')}`);
    }
  };

  const roadmapActivities = roadmapDef.activities;
  const completedActivities = roadmapActivities.filter((r) => r.isCompleted).length;
  const progressPercent = Math.round(
    (completedActivities / Math.max(1, roadmapActivities.length)) * 100
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('roadmap.pageTitle')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('roadmap.pageSubtitle')}
          </p>
        </div>

        {/* Career Pathway Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
          <Target className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="text-xs font-semibold text-slate-700">{t('roadmap.selectCareer')}</span>
          <select
            value={selectedCareerId}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="text-xs font-bold text-blue-900 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            {Object.entries(CAREER_ROADMAPS).map(([id, def]) => (
              <option key={id} value={id}>
                {def.careerTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Identified Technical Gaps Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t('student.criticalGaps')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t('student.gapAttentionSubtitle')}
            </p>
          </div>
          <Badge variant="warning" size="sm">
            {language === 'ta' ? `${skillGaps.length} இடைவெளிகள்` : `${skillGaps.length} Actionable Items`}
          </Badge>
        </div>

        <div className="space-y-3">
          {skillGaps.map((gap) => (
            <div
              key={gap.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{gap.skillName}</h3>
                    <Badge
                      variant={
                        gap.severity === 'Critical'
                          ? 'danger'
                          : gap.severity === 'Moderate'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {getSeverityName(gap.severity)}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{gap.recommendedAction}</p>
                </div>

                <div className="text-left sm:text-right bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {language === 'ta' ? 'மதிப்பெண் இடைவெளி' : 'Score Differential'}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    <span className="text-rose-600">{gap.currentScore}%</span> / {language === 'ta' ? 'இலக்கு:' : 'Target:'} {gap.targetScore}%
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold block">(-{gap.gapDifference}%)</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  {language === 'ta' ? '🏛️ பேராசிரியரால் தீர்வுப் பாடங்கள் ஒதுக்கப்பட்டுள்ளன' : 'Remedial materials assigned by Faculty'}
                </span>
                <button
                  onClick={() => navigate(`/student/learning-materials?skill=${encodeURIComponent(gap.skillName)}`)}
                  className="text-blue-700 hover:underline font-semibold flex items-center gap-1 text-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('student.openMaterial')}</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career-Specific Milestone Roadmap */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-700" />
              <h2 className="text-sm font-bold text-slate-900">
                {roadmapDef.careerTitle} • {t('roadmap.weeksProgress')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
              {roadmapDef.description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
            <span className="text-xs text-slate-500">{language === 'ta' ? 'முன்னேற்றம்:' : 'Progress:'}</span>
            <span className="text-xs font-bold text-blue-900">{progressPercent}%</span>
            <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recommended Next Steps */}
        {roadmapDef.recommendedNextSteps && roadmapDef.recommendedNextSteps.length > 0 && (
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-blue-950">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட அடுத்த கட்ட நடவடிக்கைகள்:' : 'Recommended Next Action Steps:'}
            </span>
            <ul className="list-disc list-inside text-[11px] text-blue-800 space-y-0.5">
              {roadmapDef.recommendedNextSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Roadmap Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
          {roadmapActivities.map((act) => (
            <div key={act.id} className="relative">
              {/* Timeline marker toggle button */}
              <button
                type="button"
                onClick={() => handleToggleActivity(act.id)}
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  act.isCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                    : 'bg-white border-slate-300 text-slate-400 hover:border-blue-600'
                }`}
                title="Click to toggle milestone completion"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  act.isCompleted
                    ? 'bg-emerald-50/20 border-emerald-200/60'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{act.title}</span>
                    <Badge variant={act.isCompleted ? 'success' : 'neutral'} size="sm">
                      {act.resourceType}
                    </Badge>
                  </div>
                  {act.dueDate && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t('roadmap.dueDate', 'Due: {date}', { date: act.dueDate })}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{act.description}</p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleActivity(act.id)}
                    className={`font-semibold text-[11px] transition-colors ${
                      act.isCompleted ? 'text-emerald-700 hover:underline' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {act.isCompleted
                      ? (language === 'ta' ? '✓ முடிந்தது (மீட்டமைக்க கிளிக் செய்யவும்)' : '✓ Completed (Click to undo)')
                      : (language === 'ta' ? '○ முடிந்ததாகக் குறிக்க கிளிக் செய்க' : '○ Click to mark complete')}
                  </button>

                  <div className="flex items-center gap-2">
                    {act.resourceType === 'Re-assessment' ? (
                      <button
                        onClick={() => navigate('/student/assessment')}
                        className="px-3 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold flex items-center gap-1 text-[11px] shadow-2xs transition-colors"
                      >
                        <FileCheck2 className="w-3 h-3" />
                        <span>{t('student.takeAssessmentBtn')}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenActivityResource(act.resourceId, act.competency)}
                        className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1 text-[11px] border border-blue-200 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{t('roadmap.launchResource')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-App Resource Viewer Modal */}
      <ResourceViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        material={viewerMaterial}
      />
    </div>
  );
};
