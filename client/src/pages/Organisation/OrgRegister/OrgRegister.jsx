//react imports
import { Link } from 'react-router-dom'
import './OrgRegister.css'
import { useState } from 'react'
import axios from 'axios'
import Logo from '../../../components/Logo/Logo'
import ErrorModal from '../../../modals/ErrorModal/ErrorModal'
import errorslist from './errors.json'
const serverurl = 'http://localhost:8080/'

function OrgRegister() {
    const [orgdata, setOrgData] = useState({
        name: '',
        passkey: '',
    })

    const [error, setError] = useState(errorslist['default'])

    const closeError = async () => {
        const red = error.redirect
        await setError(errorslist['default'])
        if (red) {
            window.location.replace(red)
        }
    }

    const handleInputChange = (e) => {
        setOrgData({
            ...orgdata,
            [e.target.name]: e.target.value,
        })
    }

    const handleOrganisationRegister = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
        try {
            const response = await axios.post(
                serverurl + 'org/register',
                orgdata,
                headers
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
            if (err.response.status === 404) {
                setError(errorslist['404'])
            }
        }
    }

    return (
        <div className="orgregister-container">
            {error.show && <ErrorModal error={error} close={closeError} />}
            <Logo />
            <div className="orgregister-register-window">
                <div className="orgregister-left">
                    <h2 className="orgregister-window-title">
                        Create a organisation
                    </h2>
                    <form
                        className="orgregister-form"
                        onSubmit={handleOrganisationRegister}
                    >
                        <div className="orgregister-name-input-container">
                            <label>Organisation Name</label>
                            <input
                                type="text"
                                placeholder="Enter Unique Organisation name"
                                required
                                name="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="orgregister-name-input-container">
                            <label>Organisation Passkey</label>
                            <input
                                type="password"
                                placeholder="Enter new Organisation Passkey"
                                pattern="[a-zA-Z0-9@!#$%^&*()]{6,}"
                                required
                                name="passkey"
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="orgregister-form-submit"
                        >
                            Create
                        </button>
                    </form>
                </div>

                <div className="orgregister-right">
                    <blockquote className="orgregister-blockquote">
                        "hey, you got the best start"
                    </blockquote>
                    <hr />
                    <h2 className="orgregister-alreadytext">
                        Already have an account?
                    </h2>
                    <Link
                        to={'/org/login'}
                        className="orgregister-login-button"
                    >
                        Login <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrgRegister
