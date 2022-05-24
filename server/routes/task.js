const router = require('express').Router()
const Task = require('../models/tasks.model')
const User = require('../models/user.model')
const Organisation = require('../models/organisation.model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.get('/hello', (req, res) => {
    res.send('Task auth routes')
})

router.post('/addtask', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const decoded = await jwt.verify(
                req.headers['x-access-token'],
                process.env.JWT_SECRET
            )
            const user = await User.findOne({ email: decoded.email })
            if (user) {
                if (user.organisationCode.includes(req.body.orgId)) {
                    const task = {
                        orgId: req.body.orgId,
                        task: req.body.task,
                        status: true,
                        createdBy: user.name,
                        updatedBy: user.name,
                    }
                    const data = new Task(task)
                    await data.save()
                    res.status(200).json({ data })
                } else {
                    res.status(401).json({ message: 'Illegal' })
                }
            } else {
                res.status(401).json({ message: 'Invalid User' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Un authorised' })
    }
})

router.get('/gettask/:id', async (req, res) => {
    const organisationId = req.params.id
    if (req.headers['x-access-token']) {
        try {
            const decoded = await jwt.verify(
                req.headers['x-access-token'],
                process.env.JWT_SECRET
            )
            const user = await User.findOne({ email: decoded.email })
            if (user) {
                const data = await Task.find({ orgId: organisationId })
                res.status(200).json({ data })
            } else {
                res.status(401).json({ message: 'Invalid User' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Un authorised' })
    }
})

router.patch('/changestatus', async (req, res) => {
    taskid = req.body.taskId
    if (req.headers['x-access-token']) {
        try {
            const decoded = await jwt.verify(
                req.headers['x-access-token'],
                process.env.JWT_SECRET
            )
            const user = await User.findOne({ email: decoded.email })
            if (user) {
                if (user.organisationCode.includes(req.body.orgId)) {
                    const task = await Task.findById(taskid)
                    if (task) {
                        const status = task.status
                        task.status = !status
                        task.updatedBy = user.name
                        await task.save()
                        res.status(200).json({
                            message: 'Status changed to ' + task.status,
                        })
                    } else {
                        res.status(401).json({ message: 'No Task Found' })
                    }
                } else {
                    res.status(401).json({ message: 'Illegal' })
                }
            } else {
                res.status(401).json({ message: 'Invalid User' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Un authorised' })
    }
})

module.exports = router
