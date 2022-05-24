import './OrgUserInvite.css'
import axios from 'axios'
import { useState } from 'react'
import errorslist from './errors.json'
import ErrorModal from '../../../modals/ErrorModal/ErrorModal'

const serverurl = 'http://localhost:8080'
function OrgUserInvite() {
    const [email, setEmail] = useState('')

    const [error, setError] = useState(errorslist['default'])

    const closeError = async () => {
        const red = error.redirect
        await setError(errorslist['default'])
        if (red) {
            window.location.replace(red)
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleInvite = async (e) => {
        e.preventDefault()
        const headers = {
            'x-access-token': localStorage.getItem('admin'),
        }
        try {
            const response = await axios.get(
                `${serverurl}/org/invite/${email}`,
                {
                    headers: headers,
                }
            )

            if (response.status === 200) {
                setError(errorslist['200'])
            }
        } catch (err) {
            setError(errorslist[err.response.status])
        }
    }

    return (
        <div className="orginviteuser-container">
            {error.show && <ErrorModal error={error} close={closeError} />}
            <h1>Invite User</h1>

            <div className="orginviteuser-main">
                <form onSubmit={handleInvite}>
                    <input
                        type="email"
                        name="name"
                        placeholder="Enter the email of the user you want to invite"
                        onChange={handleChange}
                    />
                    <button type="submit">Invite</button>
                </form>
            </div>
        </div>
    )
}

export default OrgUserInvite
