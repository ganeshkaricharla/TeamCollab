import './TaskInput.css'
import { useState } from 'react'
import axios from 'axios'

const serverurl = 'http://localhost:8080'

function TaskInput({ id, changeRefresh }) {
    const [task, setTask] = useState('')
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('user'),
    }
    const data = {
        orgId: id,
        task: task,
    }

    const handleSubmit = (e) => {
        if (task.length > 0) {
            e.preventDefault()
            console.log(task)
            axios
                .post(`${serverurl}/task/addtask`, data, { headers: headers })
                .then((res) => {
                    console.log(res)
                    setTask('')
                    changeRefresh()
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            e.preventDefault()
            alert('Task should be there')
            changeRefresh()
        }
    }

    return (
        <form className="task-input" onSubmit={handleSubmit}>
            <input
                type="text"
                name="task"
                placeholder="Enter task to add"
                value={task}
                onChange={(e) => {
                    setTask(e.target.value)
                }}
            />
        </form>
    )
}

export default TaskInput
