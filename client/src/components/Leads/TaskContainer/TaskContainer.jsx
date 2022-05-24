import TaskInput from '../TaskInput/TaskInput'
import Tasks from '../Tasks/Tasks'
import './TaskContainer.css'
import { useState, useEffect } from 'react'

function TaskContainer({ id }) {
    const [refresh, setRefresh] = useState(false)

    const changeRefresh = () => {
        setRefresh(!refresh)
    }
    return (
        <div className="taskcontainer-container">
            <TaskInput id={id} changeRefresh={changeRefresh} />
            <Tasks id={id} refresh={refresh} changeRefresh={changeRefresh} />
        </div>
    )
}

export default TaskContainer
