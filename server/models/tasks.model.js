const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    orgId: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Task', taskSchema)
