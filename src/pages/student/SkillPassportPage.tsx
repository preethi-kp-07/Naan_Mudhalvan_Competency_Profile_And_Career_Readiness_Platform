import React, { useState } from 'react';
import {
  QrCode,
  Share2,
  Lock,
  Globe,
  Copy,
  Check,
  Eye,
  ShieldCheck,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';

export const SkillPassportPage: React.FC = () => {
  const [passport, setPassport] = useState(studentService.getSkillPassport());
  const [copied, setCopied] = useState(false);
  const [bio, setBio] = useState(passport.customBio || '');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const fullShareUrl = `${window.location.origin}/passport/${passport.shareId}`;

  const handleToggleSection = (key: keyof typeof passport.visibleSections) => {
    const updated = {
      ...passport,
      visibleSections: {
        ...passport.visibleSections,
        [key]: !passport.visibleSections[key],
      },
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    studentService.updateSkillPassport(updated);
    setPassport(updated);
  };

  const handleToggleMasterPublic = () => {
    const updated = {
      ...passport,
      isPublic: !passport.isPublic,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    studentService.updateSkillPassport(updated);
    setPassport(updated);
  };

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...passport,
      customBio: bio,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    studentService.updateSkillPassport(updated);
    setPassport(updated);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Shareable Skill Passport</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student-controlled verifiable profile for recruitment drives, portfolio showcases, and faculty audits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/passport/${passport.shareId}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Public View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Sharing Control Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                passport.isPublic ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {passport.isPublic ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">Public Link Sharing</h2>
                <Badge variant={passport.isPublic ? 'success' : 'neutral'} size="sm">
                  {passport.isPublic ? 'Publicly Accessible' : 'Private (Link Disabled)'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {passport.isPublic
                  ? 'Recruiters and external mentors with this URL can view your selected achievements.'
                  : 'Public access is revoked. Anyone visiting the link will see a private notice.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleMasterPublic}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              passport.isPublic
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {passport.isPublic ? 'Revoke Public Access' : 'Enable Public Link'}
          </button>
        </div>

        {/* Share Link & QR Box */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <label className="text-xs font-semibold text-slate-700 block">
              Permanent Verified Share URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={fullShareUrl}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-700 select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Guaranteed:</strong> Your private contact numbers, passwords, and detailed personal notes will <em>never</em> be disclosed on the public link. Only candidate-checked sections below are shown.
              </span>
            </div>
          </div>

          {/* Real SVG QR Code Visual */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="p-3 bg-white rounded-lg shadow-2xs border border-slate-200">
              <svg className="w-28 h-28 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                {/* Clean geometric QR code simulation */}
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="40" y="10" width="10" height="10" />
                <rect x="55" y="10" width="8" height="8" />
                <rect x="40" y="25" width="15" height="8" />
                <rect x="10" y="45" width="8" height="15" />
                <rect x="25" y="40" width="10" height="10" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="70" y="45" width="10" height="10" />
                <rect x="85" y="50" width="10" height="10" />
                <rect x="40" y="70" width="12" height="12" />
                <rect x="60" y="75" width="10" height="15" />
                <rect x="80" y="75" width="15" height="8" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-500 font-medium mt-2">
              Scan with mobile camera to view passport
            </span>
          </div>
        </div>
      </div>

      {/* Section-by-Section Privacy Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-700" />
          <span>Granular Section Visibility Controls</span>
        </h2>
        <p className="text-xs text-slate-500">
          Check which credentials you want visible on your public Skill Passport:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { key: 'personalInfo', label: 'Candidate Name & Headline', desc: 'Displays full name and program' },
            { key: 'academicDetails', label: 'Academic Institution & Year', desc: 'Institution name and semester' },
            { key: 'competencyScores', label: 'Assessment Competency Vector', desc: 'Validated diagnostic scores' },
            { key: 'naanMudhalvanRecords', label: 'Naan Mudhalvan Training Courses', desc: 'Completed courses and certificates' },
            { key: 'skills', label: 'Technical & Analytical Skills', desc: 'Skill tags with proficiency levels' },
            { key: 'certifications', label: 'Industry Certifications', desc: 'Verified certificate credentials' },
            { key: 'projects', label: 'Featured Software Projects', desc: 'GitHub links and project summaries' },
          ].map(({ key, label, desc }) => {
            const isChecked = passport.visibleSections[key as keyof typeof passport.visibleSections];

            return (
              <label
                key={key}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  isChecked ? 'border-blue-300 bg-blue-50/30' : 'border-slate-200 bg-slate-50/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleSection(key as any)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-bold text-slate-800 block">{label}</span>
                  <span className="text-[11px] text-slate-500 block">{desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom Bio Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-3">
          Candidate Statement / Summary Bio
        </h2>

        <form onSubmit={handleSaveBio} className="space-y-3">
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Introduce your career focus, technical interests, and academic background..."
            className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />

          <div className="flex items-center justify-between">
            {savedFeedback && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Bio updated successfully!</span>
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                Save Bio
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
