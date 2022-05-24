const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
//routes-imports
const user = require('./routes/user')
const organisation = require('./routes/organisation')
const task = require('./routes/task')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(
    'mongodb://localhost:27017/collabDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to MongoDB')
    }
)

//routes middlewares
app.use('/user', user)
app.use('/org', organisation)
app.use('/task', task)

// app listening.
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080')
})
