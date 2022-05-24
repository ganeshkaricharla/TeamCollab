import React from 'react'

function LeadLogout() {
    const userLogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return <button onClick={userLogout}>LeadLogout</button>
}

export default LeadLogout
