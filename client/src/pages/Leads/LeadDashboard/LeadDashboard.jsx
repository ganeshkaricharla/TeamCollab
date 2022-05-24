import './LeadDashboard.css'
import LeadSidebar from './../../../components/Leads/LeadSidebar/LeadSidebar'
import Logo from './../../../components/Logo/Logo'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskContainer from '../../../components/Leads/TaskContainer/TaskContainer'
import LeadLogout from '../../../components/LeadLogout/LeadLogout'
const serverurl = 'http://localhost:8080'
function LeadDashBoard() {
    const [lead, setLead] = useState(null)
    const [currOrgid, setCurrOrgid] = useState(null)

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('user'),
    }
    useEffect(() => {
        axios
            .get(`${serverurl}/user/getuser`, { headers: headers })
            .then((res) => {
                setLead(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return lead ? (
        <div className="leaddashboard-container">
            <div className="leaddashboard-topbar">
                <Logo />
                <h1 className="leaddashboard-heading">Lead Dashboard</h1>
                <LeadLogout />
            </div>
            <div className="leaddashboard-content">
                <LeadSidebar
                    orgids={lead.organisationCode}
                    click={setCurrOrgid}
                    currid={currOrgid}
                />
                {currOrgid ? (
                    <TaskContainer id={currOrgid} />
                ) : (
                    <div className="taskcontainer-container">
                        Select an organisation
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div>Loading...</div>
    )
}

export default LeadDashBoard
