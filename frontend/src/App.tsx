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


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
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
