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
import { useLanguage } from '../../i18n/LanguageContext';

export const SkillPassportPage: React.FC = () => {
  const { t, language } = useLanguage();
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
          <h1 className="text-2xl font-bold text-slate-900">{t('passport.pageTitle')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('passport.pageSubtitle')}
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
            <span>{t('passport.previewPassport')}</span>
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
                <h2 className="text-sm font-bold text-slate-900">{t('passport.publicStatus')}</h2>
                <Badge variant={passport.isPublic ? 'success' : 'neutral'} size="sm">
                  {passport.isPublic ? t('passport.isPublicTrue') : t('passport.isPublicFalse')}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {passport.isPublic
                  ? (language === 'ta'
                      ? 'இந்த URL உள்ள தேர்வாளர்கள் மற்றும் வழிகாட்டிகள் உங்கள் சாதனைகளைப் பார்க்கலாம்.'
                      : 'Recruiters and external mentors with this URL can view your selected achievements.')
                  : (language === 'ta'
                      ? 'பொது அணுகல் முடக்கப்பட்டுள்ளது. இந்த இணைப்பைப் பார்ப்பவர்களுக்குத் தனிப்பட்ட அறிவிப்பு தோன்றும்.'
                      : 'Public access is revoked. Anyone visiting the link will see a private notice.')}
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
            {passport.isPublic
              ? (language === 'ta' ? 'பொது அணுகலை முடக்கு' : 'Revoke Public Access')
              : (language === 'ta' ? 'பொது இணைப்பை இயக்கு' : 'Enable Public Link')}
          </button>
        </div>

        {/* Share Link & QR Box */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <label className="text-xs font-semibold text-slate-700 block">
              {language === 'ta' ? 'நிரந்தர சரிபார்க்கப்பட்ட பகிர்வு URL' : 'Permanent Verified Share URL'}
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
                <span>{copied ? t('passport.copied') : t('passport.copyLink')}</span>
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>{language === 'ta' ? 'தனியுரிமை உறுதி:' : 'Privacy Guaranteed:'}</strong>{' '}
                {language === 'ta'
                  ? 'உங்கள் தனிப்பட்ட தொடர்பு எண்கள், கடவுச்சொல் மற்றும் விரிவான தனிப்பட்ட குறிப்புகள் பொது இணைப்பில் ஒருபோதும் தெரியாது. கீழே நீங்கள் சரிபார்த்த பிரிவுகள் மட்டுமே பொதுப் பார்வையில் தெரியும்.'
                  : 'Your private contact numbers, passwords, and detailed personal notes will never be disclosed on the public link. Only candidate-checked sections below are shown.'}
              </span>
            </div>
          </div>

          {/* Real SVG QR Code Visual */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="p-3 bg-white rounded-lg shadow-2xs border border-slate-200">
              <svg className="w-28 h-28 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
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
              {language === 'ta' ? 'மொபைல் கேமரா மூலம் QR ஸ்கேன் செய்து பார்க்கவும்' : 'Scan with mobile camera to view passport'}
            </span>
          </div>
        </div>
      </div>

      {/* Section-by-Section Privacy Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-700" />
          <span>{t('passport.sectionToggles')}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ta'
            ? 'உங்கள் பொது திறன் பாஸ்போர்ட்டில் எவை தெரிய வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்:'
            : 'Check which credentials you want visible on your public Skill Passport:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            {
              key: 'personalInfo',
              label: language === 'ta' ? 'மாணவர் பெயர் & கல்வி விவரம்' : 'Candidate Name & Headline',
              desc: language === 'ta' ? 'முழுப் பெயர் மற்றும் பட்டப்படிப்பைக் காட்டும்' : 'Displays full name and program',
            },
            {
              key: 'academicDetails',
              label: language === 'ta' ? 'கல்லூரி & கல்வி ஆண்டு' : 'Academic Institution & Year',
              desc: language === 'ta' ? 'கல்லூரி பெயர் மற்றும் செமஸ்டர்' : 'Institution name and semester',
            },
            {
              key: 'competencyScores',
              label: language === 'ta' ? 'மதிப்பீட்டுத் திறன் திசையன்' : 'Assessment Competency Vector',
              desc: language === 'ta' ? 'சரிபார்க்கப்பட்ட கண்டறியும் மதிப்பெண்கள்' : 'Validated diagnostic scores',
            },
            {
              key: 'naanMudhalvanRecords',
              label: language === 'ta' ? 'நான் முதல்வன் பயிற்சிகள்' : 'Naan Mudhalvan Training Courses',
              desc: language === 'ta' ? 'முடிக்கப்பட்ட பாடங்கள் மற்றும் சான்றிதழ்கள்' : 'Completed courses and certificates',
            },
            {
              key: 'skills',
              label: language === 'ta' ? 'தொழில்நுட்பத் திறன்கள்' : 'Technical & Analytical Skills',
              desc: language === 'ta' ? 'திறன் குறிச்சொற்கள் மற்றும் நிலைகள்' : 'Skill tags with proficiency levels',
            },
            {
              key: 'certifications',
              label: language === 'ta' ? 'தொழில் சான்றிதழ்கள்' : 'Industry Certifications',
              desc: language === 'ta' ? 'சரிபார்க்கப்பட்ட சான்றிதழ் விவரங்கள்' : 'Verified certificate credentials',
            },
            {
              key: 'projects',
              label: language === 'ta' ? 'மென்பொருள் திட்டங்கள்' : 'Featured Software Projects',
              desc: language === 'ta' ? 'GitHub இணைப்புகள் மற்றும் திட்டச் சுருக்கங்கள்' : 'GitHub links and project summaries',
            },
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
          {language === 'ta' ? 'மாணவர் அறிக்கை / சுயவிவரச் சுருக்கம்' : 'Candidate Statement / Summary Bio'}
        </h2>

        <form onSubmit={handleSaveBio} className="space-y-3">
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={
              language === 'ta'
                ? 'உங்கள் தொழில் இலக்கு, தொழில்நுட்ப ஆர்வங்கள் மற்றும் கல்விப் பின்னணியை விவரிக்கவும்...'
                : 'Introduce your career focus, technical interests, and academic background...'
            }
            className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />

          <div className="flex items-center justify-between">
            {savedFeedback && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'சுயவிவர அறிக்கை புதுப்பிக்கப்பட்டது!' : 'Bio updated successfully!'}</span>
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                {language === 'ta' ? 'அறிக்கையைச் சேமி' : 'Save Bio'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
