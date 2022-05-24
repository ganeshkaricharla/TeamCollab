import './SingleTask.css'
import axios from 'axios'
const serverurl = 'http://localhost:8080'
function SingleTask({ id, task, refresh }) {
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('user'),
    }
    const data = {
        taskId: task._id,
        orgId: id,
    }
    const check = () => {
        axios
            .patch(`${serverurl}/task/changestatus`, data, {
                headers: headers,
            })
            .then((res) => {
                // console.log(res)false
                refresh()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="singletask-container">
            <div className="singletask-checkbox">
                {task.status ? (
                    <i className="fa-regular fa-circle" onClick={check}></i>
                ) : (
                    <i className="fa-solid fa-circle" onClick={check}></i>
                )}
            </div>
            <div className="singletask-text">
                <p className={`${!task.status && 'singletask-completed'}`}>
                    {task.task}
                </p>
            </div>
        </div>
    )
}

export default SingleTask
