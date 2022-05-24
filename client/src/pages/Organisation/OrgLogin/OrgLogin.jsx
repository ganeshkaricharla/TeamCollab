//react imports
import { Link } from 'react-router-dom'
import './OrgLogin.css'
//page imports
import Logo from '../../../components/Logo/Logo'
import { useState } from 'react'
import axios from 'axios'
import ErrorModal from '../../../modals/ErrorModal/ErrorModal'
import errorslist from './errors.json'
const serverurl = 'http://localhost:8080/'

function OrgLogin() {
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

    const handleOrganisationLogin = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
        try {
            const response = await axios.post(
                serverurl + 'org/login',
                orgdata,
                headers
            )
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('admin', response.data.token)
                window.location.replace('/org/dashboard')
            }
        } catch (err) {
            if (err.response.status === 500) {
                setError(errorslist['500'])
            }
            if (err.response.status === 404) {
                setError(errorslist['404'])
            }
            if (err.response.status === 401) {
                setError(errorslist['401'])
            }
        }
    }

    return (
        <div className="orglogin-container">
            {error.show && <ErrorModal error={error} close={closeError} />}
            <Logo />
            <div className="orglogin-register-window">
                <div className="orglogin-left">
                    <h2 className="orglogin-window-title">
                        Log on to your organization
                    </h2>
                    <form
                        className="orglogin-form"
                        onSubmit={handleOrganisationLogin}
                    >
                        <div className="orglogin-name-input-container">
                            <label>Organisation Name</label>
                            <input
                                type="text"
                                placeholder="Enter Unique Organisation name"
                                required
                                name="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="orglogin-name-input-container">
                            <label>Organisation Passkey</label>
                            <input
                                type="password"
                                placeholder="Enter new Organisation Passkey"
                                required
                                name="passkey"
                                onChange={handleInputChange}
                            />
                        </div>

                        <Link
                            to={'/org/forgotpassword'}
                            className="orglogin-forgot-password"
                        >
                            Forgot Password? click here
                        </Link>
                        <button type="submit" className="orglogin-form-submit">
                            Login
                        </button>
                    </form>
                </div>

                <div className="orglogin-right">
                    <blockquote className="orglogin-blockquote">
                        "hey, you got the best start"
                    </blockquote>
                    <hr />
                    <h2 className="orglogin-alreadytext">
                        don't have an account?
                    </h2>
                    <Link
                        to={'/org/register'}
                        className="orglogin-login-button"
                    >
                        Create here <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrgLogin
