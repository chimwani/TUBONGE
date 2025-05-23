import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../components/AuthContext';
import Home from '../pages/Home';
import RegisterPage from '../pages/RegisterPage';
import Overview from '../dashboard/Overview';
import AdminDashboard from '../dashboard/AdminDashboard';
import Forums from '../dashboard/Forums';
import Users from '../dashboard/Users';
import Budget from '../dashboard/Budget';
import Documents from '../dashboard/Documents';
import Polls from '../dashboard/Polls';
import ForumsPage from '../pages/ForumsPage';
import PetitionsPage from '../pages/PetitionsPage';
import ReportIssuesPage from '../pages/ReportIssuesPage';
import PublicNoticesPage from '../pages/PublicNoticesPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoutes';
import PublicNotices from '../dashboard/PublicNotices';
import PollsPage from '../pages/PollsPage';
import AdminRoutePage from '../pages/AdminRoutePage';
import AboutPage from '../pages/AboutPage'
import UserProfile from '../pages/UserProfile'

function App() {
  return (
   
      
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/adminroute'  element={<AdminRoutePage  />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path='/profile' element={<UserProfile />} />

              {/* Admin Routes (Unprotected) */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<Overview />} />
                <Route path="forums" element={<Forums />} />
                <Route path="users" element={<Users />} />
                <Route path="budget" element={<Budget />} />
                <Route path="documents" element={<Documents />} />
                <Route path="notices" element={<PublicNotices />} />
                <Route path="polls" element={<Polls />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/forums" element={<ForumsPage />} />
                <Route path="/petitions" element={<PetitionsPage />} />
                <Route path="/polls" element={<PollsPage />} />
                <Route path="/report" element={<ReportIssuesPage />} />
                <Route path="/notices" element={<PublicNoticesPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      
  );
}

export default App;