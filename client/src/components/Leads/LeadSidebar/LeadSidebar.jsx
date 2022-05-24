import './LeadSidebar.css'
import LeadOrgname from '../LeadOrgname/LeadOrgname'

function LeadSidebar({ orgids, click, currid }) {
    return (
        <div className="leadsidebar-container">
            {orgids &&
                orgids.map((orgid) => {
                    return (
                        <h1
                            key={orgid}
                            onClick={() => {
                                click(orgid)
                            }}
                            className={
                                currid === orgid
                                    ? 'leadsidebar-item-active'
                                    : ''
                            }
                        >
                            <LeadOrgname id={orgid} />
                        </h1>
                    )
                })}
        </div>
    )
}

export default LeadSidebar
