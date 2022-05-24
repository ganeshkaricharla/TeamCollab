import { useState } from 'react'
import './OrgDelete.css'
import axios from 'axios'

const serverurl = 'http://localhost:8080'
function OrgPasswordUpdate({ name }) {
    const [orgName, setOrgName] = useState('')

    const handleChange = (e) => {
        setOrgName(e.target.value)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const headers = {
            'x-access-token': localStorage.getItem('admin'),
        }
        try {
            const data = await axios.delete(`${serverurl}/org/delete`, {
                headers: headers,
            })
            if (data.status === 200) {
                window.location.replace('org/register')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="orgdelete-container">
            <h1>Delete this Organisation.</h1>
            <p>
                hey, delete this , this isn't wrong you are just saving space in
                our storage
            </p>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your Organisation name"
                    onChange={handleChange}
                />
                <button type="submit" disabled={orgName !== name}>
                    Delete
                </button>
            </form>
        </div>
    )
}

export default OrgPasswordUpdate
