import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home'
import RegisterPage from '../pages/RegisterPage'
import Overview from '../dashboard/Overview'
import AdminDashboard from '../dashboard/AdminDashboard'
import Forums from '../dashboard/Forums'
import Users from '../dashboard/Users'
import Budget from '../dashboard/Budget'
import Documents from '../dashboard/Documents'
import ForumsPage from '../pages/ForumsPage'
import PetitionsPage from '../pages/PetitionsPage'
import ReportIssuesPage from '../pages/ReportIssuesPage'
import PublicNoticesPage from '../pages/PublicNoticesPage'
import LoginPage from '../pages/LoginPage'


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route  path='/login' element={<LoginPage />} />
            <Route  path='forums' element={<ForumsPage />}/>
            <Route path='petitions' element={<PetitionsPage />} />
            <Route path='report'  element={<ReportIssuesPage />} />
            <Route  path='notices' element={<PublicNoticesPage />}/>
            {/* admin */}
            <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Overview />} />
          <Route path="forums" element={<Forums />} />
          
          <Route path="users" element={<Users />} />
          <Route path="budget" element={<Budget />} />
          <Route path="documents" element={<Documents />} />
          
          {/* Add other routes here */}
        </Route>
          </Routes>
        </main>
      
      </div>
    </Router>
  )
}

export default App
