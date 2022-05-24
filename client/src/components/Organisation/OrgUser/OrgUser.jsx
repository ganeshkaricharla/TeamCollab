import './OrgUser.css'
function OrgUser({ name, email }) {
    return (
        <div className="orguser-container">
            <div className="orguser-avatar">
                {name && (
                    <img
                        src="https://media0.giphy.com/media/juEU9TK8101hdQmiXC/giphy.gif?cid=ecf05e47daszzr6lo9a9gnyz8ry6yn3ycfnnflgqcwhvcevr&rid=giphy.gif&ct=g"
                        alt="avatar"
                    />
                )}
            </div>
            <div className="orguser-info">
                {name && <h1>{name}</h1>}
                {email && <p>{email}</p>}
            </div>
        </div>
    )
}

export default OrgUser
