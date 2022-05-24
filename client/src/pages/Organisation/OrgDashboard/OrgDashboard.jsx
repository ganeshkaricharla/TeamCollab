import './OrgDashboard.css'
import axios from 'axios'
//page imports
import Logo from '../../../components/Logo/Logo'
import Logout from '../../../components/Logout/Logout'
import OrgNameUpdate from '../../../components/Organisation/OrgNameUpdate/OrgNameUpdate'
import OrgPasswordUpdate from '../../../components/Organisation/OrgPasswordUpdate/OrgPasswordUpdate'
import { useState, useEffect } from 'react'
import OrgUsers from '../../../components/Organisation/OrgUsers/OrgUsers'
import OrgDelete from '../../../components/Organisation/OrgDelete/OrgDelete'
import OrgUserInvite from '../../../components/Organisation/OrgUserInvite/OrgUserInvite'
import OrgInviteUsers from '../../../components/Organisation/OrgInviteUsers/OrgInviteUsers'
const serverurl = 'http://localhost:8080'

function OrgDashboard() {
    const [orgName, setOrgName] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('admin')
        if (!token) {
            window.location.href = '/'
        }

        console.log(localStorage.getItem('admin'))
        const headers = {
            'x-access-token': localStorage.getItem('admin'),
        }
        console.log(headers)
        axios
            .get(`${serverurl}/org/orgname`, { headers: headers })
            .then((res) => {
                console.log(res.data)
                setOrgName(res.data.org)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="orgdashboard-container">
            <Logo />
            <div className="orgdashboard-main">
                <div className="orgdashboard-left">
                    <OrgUserInvite />
                    <OrgUsers />
                    <OrgInviteUsers />
                </div>

                <div className="orgdashboard-right">
                    <OrgNameUpdate name={orgName} />
                    <OrgPasswordUpdate />
                    <OrgDelete name={orgName} />
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default OrgDashboard
