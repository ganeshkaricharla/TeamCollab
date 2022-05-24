import React, { useEffect } from 'react'
import OrgUser from '../OrgUser/OrgUser'
import axios from 'axios'
import './OrgInviteUsers.css'

const serverurl = 'http://localhost:8080'
function OrgInviteUsers() {
    const [users, setUsers] = React.useState(null)
    useEffect(() => {
        const headers = {
            'x-access-token': localStorage.getItem('admin'),
        }
        axios
            .get(`${serverurl}/org/invitedusers`, {
                headers: headers,
            })
            .then((res) => {
                setUsers(res.data.invited)
                console.log(res.data)
            })
            .catch((err) => {
                console.log('err')
            })
    }, [])

    return (
        <div className="orgusers-container">
            <h1>Invited Users</h1>
            <div className="orgusers-container-inner">
                {users &&
                    users.map((user) => {
                        return <OrgUser key={user} email={user} />
                    })}
            </div>
        </div>
    )
}

export default OrgInviteUsers
