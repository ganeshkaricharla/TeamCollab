import { useEffect, useState } from 'react'
import axios from 'axios'
import errorslist from './errors.json'
import './OrgNameUpdate.css'
import ErrorModal from '../../../modals/ErrorModal/ErrorModal'
const serverurl = 'http://localhost:8080'

function OrgNameUpdate({ name }) {
    console.log(name)
    const [orgName, setOrgName] = useState(name)

    const [error, setError] = useState(errorslist['default'])

    const closeError = async () => {
        const red = error.redirect
        await setError(errorslist['default'])
        if (red) {
            window.location.replace(red)
        }
    }

    const handleChange = (e) => {
        setOrgName(e.target.value)
    }

    const handleNameUpdate = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('admin'),
        }
        try {
            const response = await axios.patch(
                `${serverurl}/org/editdetails`,
                {
                    name: orgName,
                },
                {
                    headers: headers,
                }
            )
            setError(errorslist[response.status])
        } catch (err) {
            console.log(err)
            setError(errorslist[err.response.status])
        }
    }

    useEffect(() => {
        setOrgName(name)
    }, [name])

    return (
        <div className="orgnameupdate-container">
            {error.show && <ErrorModal error={error} close={closeError} />}
            <h1>Update Name of the organisation</h1>
            <p>
                you can update the organisation name, only condition is it has
                to be unique.
            </p>
            <form onSubmit={handleNameUpdate}>
                <input
                    type="text"
                    name="name"
                    value={orgName}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default OrgNameUpdate
