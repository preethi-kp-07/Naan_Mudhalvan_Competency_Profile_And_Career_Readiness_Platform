import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  User as UserIcon,
  LogOut,
  Sparkles,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_NOTIFICATIONS } from '../../data/mockData';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, role, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifications = INITIAL_NOTIFICATIONS;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleRoleToggle = () => {
    const nextRole = role === 'student' ? 'admin' : 'student';
    switchDemoRole(nextRole);
    navigate(nextRole === 'student' ? '/student/dashboard' : '/admin/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left: Mobile hamburger & Page Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {role === 'student' ? 'Student Workspace' : 'Faculty / Admin Hub'}
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-600 font-medium truncate max-w-[280px]">
              Naan Mudhalvan Competency & Career Readiness
            </span>
          </div>
        </div>

        {/* Right: Demo Switcher, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Demo Role Switcher Badge */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 px-2 hidden md:inline">
              DEMO ROLE:
            </span>
            <button
              onClick={handleRoleToggle}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all shadow-xs ${
                role === 'student'
                  ? 'bg-blue-700 text-white'
                  : 'bg-emerald-700 text-white'
              }`}
              title="Click to instantly switch between Student and Faculty viewpoints"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Switch to {role === 'student' ? 'Faculty' : 'Student'}</span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-scale-in">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800">Notifications</h4>
                  <span className="text-[11px] text-blue-600 font-medium">3 New</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setShowNotifications(false);
                        if (n.actionUrl) navigate(n.actionUrl);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/30"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name || 'Demo User'}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user?.role === 'admin' ? 'Faculty Admin' : 'Student'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                </div>

                <div className="py-1">
                  {role === 'student' ? (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/student/profile');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>My Profile & Records</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Faculty Settings</span>
                    </button>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
