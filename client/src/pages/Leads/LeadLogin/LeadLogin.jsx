import { useState } from 'react'
import './LeadLogin.css'
import axios from 'axios'

const serverurl = 'http://localhost:8080'

function LeadLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        axios
            .post(`${serverurl}/user/login`, user, {
                headers: { 'content-type': 'application/json' },
            })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    localStorage.setItem('user', res.data.token)
                    window.location.href = '/dashboard'
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="leadlogin-container">
            <form className="leadllogin-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LeadLogin
