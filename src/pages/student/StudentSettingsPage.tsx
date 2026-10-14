import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Bell,
  Eye,
  ShieldCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentSettingsPage: React.FC = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [facultyInterventions, setFacultyInterventions] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordFeedback('Please complete all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback('New passwords do not match.');
      return;
    }

    setPasswordFeedback('Password updated successfully! (Demonstration state)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordFeedback(null), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6 pb-12 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account & Privacy Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your credentials, notification preferences, and data privacy controls
        </p>
      </div>

      {/* Role Protection Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 block">Enforced Role-Based Access Control</span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Your account is assigned the <strong>Student</strong> role. In accordance with platform security specifications, students cannot elevate their permissions to Faculty or Admin.
          </p>
        </div>
      </div>

      {/* Security: Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-700" />
          <span>Change Password</span>
        </h2>

        {passwordFeedback && (
          <div
            className={`p-3 rounded-lg text-xs ${
              passwordFeedback.includes('successfully')
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {passwordFeedback}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-3 text-xs max-w-md">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-700" />
          <span>Notification & Alert Preferences</span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Faculty Learning Material Assignments</span>
              <span className="text-[11px] text-slate-500">
                Receive notifications when professors assign remedial notes or tasks
              </span>
            </div>
            <input
              type="checkbox"
              checked={facultyInterventions}
              onChange={(e) => setFacultyInterventions(e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Upcoming Assignment Deadlines</span>
              <span className="text-[11px] text-slate-500">
                Reminder alerts 48 hours prior to resource target due dates
              </span>
            </div>
            <input
              type="checkbox"
              checked={deadlineReminders}
              onChange={(e) => setDeadlineReminders(e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Assessment Benchmark Announcements</span>
              <span className="text-[11px] text-slate-500">
                Semester diagnostic test window schedules and score updates
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-blue-600"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
