import './Logout.css'
import { useState } from 'react'

function Logout() {
    const [logout, setLogout] = useState(false)
    const handleLogout = () => {
        setLogout(true)
        localStorage.removeItem('admin')
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }

    return (
        <div className={`logout-container ${logout && 'logout-animate'}`}>
            <h1>Logout</h1>
            <p>is the Hardest button to click, </p>
            <p>but still here it is.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout
