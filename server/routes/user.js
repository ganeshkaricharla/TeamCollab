const router = require('express').Router()
const User = require('../models/user.model')
const Organisation = require('../models/organisation.model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.get('/hello', (req, res) => {
    res.send('Lead auth routes')
})

router.post('/login', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const data = await User.findOne({ email: user.email })
        console.log(data)
        if (data) {
            console.log(data.password, user.password)
            if (data.password === user.password) {
                const userdata = {
                    email: data.email,
                    name: data.name,
                }
                console.log(userdata)
                const token = await jwt.sign(userdata, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                })
                console.log(token)
                res.status(200).json({ token: token })
            } else {
                res.status(401).json({ message: 'Invalid Password' })
            }
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Error.' })
    }
})

router.post('/register', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.organisationCode)) {
        res.status(400).json({ message: 'Invalid organisation code' })
    }
    try {
        const orgdata = await Organisation.findOne({
            _id: req.body.organisationCode,
        })
        if (orgdata) {
            const oldUser = await User.findOne({ email: req.body.email })
            if (oldUser) {
                if (
                    oldUser.organisationCode.includes(req.body.organisationCode)
                ) {
                    res.status(400).json({
                        message: 'User is already present in organisation',
                    })
                } else {
                    console.log(orgdata.inviteUsers)
                    orgdata.inviteUsers = orgdata.inviteUsers.filter((user) => {
                        return user !== req.body.email
                    })
                    console.log(orgdata.inviteUsers)
                    await orgdata.save()
                    orgdata.users.push(req.body.email)
                    await orgdata.save()
                    oldUser.organisationCode.push(req.body.organisationCode)
                    await oldUser.save()
                    res.status(200).json({
                        message: 'User is added to organisation',
                    })
                }
            } else {
                const user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    organisationCode: [req.body.organisationCode],
                })
                orgdata.inviteUsers = orgdata.inviteUsers.filter((user) => {
                    return user !== req.body.email
                })
                orgdata.users.push(req.body.email)
                await orgdata.save()
                await user.save()
                res.status(200).json({
                    message: 'User created and  is added to organisation',
                })
            }
        } else {
            res.status(404).json({ message: 'Organisation not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Error.' })
    }
})

router.get('/getuser', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne(
                { email: decoded.email },
                { password: 0 }
            )
            if (user) {
                res.status(200).json({ user: user })
                console.log(user)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.get('/orgname/:id', async (req, res) => {
    const orgid = req.params.id
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            if (decoded.email) {
                const userdata = await User.findOne({
                    email: decoded.email,
                })
                if (userdata) {
                    if (userdata.organisationCode.includes(orgid)) {
                        const orgdata = await Organisation.findOne({
                            _id: orgid,
                        })
                        if (orgdata) {
                            res.status(200).json({ orgname: orgdata.name })
                        } else {
                            res.status(404).json({
                                message: 'Organisation not found',
                            })
                        }
                    } else {
                        res.status(401).json({
                            message: 'User is not present in that organisation',
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'User not found.',
                    })
                }
            } else {
                res.status(404).json({ message: 'User is not valid' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

module.exports = router
