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
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageToggle } from '../../components/common/LanguageToggle';

export const AdminSettingsPage: React.FC = () => {
  const { language } = useLanguage();
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
        <h1 className="text-2xl font-bold text-slate-900">
          {language === 'ta' ? 'அமைப்புகள் & அணுகல் கட்டுப்பாடு' : 'Settings & Access Control'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === 'ta'
            ? 'நிறுவன அணுகல் கட்டுப்பாட்டுக் கொள்கைகள், தணிக்கை நிர்வாகம் மற்றும் வேட்பாளர் தெரிவுநிலை விதிகள்'
            : 'Institutional access control policies, audit governance, and candidate visibility rules'}
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'ta'
              ? 'நிறுவன நிர்வாக அமைப்புகள் சேமிக்கப்பட்டன!'
              : 'Institutional governance settings saved!'}
          </span>
        </div>
      )}

      {/* Language Preference Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-700" />
          <span>{language === 'ta' ? 'மொழி விருப்பம்' : 'Language Preference'}</span>
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div>
            <span className="font-bold text-slate-800 text-xs block">
              {language === 'ta' ? 'தளத்தின் இடைமுக மொழி' : 'Platform Interface Language'}
            </span>
            <span className="text-[11px] text-slate-500">
              {language === 'ta'
                ? 'ஆங்கிலம் மற்றும் தமிழ் மொழிகளுக்கு இடையே உடனடியாக மாறவும்'
                : 'Switch instantly between English and தமிழ் without page reload'}
            </span>
          </div>
          <LanguageToggle />
        </div>
      </div>

      {/* Access Control & Governance Policies */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>
            {language === 'ta'
              ? 'நிறுவன திறன் கடவுச்சீட்டு & தனியுரிமைக் கொள்கைகள்'
              : 'Institutional Skill Passport & Privacy Policies'}
          </span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">
                {language === 'ta'
                  ? 'பொது திறன் கடவுச்சீட்டு பகிர்வை அனுமதி'
                  : 'Permit Public Skill Passport Sharing'}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === 'ta'
                  ? 'மாணவர்கள் வெளிப்புற QR குறியீடுகளை உருவாக்கி நிறுவன பணியமர்த்துபவர்களுடன் சரிபார்க்கப்பட்ட சான்றிதழ்களைப் பகிர அனுமதிக்கிறது'
                  : 'Allows students to generate external QR codes and share verified credentials with recruiters'}
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
              <span className="font-bold text-slate-800 block">
                {language === 'ta'
                  ? 'வளாக வேலைவாய்ப்பு பதிவுக்கு முன் கட்டாய கண்டறியும் மதிப்பீடு'
                  : 'Mandatory Diagnostic Benchmark Before Drive Registration'}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === 'ta'
                  ? 'மாணவர்கள் வளாகப் பணிகளுக்காக பதிவு செய்வதற்கு முன் குறைந்தது ஒரு சரிபார்க்கப்பட்ட மதிப்பீட்டை முடிக்க வேண்டும்'
                  : 'Requires students to complete at least one verified assessment before registering for campus drives'}
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
            {language === 'ta' ? 'கொள்கைகளைப் புதுப்பிக்கவும்' : 'Update Policies'}
          </button>
        </div>
      </div>

      {/* Security Audit Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'ta'
              ? 'சிறப்புரிமை பெற்ற நிர்வாக நடவடிக்கை தணிக்கைப் பதிவு'
              : 'Privileged Administrative Activity Audit Log'}
          </span>
        </h2>

        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">
                {language === 'ta' ? 'தீர்வு SQL தலையீடு ஒதுக்கப்பட்டது' : 'Remedial SQL Intervention Assigned'}
              </span>
              <span className="text-[11px] text-slate-400">
                {language === 'ta'
                  ? 'இலக்கு: பிரீத்தி எஸ். (பதிவு 710022104042) • முனைவர் எஸ். சுந்தரம்'
                  : 'Target: Preethi S. (Reg 710022104042) • Dr. S. Sundaram'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? 'இன்று, பிற்பகல் 2:30' : 'Today, 2:30 PM'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">
                {language === 'ta' ? 'மதிப்பீட்டு வினா வங்கி புதுப்பிக்கப்பட்டது' : 'Assessment Question Bank Updated'}
              </span>
              <span className="text-[11px] text-slate-400">
                {language === 'ta'
                  ? '"தொடர்புடைய தரவுத்தளங்கள் & SQL" இல் 4 கடினமான கேள்விகள் சேர்க்கப்பட்டன'
                  : 'Added 4 Hard Questions to "Relational Databases & SQL"'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? 'நேற்று, காலை 11:15' : 'Yesterday, 11:15 AM'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">
                {language === 'ta' ? 'குழு அளவுகோல் ஏற்றுமதி உருவாக்கப்பட்டது' : 'Cohort Benchmark Export Generated'}
              </span>
              <span className="text-[11px] text-slate-400">
                {language === 'ta' ? '142 மாணவர் திசையன்களின் CSV ஏற்றுமதி' : 'CSV Export of 142 Student Vectors'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? 'மார்ச் 28, 2026' : 'March 28, 2026'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
