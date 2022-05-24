import React, { useEffect } from 'react'
import OrgUser from '../OrgUser/OrgUser'
import axios from 'axios'
import './OrgUsers.css'

const serverurl = 'http://localhost:8080'
function OrgUsers() {
    const [users, setUsers] = React.useState(null)
    useEffect(() => {
        const headers = {
            'x-access-token': localStorage.getItem('admin'),
        }
        axios
            .get(`${serverurl}/org/users`, {
                headers: headers,
            })
            .then((res) => {
                setUsers(res.data.userdata)
                console.log(res.data)
            })
            .catch((err) => {
                console.log('err')
            })
    }, [])

    return (
        <div className="orgusers-container">
            <h1>Users</h1>
            <div className="orgusers-container-inner">
                {users &&
                    users.map((user) => (
                        <OrgUser
                            key={user._id}
                            name={user.name}
                            email={user.email}
                        />
                    ))}
            </div>
        </div>
    )
}

export default OrgUsers
