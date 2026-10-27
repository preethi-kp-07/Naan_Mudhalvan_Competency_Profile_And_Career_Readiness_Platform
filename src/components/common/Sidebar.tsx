import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  FileCheck2,
  Award,
  Briefcase,
  GitBranch,
  BookOpen,
  History,
  QrCode,
  Settings,
  Users,
  GraduationCap,
  ShieldAlert,
  Sliders,
  BarChart3,
  X,
  Compass,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const studentLinks = [
    { name: t('nav.dashboard'), path: '/student/dashboard', icon: LayoutDashboard },
    { name: t('nav.profile'), path: '/student/profile', icon: UserCheck },
    { name: t('nav.assessment'), path: '/student/assessment', icon: FileCheck2 },
    { name: t('nav.competencyProfile'), path: '/student/competency-profile', icon: Award },
    { name: t('nav.careerMatching'), path: '/student/career-matching', icon: Briefcase },
    { name: t('nav.skillGaps'), path: '/student/skill-gaps', icon: GitBranch },
    { name: t('nav.learningMaterials'), path: '/student/learning-materials', icon: BookOpen },
    { name: t('nav.progressHistory'), path: '/student/progress-history', icon: History },
    { name: t('nav.skillPassport'), path: '/student/skill-passport', icon: QrCode },
    { name: t('nav.settings'), path: '/student/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: t('nav.adminDashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { name: t('nav.studentOverview'), path: '/admin/students', icon: Users },
    { name: t('nav.assessmentManagement'), path: '/admin/assessments', icon: FileCheck2 },
    { name: t('nav.adminMaterials'), path: '/admin/learning-materials', icon: BookOpen },
    { name: t('nav.interventions'), path: '/admin/interventions', icon: ShieldAlert },
    { name: t('nav.careers'), path: '/admin/careers', icon: GraduationCap },
    { name: t('nav.reports'), path: '/admin/reports', icon: BarChart3 },
    { name: t('nav.adminSettings'), path: '/admin/settings', icon: Sliders },
  ];

  const links = role === 'student' ? studentLinks : adminLinks;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B2545] text-white flex flex-col transition-transform duration-200 ease-in-out border-r border-[#133E87] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 bg-[#07192F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">NAAN MUDHALVAN</h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-wider font-medium">
                {t('common.platformTitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-blue-300/70">
            {role === 'student' ? t('nav.studentNav') : t('nav.facultyNav')}
          </div>

          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-300'}`} />
                <span className="truncate">{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-white/10 bg-[#07192F]/60 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-medium capitalize">
              {role === 'admin' ? t('common.facultyAdminHub') : t('common.studentWorkspace')}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-2">
            {t('common.platformSubtitle')}
          </p>
        </div>
      </aside>
    </>
  );
};
