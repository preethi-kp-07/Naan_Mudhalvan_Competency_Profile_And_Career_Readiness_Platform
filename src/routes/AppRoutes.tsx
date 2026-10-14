import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { PublicSkillPassportPage } from '../pages/public/PublicSkillPassportPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';
import { CompetencyAssessmentPage } from '../pages/student/CompetencyAssessmentPage';
import { CompetencyProfilePage } from '../pages/student/CompetencyProfilePage';
import { CareerMatchingPage } from '../pages/student/CareerMatchingPage';
import { SkillGapRoadmapPage } from '../pages/student/SkillGapRoadmapPage';
import { LearningMaterialsPage } from '../pages/student/LearningMaterialsPage';
import { ProgressHistoryPage } from '../pages/student/ProgressHistoryPage';
import { SkillPassportPage } from '../pages/student/SkillPassportPage';
import { StudentSettingsPage } from '../pages/student/StudentSettingsPage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { StudentOverviewPage } from '../pages/admin/StudentOverviewPage';
import { AssessmentManagementPage } from '../pages/admin/AssessmentManagementPage';
import { LearningMaterialManagementPage } from '../pages/admin/LearningMaterialManagementPage';
import { SkillGapInterventionPage } from '../pages/admin/SkillGapInterventionPage';
import { CareerManagementPage } from '../pages/admin/CareerManagementPage';
import { ReportsAnalyticsPage } from '../pages/admin/ReportsAnalyticsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/passport/:shareId" element={<PublicSkillPassportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Student Portal */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="assessment" element={<CompetencyAssessmentPage />} />
        <Route path="competency-profile" element={<CompetencyProfilePage />} />
        <Route path="career-matching" element={<CareerMatchingPage />} />
        <Route path="skill-gaps" element={<SkillGapRoadmapPage />} />
        <Route path="learning-materials" element={<LearningMaterialsPage />} />
        <Route path="progress-history" element={<ProgressHistoryPage />} />
        <Route path="skill-passport" element={<SkillPassportPage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
      </Route>

      {/* Faculty / Admin Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentOverviewPage />} />
        <Route path="assessments" element={<AssessmentManagementPage />} />
        <Route path="learning-materials" element={<LearningMaterialManagementPage />} />
        <Route path="interventions" element={<SkillGapInterventionPage />} />
        <Route path="careers" element={<CareerManagementPage />} />
        <Route path="reports" element={<ReportsAnalyticsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
