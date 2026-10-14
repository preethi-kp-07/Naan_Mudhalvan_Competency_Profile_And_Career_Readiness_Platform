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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  const location = useLocation();

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile & Records', path: '/student/profile', icon: UserCheck },
    { name: 'Competency Assessment', path: '/student/assessment', icon: FileCheck2 },
    { name: 'My Competency Profile', path: '/student/competency-profile', icon: Award },
    { name: 'Career Matching & Readiness', path: '/student/career-matching', icon: Briefcase },
    { name: 'Skill Gap & Roadmap', path: '/student/skill-gaps', icon: GitBranch },
    { name: 'Learning Materials', path: '/student/learning-materials', icon: BookOpen },
    { name: 'Progress History', path: '/student/progress-history', icon: History },
    { name: 'My Skill Passport', path: '/student/skill-passport', icon: QrCode },
    { name: 'Settings', path: '/student/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Dashboard & Analytics', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Student Overview', path: '/admin/students', icon: Users },
    { name: 'Assessment Management', path: '/admin/assessments', icon: FileCheck2 },
    { name: 'Learning Materials', path: '/admin/learning-materials', icon: BookOpen },
    { name: 'Skill Gaps & Interventions', path: '/admin/interventions', icon: ShieldAlert },
    { name: 'Career & Competencies', path: '/admin/careers', icon: GraduationCap },
    { name: 'Reports & Cohort Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings & Access Control', path: '/admin/settings', icon: Sliders },
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
                Competency & Readiness
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
            {role === 'student' ? 'Student Navigation' : 'Faculty Admin Portal'}
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
              Role: {role === 'admin' ? 'Faculty Admin' : 'Student'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-2">
            Skill Development Initiative • Academic Project
          </p>
        </div>
      </aside>
    </>
  );
};
