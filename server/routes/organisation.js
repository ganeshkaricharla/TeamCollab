const router = require('express').Router()
const Organisation = require('../models/organisation.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
router.get('/hello', (req, res) => {
    res.send('Organisation auth routes')
})

router.post('/login', async (req, res) => {
    const organisation = {
        name: req.body.name,
        passkey: req.body.passkey,
    }

    const data = await Organisation.findOne({ name: organisation.name })
    try {
        if (data) {
            if (data.passkey === organisation.passkey) {
                const org = {
                    id: data._id,
                    name: data.name,
                }
                const token = await jwt.sign(org, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                })
                console.log(token)
                res.status(200).json({ token: token })
            } else {
                res.status(401).json({
                    message: 'Check Your details and try again',
                })
            }
        } else {
            res.status(404).json({ message: 'Organisation not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Error.' })
    }
})

router.post('/register', async (req, res) => {
    const organisation = {
        name: req.body.name,
        passkey: req.body.passkey,
        users: [],
        inviteUsers: [],
    }
    console.log(organisation)
    const data = await Organisation.findOne({ name: organisation.name })
    try {
        if (data) {
            res.status(409).json({ message: 'Organisation already exists' })
        } else {
            const newOrganisation = new Organisation(organisation)
            await newOrganisation.save()
            res.status(200).json({ message: 'Organisation created' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Error.' })
    }
})

router.get('/users', async (req, res) => {
    console.log(req.headers)
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                if (orgdata) {
                    const users = orgdata.users
                    const userdata = await User.find(
                        {
                            email: { $in: users },
                        },
                        {
                            email: 1,
                            name: 1,
                        }
                    )
                    console.log(userdata)
                    res.status(200).json({ userdata })
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(401).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.get('/invitedusers', async (req, res) => {
    console.log(req.headers)
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                console.log(orgdata.inviteUsers)
                if (orgdata) {
                    const users = orgdata.inviteUsers
                    res.status(200).json({ invited: users })
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(401).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.patch('/editdetails', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                if (orgdata) {
                    const org = await Organisation.findOne({
                        name: req.body.name,
                    })
                    if (org) {
                        res.status(409).json({
                            message: 'Organisation already exists',
                        })
                    } else {
                        await Organisation.updateOne(
                            { _id: decoded.id },
                            {
                                $set: req.body,
                            }
                        )
                        res.status(200).json({
                            message: 'Organisation updated',
                        })
                    }
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(402).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.get('/orgname', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                if (orgdata) {
                    res.status(200).json({
                        org: orgdata.name,
                        message: 'Organisation found',
                    })
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(401).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.delete('/delete', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                if (orgdata) {
                    console.log(orgdata._id)
                    const users = orgdata.users

                    await User.updateMany(
                        {
                            email: { $in: users },
                        },
                        {
                            $pull: {
                                organisationCode: orgdata._id.valueOf(),
                            },
                        }
                    )

                    await Organisation.deleteOne({ _id: decoded.id })
                    res.status(200).json({ message: 'Organisation deleted' })
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(402).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.get('/invite/:email', async (req, res) => {
    if (req.headers['x-access-token']) {
        try {
            const token = req.headers['x-access-token']
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.id) {
                const orgdata = await Organisation.findOne({
                    _id: decoded.id,
                })
                if (orgdata) {
                    if (orgdata.users.includes(req.params.email)) {
                        res.status(409).json({
                            message: 'User already exists',
                        })
                    } else {
                        orgdata.inviteUsers.push(req.params.email)
                        await orgdata.save()
                        await emailUser(
                            req.params.email,
                            orgdata.name,
                            orgdata._id.valueOf()
                        )
                        res.status(200).json({
                            message: 'User invited',
                        })
                    }
                } else {
                    res.status(404).json({ message: 'Organisation not found' })
                }
            } else {
                res.status(402).json({ message: 'invalid Organisation code' })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error.' })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

const emailUser = async (email, orgname, orgcode) => {
    const text =
        'You have been invited to join ' +
        orgname +
        '.' +
        '\n' +
        '\n' +
        'Click the link below to join.' +
        '\n' +
        '\n' +
        'http://localhost:3000/register?email=' +
        email +
        '&orgcode=' +
        orgcode

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ganeshkaricharla.projects@gmail.com',
            pass: 'Ganesh@123',
        },
    })
    const mailOptions = {
        from: 'TeamCollab <ganeshkaricharla.projects@gmail.com >',
        to: email,
        subject: 'TeamCollab Invite to join ' + orgname,
        text: text,
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = router
