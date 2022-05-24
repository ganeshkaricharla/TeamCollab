const mongoose = require('mongoose')

const organisationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        passkey: {
            type: String,
            required: true,
        },
        users: {
            type: [],
            required: true,
        },
        inviteUsers: {
            type: [],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Organisation', organisationSchema)
