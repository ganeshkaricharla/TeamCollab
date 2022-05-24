import './Tasks.css'
import SingleTask from '../SingleTask/SingleTask'
import { useState, useEffect } from 'react'
import axios from 'axios'

const serverurl = 'http://localhost:8080'

function Tasks({ id, refresh, changeRefresh }) {
    const [notcompleted, setNotCompleted] = useState(null)
    const [completed, setCompleted] = useState(null)
    const [state, setState] = useState('notcompleted')

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('user'),
    }

    useEffect(() => {
        axios
            .get(`${serverurl}/task/gettask/${id}`, { headers: headers })
            .then((res) => {
                const alltasks = res.data.data
                const completed = alltasks.filter(
                    (task) => task.status === false
                )
                const notcompleted = alltasks.filter(
                    (task) => task.status === true
                )

                setNotCompleted(notcompleted)
                setCompleted(completed)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, refresh])

    return (
        <div className="tasks-container">
            <button
                onClick={() => {
                    state === 'completed'
                        ? setState('notcompleted')
                        : setState('completed')
                }}
            >
                {state === 'completed' ? 'Not Completed ?' : 'Completed?'}
            </button>
            {state == 'completed'
                ? completed &&
                  completed.map((task) => (
                      <SingleTask
                          key={task._id}
                          id={id}
                          task={task}
                          refresh={changeRefresh}
                      />
                  ))
                : notcompleted &&
                  notcompleted.map((task) => (
                      <SingleTask
                          key={task._id}
                          id={id}
                          task={task}
                          refresh={changeRefresh}
                      />
                  ))}
        </div>
    )
}

export default Tasks

// return <SingleTask key={task._id} id={id} task={task} refresh={changeRefresh} />
