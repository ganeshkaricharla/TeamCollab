import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//import pages
import OrgLogin from './../pages/Organisation/OrgLogin/OrgLogin'
import OrgRegister from './../pages/Organisation/OrgRegister/OrgRegister'
import OrgDashboard from '../pages/Organisation/OrgDashboard/OrgDashboard'

//import  lead pages
import LeadRegister from './../pages/Leads/LeadRegister/LeadRegister'
import LeadLogin from '../pages/Leads/LeadLogin/LeadLogin'
import LeadDashboard from '../pages/Leads/LeadDashboard/LeadDashboard'

// Function writings.
function App() {
    return (
        <div className="app-container">
            <Router>
                <Routes>
                    <Route path="/login" element={<LeadLogin />} />
                    <Route path="/register" element={<LeadRegister />} />
                    <Route path="/dashboard" element={<LeadDashboard />} />
                    <Route path="/org/dashboard" element={<OrgDashboard />} />
                    <Route path="/org/register" element={<OrgRegister />} />
                    <Route path="/org/login" element={<OrgLogin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
