import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../components/AuthContext'; // Import the AuthProvider
import Home from '../pages/Home';
import RegisterPage from '../pages/RegisterPage';
import Overview from '../dashboard/Overview';
import AdminDashboard from '../dashboard/AdminDashboard';
import Forums from '../dashboard/Forums';
import Users from '../dashboard/Users';
import Budget from '../dashboard/Budget';
import Documents from '../dashboard/Documents';
import ForumsPage from '../pages/ForumsPage';
import PetitionsPage from '../pages/PetitionsPage';
import ReportIssuesPage from '../pages/ReportIssuesPage';
import PublicNoticesPage from '../pages/PublicNoticesPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoutes';
import PublicNotices from '../dashboard/PublicNotices'
import PollsPage from '../pages/PollsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          
          <main className="flex-grow">
            <Routes>
              {/* Unprotected Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/forums" element={<ForumsPage />} />
                <Route path="/petitions" element={<PetitionsPage />} />
                <Route path='/polls' element={<PollsPage />} />
                <Route path="/report" element={<ReportIssuesPage />} />
                <Route path="/notices" element={<PublicNoticesPage />} />
                <Route path="/admin" element={<AdminDashboard />}>
                
                  <Route index element={<Overview />} />
                  <Route path="forums" element={<Forums />} />
                  <Route path="users" element={<Users />} />
                  <Route path="budget" element={<Budget />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="notices" element={<PublicNotices />} />
                </Route>
              </Route>
            </Routes>
          </main>
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;