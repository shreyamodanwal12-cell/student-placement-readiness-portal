import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import WorkspaceLayout from './components/layout/WorkspaceLayout'
import DashboardPage from "./pages/dashboard/DashboardPage"
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CoordinatorLoginPage from './pages/coordinator/CoordinatorLoginPage'
import CoordinatorDashboardPage from './pages/coordinator/CoordinatorDashboardPage'
import StudentsListPage from './pages/coordinator/StudentsListPage'
import StudentDetailsPage from './pages/coordinator/StudentDetailsPage'
import ProfilePage from './pages/profile/ProfilePage'
import ResumePage from './pages/resume/ResumePage'
import SettingsPage from './pages/settings/SettingsPage'
import SkillsPage from "./pages/skills/SkillsPage";
import ProjectsPage from './pages/projects/ProjectsPage'
import AchievementsPage from "./pages/achievements/AchievementsPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import AddJobPage from './pages/jobs/AddJobPage'
import JobsPage from './pages/jobs/JobsPage'
import ApplicationsPage from './pages/coordinator/ApplicationsPage'
import MockTestsPage from "./pages/mocktests/MockTestsPage";
import MockTestAttemptPage from "./pages/mocktests/MockTestAttemptPage";
import MockTestResultPage from "./pages/mocktests/MockTestResultPage";
import MockTestResultsPage from './pages/coordinator/MockTestResultsPage'
import ResourcesPage from "./pages/resources/ResourcesPage";
import AddResourcePage from "./pages/resources/AddResourcePage";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboardPage />} />
        <Route path="/students" element={<StudentsListPage />} />
        <Route path="/students/:id" element={<StudentDetailsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route
    path="/mock-results"
    element={<MockTestResultPage />}
  />
        
      <Route element={<WorkspaceLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
  path="/achievements"
  element={<AchievementsPage />}
/> 
        <Route
  path="/documents"
  element={<DocumentsPage />}
/>
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/mock-tests" element={<MockTestsPage />} />
<Route
  path="/mock-tests/:id"
  element={<MockTestAttemptPage />}
/>
<Route
  path="/mock-tests/result"
  element={<MockTestResultPage />}
/>
<Route path="/resources" element={<ResourcesPage />} />
  <Route path="/add-resource" element={<AddResourcePage />} />
      </Route>

      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/coordinator-login" element={<CoordinatorLoginPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
      



    </Routes>
    
  )
}

export default App
