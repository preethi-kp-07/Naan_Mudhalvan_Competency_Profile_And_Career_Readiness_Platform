import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Bell,
  Eye,
  ShieldCheck,
  Check,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageToggle } from '../../components/common/LanguageToggle';

export const StudentSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

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
      setPasswordFeedback(t('settings.fillAllPasswordFields'));
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback(t('settings.passwordMinLength'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback(t('settings.passwordsDoNotMatch'));
      return;
    }

    setPasswordFeedback(t('settings.passwordUpdated'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordFeedback(null), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6 pb-12 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('settings.studentPageTitle')}</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('settings.studentPageSubtitle')}
        </p>
      </div>

      {/* Role Protection Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 block">{t('settings.rbacBannerTitle')}</span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t('settings.rbacBannerDesc')}
          </p>
        </div>
      </div>

      {/* Language Preference Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t('settings.languagePrefTitle')}</h2>
              <p className="text-xs text-slate-500">
                {t('settings.languagePrefDesc')}
              </p>
            </div>
          </div>

          <LanguageToggle className="border border-slate-200" />
        </div>
      </div>

      {/* Security: Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-700" />
          <span>{t('settings.changePassword')}</span>
        </h2>

        {passwordFeedback && (
          <div
            className={`p-3 rounded-lg text-xs ${
              passwordFeedback.includes('successfully') || passwordFeedback.includes('வெற்றிகரமாக')
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {passwordFeedback}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-3 text-xs max-w-md">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('settings.currentPassword')}</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('settings.newPassword')}</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={language === 'ta' ? 'குறைந்தது 6 எழுத்துகள்' : 'Min 6 characters'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">{t('settings.confirmNewPassword')}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={language === 'ta' ? 'புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்' : 'Re-enter new password'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              {t('settings.updatePasswordBtn')}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-700" />
          <span>{t('settings.notificationsTitle')}</span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">{t('settings.facultyInterventionsAlert')}</span>
              <span className="text-[11px] text-slate-500">
                {t('settings.facultyInterventionsAlertDesc')}
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
              <span className="font-bold text-slate-800 block">{t('settings.deadlineRemindersAlert')}</span>
              <span className="text-[11px] text-slate-500">
                {t('settings.deadlineRemindersAlertDesc')}
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
              <span className="font-bold text-slate-800 block">{t('settings.benchmarkAnnouncementsAlert')}</span>
              <span className="text-[11px] text-slate-500">
                {t('settings.benchmarkAnnouncementsAlertDesc')}
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
