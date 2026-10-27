import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  Award,
  ExternalLink,
  Code2,
  Lock,
  Calendar,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

export const PublicSkillPassportPage: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const { language, t, getCompetencyName, getLevelName } = useLanguage();

  const [passport, setPassport] = useState(studentService.getSkillPassport());
  const profile = studentService.getProfile();
  const skills = studentService.getSkills();
  const certs = studentService.getCertifications();
  const projects = studentService.getProjects();
  const nmRecords = studentService.getNaanMudhalvanRecords();
  const competencies = studentService.getCompetencies();

  useEffect(() => {
    const unsub = studentService.subscribe(() => {
      setPassport(studentService.getSkillPassport());
    });
    return unsub;
  }, []);

  if (!passport.isPublic) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">{t('passport.privateBannerTitle')}</h2>
          <p className="text-xs text-slate-600 mt-2">
            {t('passport.privateBannerDesc')}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800"
            >
              <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Platform Home'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { visibleSections } = passport;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      {/* Verified Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133E87] rounded-2xl p-6 text-white shadow-md border border-blue-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden flex items-center justify-center text-xl font-bold">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{profile.fullName}</h1>
                <Badge variant="success" size="sm">
                  <ShieldCheck className="w-3 h-3 mr-1 inline" />
                  {language === 'ta' ? 'சரிபார்க்கப்பட்ட கற்பவர்' : 'Verified Learner'}
                </Badge>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {profile.degree} • {language === 'ta' ? `ஆண்டு ${profile.yearOfStudy}` : `Year ${profile.yearOfStudy}`}
              </p>
              <p className="text-[11px] text-blue-300/80 mt-0.5">{profile.institution}</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-white/10 px-4 py-2 rounded-xl border border-white/15">
            <span className="text-[10px] text-blue-200 block uppercase font-semibold">
              {language === 'ta' ? 'பாஸ்போர்ட் எண்' : 'Passport ID'}
            </span>
            <span className="text-xs font-mono font-bold text-white">{shareId || passport.shareId}</span>
            <span className="text-[10px] text-blue-300 block mt-0.5">
              {language === 'ta' ? 'புதுப்பிக்கப்பட்டது:' : 'Updated:'} {passport.lastUpdated}
            </span>
          </div>
        </div>

        {passport.customBio && (
          <p className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-200 italic leading-relaxed">
            "{passport.customBio}"
          </p>
        )}
      </div>

      {/* Competency Summary (If Shared) */}
      {visibleSections.competencyScores && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-700" />
              <span>{language === 'ta' ? 'மதிப்பீட்டின் மூலம் சரிபார்க்கப்பட்ட திறன்கள்' : 'Assessment-Validated Competencies'}</span>
            </h2>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? 'நிலையான நோய்நாடல் மதிப்பெண்கள்' : 'Standardized Diagnostic Scores'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {competencies.map((c) => (
              <div key={c.competency} className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
                <span className="text-[11px] font-medium text-slate-600 block truncate">
                  {getCompetencyName(c.competency)}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold text-blue-900">{c.score}%</span>
                  <Badge variant={c.score >= 80 ? 'success' : c.score >= 60 ? 'info' : 'warning'} size="sm">
                    {getLevelName(c.level)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Naan Mudhalvan Records (If Shared) */}
      {visibleSections.naanMudhalvanRecords && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{language === 'ta' ? 'நான் முதல்வன் பயிற்சிப் பதிவுகள்' : 'Naan Mudhalvan Completed Training Records'}</span>
            </h2>
            <span className="text-[11px] text-slate-400">
              {language === 'ta' ? 'சுயவிவரப் பயிற்சி ஆவணங்கள்' : 'Self-Reported & Verified Courses'}
            </span>
          </div>

          <div className="space-y-3">
            {nmRecords.map((r) => (
              <div key={r.id} className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{r.courseName}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{r.partnerOrganization} • {r.category}</p>
                  </div>
                  <Badge variant="success" size="sm">{t('common.completed')}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {r.skillsLearned.map((s) => (
                    <span key={s} className="text-[10px] font-medium bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills (If Shared) */}
      {visibleSections.skills && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Code2 className="w-4 h-4 text-blue-700" />
            <span>{language === 'ta' ? 'தொழில்நுட்பத் திறன்கள் & தேர்ச்சி' : 'Technical Skills & Proficiencies'}</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <div key={s.id} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800">{s.skillName}</span>
                <span className="text-[10px] text-slate-500 ml-1.5">({s.selfProficiency})</span>
                {s.verifiedScore && (
                  <span className="ml-1 text-[10px] font-bold text-emerald-700">
                    • {t('common.overallScore')}: {s.verifiedScore}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects (If Shared) */}
      {visibleSections.projects && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Briefcase className="w-4 h-4 text-indigo-700" />
            <span>{language === 'ta' ? 'முக்கிய தொழில்நுட்பத் திட்டங்கள்' : 'Featured Technical Projects'}</span>
          </h2>

          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
                <div className="flex items-start justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
                  <span className="text-[11px] text-slate-500">{p.duration}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-blue-800 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications (If Shared) */}
      {visibleSections.certifications && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{language === 'ta' ? 'தொழில்துறை & தொழில்நுட்பச் சான்றிதழ்கள்' : 'Industry & Technical Certifications'}</span>
          </h2>

          <div className="space-y-3">
            {certs.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">{c.title}</h3>
                  <p className="text-[11px] text-slate-500">{c.issuingOrg} • {c.issueDate}</p>
                </div>
                {c.credentialId && (
                  <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                    ID: {c.credentialId}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security & Verification Disclaimer */}
      <div className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        <p>
          {language === 'ta'
            ? 'இந்த பொதுத் திறன் பாஸ்போர்ட் மாணவரால் அங்கீகரிக்கப்பட்ட ஆவணங்களை மட்டுமே காட்டுகிறது. மாணவரின் தனிப்பட்ட தொடர்பு விவரங்கள் பாதுகாக்கப்படுகின்றன.'
            : 'This public Skill Passport displays only candidate-approved records. Private student contact details and internal academic audit files are kept strictly protected.'}
        </p>
      </div>
    </div>
  );
};
