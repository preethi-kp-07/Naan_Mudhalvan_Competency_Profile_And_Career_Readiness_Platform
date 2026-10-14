import React, { useState } from 'react';
import {
  FileText,
  Video,
  Code2,
  ExternalLink,
  CheckCircle2,
  Clock,
  User,
  X,
  BookOpen,
  Copy,
  Check,
  Download,
  AlertCircle,
} from 'lucide-react';
import { LearningMaterial } from '../../types';
import { Badge } from './Badge';

interface ResourceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: LearningMaterial | null;
  onToggleComplete?: (id: string) => void;
}

export const ResourceViewerModal: React.FC<ResourceViewerModalProps> = ({
  isOpen,
  onClose,
  material,
  onToggleComplete,
}) => {
  const [copiedQuery, setCopiedQuery] = useState(false);

  if (!isOpen || !material) return null;

  const isDone = !!material.isCompletedByCurrentStudent;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-100/70 text-blue-700">
              {material.resourceType === 'PDF Notes' && <FileText className="w-5 h-5 text-rose-600" />}
              {material.resourceType === 'Video Lecture' && <Video className="w-5 h-5 text-blue-600" />}
              {material.resourceType === 'Practice Task' && <Code2 className="w-5 h-5 text-amber-600" />}
              {material.resourceType === 'External Guide' && <BookOpen className="w-5 h-5 text-teal-600" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">{material.resourceType}</Badge>
                <Badge variant="neutral" size="sm">{material.relatedSkill}</Badge>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5 line-clamp-1">{material.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Viewer Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Metadata Bar */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Assigned By: <strong>{material.uploaderName}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Assigned: {material.assignedDate}</span>
              {material.deadline && <span className="text-rose-700 font-bold ml-1">• Due: {material.deadline}</span>}
            </div>
            {material.fileSizeOrDuration && (
              <span className="font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                {material.fileSizeOrDuration}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Learning Objective & Context</h3>
            <p className="text-slate-600 leading-relaxed">{material.description}</p>
          </div>

          {/* Dedicated Viewer based on Resource Type */}
          {material.resourceType === 'PDF Notes' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 text-slate-100">
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
                <span>In-App Faculty Reader • {material.title}</span>
                <span className="text-[11px] text-slate-400">Page 1 of 8</span>
              </div>
              <div className="p-6 space-y-4 max-h-72 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-200">
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <h4 className="text-xs font-bold text-amber-300 mb-1">Module Overview: Core Theoretical Fundamentals</h4>
                  <p className="text-slate-300 font-sans">
                    {material.content || `This comprehensive tutorial notes guide has been prepared by faculty to directly target student skill gaps in ${material.relatedSkill}. Key takeaways include relational calculus, multi-table index lookups, and transaction deadlock avoidance.`}
                  </p>
                </div>

                <div className="space-y-2 text-slate-300 font-sans text-xs">
                  <h5 className="font-bold text-white">Key Concepts Covered:</h5>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                    <li>Execution flow: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</li>
                    <li>Avoiding Cartesian products with explicit INNER and LEFT JOIN conditions</li>
                    <li>Logarithmic searching with B-Tree indexes on foreign keys</li>
                    <li>Transaction rollback triggers in multi-client state operations</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {material.resourceType === 'Practice Task' && (
            <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-amber-600" />
                  <span>Hands-on Interactive Lab Challenge</span>
                </h4>
                <Badge variant="warning" size="sm">25 Practice Problems</Badge>
              </div>

              <p className="text-xs text-slate-700">
                <strong>Challenge #1:</strong> Write an optimized query to calculate the average placement competency score for all students grouped by department, having more than 5 completed assessments.
              </p>

              <div className="relative bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => handleCopyCode("SELECT department, ROUND(AVG(overall_score), 2) AS avg_score\nFROM student_assessments\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY avg_score DESC;")}
                  className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy sample query"
                >
                  {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-400 block mb-1">-- Sample Solution SQL Query:</span>
                <code>
                  SELECT department, ROUND(AVG(overall_score), 2) AS avg_score<br />
                  FROM student_assessments<br />
                  GROUP BY department<br />
                  HAVING COUNT(*) &gt; 5<br />
                  ORDER BY avg_score DESC;
                </code>
              </div>
            </div>
          )}

          {material.resourceType === 'Video Lecture' && (
            <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Faculty Seminar Recording</span>
                </h4>
                <span className="text-[11px] text-blue-700 font-semibold">{material.fileSizeOrDuration || '45 mins'}</span>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg flex flex-col items-center justify-center text-slate-300 p-4 text-center">
                <Video className="w-10 h-10 text-blue-400 mb-2 animate-pulse" />
                <p className="text-xs font-semibold text-white">{material.title}</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-md">
                  In-app lecture stream delivered by {material.uploaderName}. Focuses on execution plans, index tuning, and real-time database bottlenecks.
                </p>
              </div>
            </div>
          )}

          {material.resourceType === 'External Guide' && (
            <div className="border border-teal-200 rounded-xl p-4 bg-teal-50/30 space-y-2">
              <h4 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Curated Industry Reference Documentation</span>
              </h4>
              <p className="text-xs text-slate-600">
                This external technical reference link has been approved by faculty for reading:
              </p>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <span className="font-mono text-slate-700 truncate max-w-md">{material.url}</span>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Visit Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <strong>Faculty Management System:</strong> This learning material is managed directly inside your institution's competency platform. Marking it as completed updates your learning roadmap progress and informs your faculty mentor.
            </span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Viewer
          </button>

          <div className="flex items-center gap-2">
            {onToggleComplete && (
              <button
                type="button"
                onClick={() => {
                  onToggleComplete(material.id);
                  onClose();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs ${
                  isDone
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDone ? 'Mark as Incomplete' : 'Mark Material as Completed'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
