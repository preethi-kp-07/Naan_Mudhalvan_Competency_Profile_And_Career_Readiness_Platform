import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  Users,
  Lock,
  Globe,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminSettingsPage: React.FC = () => {
  const [allowPublicPassport, setAllowPublicPassport] = useState(true);
  const [requireAssessmentBeforePlacement, setRequireAssessmentBeforePlacement] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings & Access Control</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Institutional access control policies, audit governance, and candidate visibility rules
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Institutional governance settings saved!</span>
        </div>
      )}

      {/* Access Control & Governance Policies */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Institutional Skill Passport & Privacy Policies</span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Permit Public Skill Passport Sharing</span>
              <span className="text-[11px] text-slate-500">
                Allows students to generate external QR codes and share verified credentials with recruiters
              </span>
            </div>
            <input
              type="checkbox"
              checked={allowPublicPassport}
              onChange={(e) => setAllowPublicPassport(e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Mandatory Diagnostic Benchmark Before Drive Registration</span>
              <span className="text-[11px] text-slate-500">
                Requires students to complete at least one verified assessment before registering for campus drives
              </span>
            </div>
            <input
              type="checkbox"
              checked={requireAssessmentBeforePlacement}
              onChange={(e) => setRequireAssessmentBeforePlacement(e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          >
            Update Policies
          </button>
        </div>
      </div>

      {/* Security Audit Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>Privileged Administrative Activity Audit Log</span>
        </h2>

        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Remedial SQL Intervention Assigned</span>
              <span className="text-[11px] text-slate-400">Target: Preethi S. (Reg 710022104042) • Dr. S. Sundaram</span>
            </div>
            <span className="text-[11px] text-slate-400">Today, 2:30 PM</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Assessment Question Bank Updated</span>
              <span className="text-[11px] text-slate-400">Added 4 Hard Questions to "Relational Databases & SQL"</span>
            </div>
            <span className="text-[11px] text-slate-400">Yesterday, 11:15 AM</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Cohort Benchmark Export Generated</span>
              <span className="text-[11px] text-slate-400">CSV Export of 142 Student Vectors</span>
            </div>
            <span className="text-[11px] text-slate-400">March 28, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
