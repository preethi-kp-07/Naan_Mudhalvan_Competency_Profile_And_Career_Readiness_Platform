import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Edit3,
  Calendar,
  Building2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Internship } from '../../types';

export const StudentProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'naan_mudhalvan' | 'skills' | 'certifications' | 'projects' | 'internships'>('personal');

  const [profile, setProfile] = useState(studentService.getProfile());
  const [nmRecords, setNmRecords] = useState(studentService.getNaanMudhalvanRecords());
  const [skills, setSkills] = useState(studentService.getSkills());
  const [certs, setCerts] = useState(studentService.getCertifications());
  const [projects, setProjects] = useState(studentService.getProjects());
  const [internships, setInternships] = useState(studentService.getInternships());

  // Profile Edit State
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [profileForm, setProfileForm] = useState({
    fullName: profile.fullName,
    registerNumber: profile.registerNumber,
    collegeEmail: profile.collegeEmail,
    institution: profile.institution,
    degree: profile.degree,
    yearOfStudy: profile.yearOfStudy,
    currentSemester: profile.currentSemester,
    cgpa: profile.cgpa,
    personalEmail: profile.personalEmail || '',
    phone: profile.phone || '',
  });

  // Modal States
  const [isNmModalOpen, setIsNmModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Internship Modal & CRUD States
  const [isInternModalOpen, setIsInternModalOpen] = useState(false);
  const [editingInternshipId, setEditingInternshipId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [internFeedback, setInternFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [internForm, setInternForm] = useState({
    company: '',
    role: '',
    employmentType: 'Remote' as 'Full-time' | 'Part-time' | 'Remote' | 'On-site' | 'Hybrid',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    skills: '',
    description: '',
    certificateUrl: '',
  });

  // New Naan Mudhalvan Record Form
  const [newNm, setNewNm] = useState({
    courseName: '',
    category: 'Software & Information Technology',
    partnerOrganization: 'TNSDC Training Partner',
    skillsLearned: '',
    status: 'Completed' as const,
    startDate: '',
    completionDate: '',
    gradeOrScore: '',
  });

  // New Skill Form
  const [newSkill, setNewSkill] = useState({
    skillName: '',
    category: 'Technical' as const,
    selfProficiency: 'Intermediate' as const,
    evidenceDescription: '',
  });

  // New Cert Form
  const [newCert, setNewCert] = useState({
    title: '',
    issuingOrg: '',
    issueDate: '',
    credentialId: '',
  });

  // New Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    role: '',
    duration: '',
  });

  // --- Handlers: Profile Editing ---
  const handleOpenEditProfile = () => {
    setProfileForm({
      fullName: profile.fullName,
      registerNumber: profile.registerNumber,
      collegeEmail: profile.collegeEmail,
      institution: profile.institution,
      degree: profile.degree,
      yearOfStudy: profile.yearOfStudy,
      currentSemester: profile.currentSemester,
      cgpa: profile.cgpa,
      personalEmail: profile.personalEmail || '',
      phone: profile.phone || '',
    });
    setProfileFeedback(null);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.fullName.trim()) {
      setProfileFeedback({ type: 'error', message: 'Full name is required.' });
      return;
    }
    if (!profileForm.institution.trim()) {
      setProfileFeedback({ type: 'error', message: 'Institution name is required.' });
      return;
    }
    if (!profileForm.degree.trim()) {
      setProfileFeedback({ type: 'error', message: 'Degree & Department is required.' });
      return;
    }
    const cgpaNum = Number(profileForm.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setProfileFeedback({ type: 'error', message: 'Cumulative CGPA must be a valid number between 0.0 and 10.0.' });
      return;
    }

    const updated = studentService.updateProfile({
      fullName: profileForm.fullName.trim(),
      registerNumber: profileForm.registerNumber.trim(),
      collegeEmail: profileForm.collegeEmail.trim(),
      institution: profileForm.institution.trim(),
      degree: profileForm.degree.trim(),
      yearOfStudy: Number(profileForm.yearOfStudy),
      currentSemester: Number(profileForm.currentSemester),
      cgpa: cgpaNum,
      personalEmail: profileForm.personalEmail.trim(),
      phone: profileForm.phone.trim(),
    });

    setProfile(updated);
    setProfileFeedback({ type: 'success', message: 'Profile details updated successfully!' });
    setTimeout(() => {
      setIsEditProfileModalOpen(false);
      setProfileFeedback(null);
    }, 900);
  };

  // --- Handlers: Internships ---
  const handleOpenAddInternship = () => {
    setEditingInternshipId(null);
    setInternForm({
      company: '',
      role: '',
      employmentType: 'Remote',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      skills: '',
      description: '',
      certificateUrl: '',
    });
    setInternFeedback(null);
    setIsInternModalOpen(true);
  };

  const handleOpenEditInternship = (intern: Internship) => {
    setEditingInternshipId(intern.id);
    const startStr = intern.startDate || (intern.duration.includes(' - ') ? intern.duration.split(' - ')[0] : intern.duration);
    const endStr = intern.endDate || (intern.duration.includes(' - ') ? intern.duration.split(' - ')[1] : '');
    const skillsList = intern.skills || intern.skillsGained || [];
    setInternForm({
      company: intern.company,
      role: intern.role,
      employmentType: (intern.employmentType as any) || 'Remote',
      startDate: startStr,
      endDate: endStr,
      currentlyWorking: intern.currentlyWorking ?? (intern.duration.toLowerCase().includes('present')),
      skills: skillsList.join(', '),
      description: intern.description,
      certificateUrl: intern.certificateUrl || '',
    });
    setInternFeedback(null);
    setIsInternModalOpen(true);
  };

  const handleSaveInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internForm.company.trim()) {
      setInternFeedback({ type: 'error', message: 'Organization / Company name is required.' });
      return;
    }
    if (!internForm.role.trim()) {
      setInternFeedback({ type: 'error', message: 'Internship role or title is required.' });
      return;
    }

    const durationDisplay = internForm.currentlyWorking
      ? `${internForm.startDate || 'Recent'} - Present`
      : `${internForm.startDate || 'Past'} ${internForm.endDate ? `- ${internForm.endDate}` : ''}`;

    const skillsArray = internForm.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingInternshipId) {
      const updated = studentService.updateInternship(editingInternshipId, {
        company: internForm.company.trim(),
        role: internForm.role.trim(),
        employmentType: internForm.employmentType,
        startDate: internForm.startDate,
        endDate: internForm.currentlyWorking ? undefined : internForm.endDate,
        currentlyWorking: internForm.currentlyWorking,
        duration: durationDisplay,
        skillsGained: skillsArray,
        skills: skillsArray,
        description: internForm.description.trim(),
        certificateUrl: internForm.certificateUrl.trim() || undefined,
      });

      if (updated) {
        setInternships(studentService.getInternships());
        setInternFeedback({ type: 'success', message: 'Internship updated successfully!' });
        setTimeout(() => {
          setIsInternModalOpen(false);
          setInternFeedback(null);
        }, 800);
      }
    } else {
      studentService.addInternship({
        company: internForm.company.trim(),
        role: internForm.role.trim(),
        employmentType: internForm.employmentType,
        startDate: internForm.startDate,
        endDate: internForm.currentlyWorking ? undefined : internForm.endDate,
        currentlyWorking: internForm.currentlyWorking,
        duration: durationDisplay,
        skillsGained: skillsArray,
        skills: skillsArray,
        description: internForm.description.trim(),
        certificateUrl: internForm.certificateUrl.trim() || undefined,
      });
      setInternships(studentService.getInternships());
      setInternFeedback({ type: 'success', message: 'Internship added successfully!' });
      setTimeout(() => {
        setIsInternModalOpen(false);
        setInternFeedback(null);
      }, 800);
    }
  };

  const handleDeleteInternship = (id: string) => {
    studentService.deleteInternship(id);
    setInternships(studentService.getInternships());
    setDeleteConfirmId(null);
  };

  // --- Handlers: Other Records ---
  const handleAddNmRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNm.courseName) return;
    const created = studentService.addNaanMudhalvanRecord({
      ...newNm,
      skillsLearned: newNm.skillsLearned.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setNmRecords([created, ...nmRecords]);
    setIsNmModalOpen(false);
    setNewNm({
      courseName: '',
      category: 'Software & Information Technology',
      partnerOrganization: 'TNSDC Training Partner',
      skillsLearned: '',
      status: 'Completed',
      startDate: '',
      completionDate: '',
      gradeOrScore: '',
    });
  };

  const handleDeleteNm = (id: string) => {
    studentService.deleteNaanMudhalvanRecord(id);
    setNmRecords(nmRecords.filter((r) => r.id !== id));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.skillName) return;
    const created = studentService.addSkill(newSkill);
    setSkills([created, ...skills]);
    setIsSkillModalOpen(false);
    setNewSkill({
      skillName: '',
      category: 'Technical',
      selfProficiency: 'Intermediate',
      evidenceDescription: '',
    });
  };

  const handleDeleteSkill = (id: string) => {
    studentService.deleteSkill(id);
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title) return;
    const created = studentService.addCertification(newCert);
    setCerts([created, ...certs]);
    setIsCertModalOpen(false);
    setNewCert({ title: '', issuingOrg: '', issueDate: '', credentialId: '' });
  };

  const handleDeleteCert = (id: string) => {
    studentService.deleteCertification(id);
    setCerts(certs.filter((c) => c.id !== id));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const created = studentService.addProject({
      ...newProject,
      technologies: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setProjects([created, ...projects]);
    setIsProjectModalOpen(false);
    setNewProject({ title: '', description: '', technologies: '', role: '', duration: '' });
  };

  const handleDeleteProject = (id: string) => {
    studentService.deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const tabs = [
    { id: 'personal', label: 'Personal & Academic Info', icon: User },
    { id: 'naan_mudhalvan', label: 'Naan Mudhalvan Records', icon: BookOpen },
    { id: 'skills', label: 'Skills & Proficiencies', icon: Code2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'internships', label: 'Internships', icon: GraduationCap },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile & Learning Records</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain your academic details, verified skills, and manual Naan Mudhalvan training logs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs text-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Profile Completion: <strong>{profile.profileCompletion}%</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto border-b border-slate-200 gap-2 pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all shrink-0 border-b-2 ${
                isActive
                  ? 'border-blue-700 text-blue-800 bg-white shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.id === 'internships' && internships.length > 0 && (
                <span className="ml-1 bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {internships.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal & Academic Details */}
      {activeTab === 'personal' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">Academic & Personal Details</h2>
                <Badge variant="info" size="sm">Verified Student Record</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your institution, contact, and enrollment information accurate for career placement.
              </p>
            </div>

            <button
              id="edit-profile-btn"
              onClick={handleOpenEditProfile}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-2 shadow-2xs transition-all shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Full Name</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.fullName}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Register Number</span>
              <span className="text-xs font-mono font-bold text-slate-800 mt-1 block">{profile.registerNumber}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">College Email</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.collegeEmail}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Institution</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.institution}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Degree & Department</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.degree}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Year & Semester</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">Year {profile.yearOfStudy} (Semester {profile.currentSemester})</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Cumulative CGPA</span>
              <span className="text-xs font-bold text-emerald-700 mt-1 block">{profile.cgpa} / 10.0</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Personal Email</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.personalEmail || '—'}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">Contact Phone</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{profile.phone || '—'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Naan Mudhalvan Records */}
      {activeTab === 'naan_mudhalvan' && (
        <div className="space-y-4">
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Manual Naan Mudhalvan Learning Records</p>
              <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
                Students can manually document their official Naan Mudhalvan training courses and certificates. Note: This academic platform is independent and does not claim automatic synchronization with the official portal.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Enrolled & Completed Courses</h2>
            <button
              onClick={() => setIsNmModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Learning Record</span>
            </button>
          </div>

          <div className="space-y-3">
            {nmRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{record.courseName}</h3>
                      <Badge variant={record.status === 'Completed' ? 'success' : 'info'} size="sm">
                        {record.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {record.partnerOrganization} • {record.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {record.certificateUrl && (
                      <a
                        href={record.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteNm(record.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] text-slate-400 mr-1 font-medium">Skills Learned:</span>
                    {record.skillsLearned.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    <span>Duration: {record.startDate} {record.completionDate ? `to ${record.completionDate}` : ''}</span>
                    {record.gradeOrScore && <span className="ml-2 font-semibold text-emerald-700">• {record.gradeOrScore}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Skills & Proficiencies */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Technical & Analytical Skills</h2>
              <p className="text-xs text-slate-500">
                Self-reported skills are clearly distinguished from assessment-validated scores
              </p>
            </div>
            <button
              onClick={() => setIsSkillModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{s.skillName}</h3>
                    <p className="text-[11px] text-slate-400">{s.category}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="neutral" size="sm">Self: {s.selfProficiency}</Badge>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">{s.evidenceDescription}</p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">Assessment Validation:</span>
                  {s.verifiedScore ? (
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-xs">
                      Verified: {s.verifiedScore}%
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px] italic">Not Yet Evaluated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Certifications */}
      {activeTab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Industry & Professional Certifications</h2>
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certification</span>
            </button>
          </div>

          <div className="space-y-3">
            {certs.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-500">{c.issuingOrg} • Issued: {c.issueDate}</p>
                  {c.credentialId && <p className="text-[11px] text-slate-400 font-mono mt-0.5">Credential: {c.credentialId}</p>}
                </div>
                <button
                  onClick={() => handleDeleteCert(c.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Academic & Independent Projects</h2>
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
                    <p className="text-[11px] text-slate-500">{p.role} • {p.duration}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.technologies.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Internships (Requirement 2) */}
      {activeTab === 'internships' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Internship Experiences</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Document hands-on industry internships, employment types, verified roles, and certificate proofs.
              </p>
            </div>
            <button
              id="add-internship-btn"
              onClick={handleOpenAddInternship}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 shadow-2xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Internship</span>
            </button>
          </div>

          {internships.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center space-y-3">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="max-w-sm mx-auto">
                <h3 className="text-sm font-semibold text-slate-800">No Internships Added Yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Add your practical industry training, corporate internships, and summer apprenticeships to boost your career matching score.
                </p>
              </div>
              <button
                onClick={handleOpenAddInternship}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your First Internship</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {internships.map((intern) => {
                const skillsList = intern.skills || intern.skillsGained || [];
                return (
                  <div
                    key={intern.id}
                    className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-sm transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{intern.role}</h3>
                          <span className="text-xs font-medium text-slate-500">at</span>
                          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                            {intern.company}
                          </span>
                          {intern.employmentType && (
                            <Badge variant="neutral" size="sm">
                              {intern.employmentType}
                            </Badge>
                          )}
                          {intern.currentlyWorking && (
                            <Badge variant="success" size="sm">
                              Currently Working
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{intern.duration}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {intern.certificateUrl && (
                          <a
                            href={intern.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1 transition-colors border border-blue-200"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Proof</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEditInternship(intern)}
                          className="p-1.5 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit Internship"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(intern.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Internship"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{intern.description}</p>

                    {skillsList.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 mr-1 font-medium">Skills Gained:</span>
                        {skillsList.map((skill: string) => (
                          <span
                            key={skill}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- MODAL 1: Edit Profile (Requirement 1) --- */}
      <Modal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        title="Edit Student Profile Details"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          {profileFeedback && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 text-xs font-medium ${
                profileFeedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {profileFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{profileFeedback.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Register Number *</label>
              <input
                type="text"
                required
                value={profileForm.registerNumber}
                onChange={(e) => setProfileForm({ ...profileForm, registerNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">College Email *</label>
              <input
                type="email"
                required
                value={profileForm.collegeEmail}
                onChange={(e) => setProfileForm({ ...profileForm, collegeEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Personal Email</label>
              <input
                type="email"
                value={profileForm.personalEmail}
                onChange={(e) => setProfileForm({ ...profileForm, personalEmail: e.target.value })}
                placeholder="student@gmail.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Institution Name *</label>
            <input
              type="text"
              required
              value={profileForm.institution}
              onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Degree & Department *</label>
              <input
                type="text"
                required
                value={profileForm.degree}
                onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Year of Study</label>
              <select
                value={profileForm.yearOfStudy}
                onChange={(e) => setProfileForm({ ...profileForm, yearOfStudy: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value={1}>Year 1</option>
                <option value={2}>Year 2</option>
                <option value={3}>Year 3</option>
                <option value={4}>Year 4</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Current Semester</label>
              <select
                value={profileForm.currentSemester}
                onChange={(e) => setProfileForm({ ...profileForm, currentSemester: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Cumulative CGPA *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={profileForm.cgpa}
                onChange={(e) => setProfileForm({ ...profileForm, cgpa: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold text-emerald-700"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditProfileModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold shadow-2xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL 2: Add / Edit Internship (Requirement 2) --- */}
      <Modal
        isOpen={isInternModalOpen}
        onClose={() => setIsInternModalOpen(false)}
        title={editingInternshipId ? 'Edit Internship Experience' : 'Add Internship Experience'}
      >
        <form onSubmit={handleSaveInternship} className="space-y-4 text-xs">
          {internFeedback && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 text-xs font-medium ${
                internFeedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {internFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{internFeedback.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Internship Title or Role *</label>
              <input
                type="text"
                required
                value={internForm.role}
                onChange={(e) => setInternForm({ ...internForm, role: e.target.value })}
                placeholder="e.g. Frontend Developer Intern"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Organization / Company Name *</label>
              <input
                type="text"
                required
                value={internForm.company}
                onChange={(e) => setInternForm({ ...internForm, company: e.target.value })}
                placeholder="e.g. Zoho Corporation"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Employment Type</label>
              <select
                value={internForm.employmentType}
                onChange={(e) => setInternForm({ ...internForm, employmentType: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Start Date</label>
              <input
                type="month"
                value={internForm.startDate}
                onChange={(e) => setInternForm({ ...internForm, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">End Date</label>
              <input
                type="month"
                disabled={internForm.currentlyWorking}
                value={internForm.endDate}
                onChange={(e) => setInternForm({ ...internForm, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="currentlyWorkingCheck"
              checked={internForm.currentlyWorking}
              onChange={(e) =>
                setInternForm({
                  ...internForm,
                  currentlyWorking: e.target.checked,
                  endDate: e.target.checked ? '' : internForm.endDate,
                })
              }
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="currentlyWorkingCheck" className="text-xs text-slate-700 font-medium cursor-pointer">
              I am currently working in this internship
            </label>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Skills Gained (comma-separated)</label>
            <input
              type="text"
              value={internForm.skills}
              onChange={(e) => setInternForm({ ...internForm, skills: e.target.value })}
              placeholder="e.g. React.js, Tailwind CSS, REST APIs, Git"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Description & Responsibilities</label>
            <textarea
              rows={3}
              value={internForm.description}
              onChange={(e) => setInternForm({ ...internForm, description: e.target.value })}
              placeholder="Describe your key deliverables, team projects, and learnings during this internship..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Certificate or Verification Proof URL (Optional)</label>
            <input
              type="url"
              value={internForm.certificateUrl}
              onChange={(e) => setInternForm({ ...internForm, certificateUrl: e.target.value })}
              placeholder="https://drive.google.com/... or verification link"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsInternModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold shadow-2xs transition-colors"
            >
              {editingInternshipId ? 'Save Changes' : 'Add Internship'}
            </button>
          </div>
        </form>
      </Modal>

      {/* --- CONFIRMATION MODAL: Delete Internship (Requirement 2) --- */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Delete Internship"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-start gap-3 p-3 bg-rose-50 text-rose-900 border border-rose-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this internship record?</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                This action will permanently remove this record from your profile and recalculated career readiness metrics.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDeleteInternship(deleteConfirmId)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold shadow-2xs"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Modals for Adding Other Records */}
      {/* 1. Naan Mudhalvan Modal */}
      <Modal isOpen={isNmModalOpen} onClose={() => setIsNmModalOpen(false)} title="Add Naan Mudhalvan Training Record">
        <form onSubmit={handleAddNmRecord} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Course / Training Program Name *</label>
            <input
              type="text"
              required
              value={newNm.courseName}
              onChange={(e) => setNewNm({ ...newNm, courseName: e.target.value })}
              placeholder="e.g. Advanced Cloud Architectures"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Training Partner Organization</label>
            <input
              type="text"
              value={newNm.partnerOrganization}
              onChange={(e) => setNewNm({ ...newNm, partnerOrganization: e.target.value })}
              placeholder="e.g. TNSDC / IBM SkillsBuild"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Skills Learned (comma-separated)</label>
            <input
              type="text"
              value={newNm.skillsLearned}
              onChange={(e) => setNewNm({ ...newNm, skillsLearned: e.target.value })}
              placeholder="e.g. Docker, Kubernetes, Linux"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Status</label>
              <select
                value={newNm.status}
                onChange={(e) => setNewNm({ ...newNm, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Enrolled">Enrolled</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Grade or Score</label>
              <input
                type="text"
                value={newNm.gradeOrScore}
                onChange={(e) => setNewNm({ ...newNm, gradeOrScore: e.target.value })}
                placeholder="e.g. Grade A+ (94%)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNmModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. Skill Modal */}
      <Modal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} title="Add Technical or Soft Skill">
        <form onSubmit={handleAddSkill} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Skill Name *</label>
            <input
              type="text"
              required
              value={newSkill.skillName}
              onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
              placeholder="e.g. Python FastApi"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Technical">Technical</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Analytical">Analytical</option>
                <option value="Domain">Domain</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Self-Proficiency</label>
              <select
                value={newSkill.selfProficiency}
                onChange={(e) => setNewSkill({ ...newSkill, selfProficiency: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Evidence / Projects Used</label>
            <textarea
              rows={2}
              value={newSkill.evidenceDescription}
              onChange={(e) => setNewSkill({ ...newSkill, evidenceDescription: e.target.value })}
              placeholder="e.g. Built microservices architecture during college project."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSkillModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Skill
            </button>
          </div>
        </form>
      </Modal>

      {/* 3. Cert Modal */}
      <Modal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} title="Add Certification">
        <form onSubmit={handleAddCert} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Certificate Title *</label>
            <input
              type="text"
              required
              value={newCert.title}
              onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
              placeholder="e.g. Oracle Database SQL Associate"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Issuing Organization</label>
            <input
              type="text"
              value={newCert.issuingOrg}
              onChange={(e) => setNewCert({ ...newCert, issuingOrg: e.target.value })}
              placeholder="e.g. Oracle / Coursera"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Issue Date</label>
              <input
                type="date"
                value={newCert.issueDate}
                onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Credential ID</label>
              <input
                type="text"
                value={newCert.credentialId}
                onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                placeholder="e.g. ORCL-88991"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCertModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Certificate
            </button>
          </div>
        </form>
      </Modal>

      {/* 4. Project Modal */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Add Project">
        <form onSubmit={handleAddProject} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="e.g. College Library Automation"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={2}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Short summary of project features and impact..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Technologies Used (comma-separated)</label>
            <input
              type="text"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              placeholder="React, TypeScript, Express, PostgreSQL"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
