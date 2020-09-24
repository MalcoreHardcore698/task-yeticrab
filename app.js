const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URI || ''

app.use(cors())
app.use(express.json({ extended: true }))

app.get('/', function (req, res) {
    res.send('API')
})

app.use('/api', require('./routes/posts'))

async function start() {
    try {
        await mongoose.connect(
            URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
    
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

start()