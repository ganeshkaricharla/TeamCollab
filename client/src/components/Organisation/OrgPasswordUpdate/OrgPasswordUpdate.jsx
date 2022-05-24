import { useState } from 'react'
import './OrgPasswordUpdate.css'
import axios from 'axios'
import errorslist from './errors.json'
import ErrorModal from '../../../modals/ErrorModal/ErrorModal'

const serverurl = 'http://localhost:8080'
function OrgPasswordUpdate() {
    const [orgPasskey, setOrgPasskey] = useState('')

    const [error, setError] = useState(errorslist['default'])

    const closeError = async () => {
        const red = error.redirect
        await setError(errorslist['default'])
        if (red) {
            window.location.replace(red)
        }
    }
    const handleChange = (e) => {
        setOrgPasskey(e.target.value)
    }

    const handlePasswordUpdate = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('admin'),
        }
        try {
            const response = await axios.patch(
                `${serverurl}/org/editdetails`,
                {
                    passkey: orgPasskey,
                },
                {
                    headers: headers,
                }
            )
            if (response.status === 200) {
                setError(errorslist['200'])
            }
        } catch (err) {
            if (err.response.status === 409) {
                setError(errorslist['409'])
            }
            if (err.response.status === 500) {
                setError(errorslist['500'])
            }
        }
    }

    return (
        <div className="orgpasswordupdate-container">
            {error.show && <ErrorModal error={error} close={closeError} />}
            <h1>Change Password of the organisation</h1>
            <p>
                you can update the password organisation name, your privacy is
                important to us.
            </p>
            <form onSubmit={handlePasswordUpdate}>
                <input
                    type="text"
                    name="passkey"
                    value={orgPasskey}
                    placeholder="Enter your new password"
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default OrgPasswordUpdate
