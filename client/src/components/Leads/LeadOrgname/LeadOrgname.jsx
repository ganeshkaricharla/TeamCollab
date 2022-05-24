import './LeadOrgname.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const serverurl = 'http://localhost:8080'
function LeadOrgname({ id }) {
    const [orgname, setOrgname] = useState('Fetching..')
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('user'),
    }

    useEffect(() => {
        axios
            .get(`${serverurl}/user/orgname/${id}`, { headers: headers })
            .then((res) => {
                setOrgname(res.data.orgname)
            })
            .catch((err) => {
                console.log(err)
                setOrgname('Error!!')
            })
    }, [id])
    return <span>{orgname}</span>
}

export default LeadOrgname
