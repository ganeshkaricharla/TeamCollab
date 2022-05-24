import React, { useEffect, useState } from 'react'
import './LeadRegister.css'

import Logo from '../../../components/Logo/Logo'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
const serverurl = 'http://localhost:8080'

function LeadRegister() {
    const [urlParams, urlParamsFunctions] = useSearchParams()
    const [email, setEmail] = useState(urlParams.get('email'))
    const [orgcode, setOrgCode] = useState(urlParams.get('orgcode'))
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleUserRegister = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
            name: name,
            organisationCode: orgcode,
        }
        axios
            .post(`${serverurl}/user/register`, user, {
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res)
                window.location.href = '/login'
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="lead-register-container">
            <Logo />
            <form className="lead-register-form" onSubmit={handleUserRegister}>
                <h1>Join the Organisation</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <input type="text" name="email" value={email} disabled />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default LeadRegister
