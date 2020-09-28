const swagger = require('swagger-ui-express');
const documentation = require('./documentation');

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

app.use('/api/swagger', swagger.serve, swagger.setup(documentation))

// Router
// app.use('/api', require('./routes/posts'))

/*
 * REST
*/
const Post = require('./models/Post')

const ObjectId = {
  isObjectId: (id) => mongoose.Types.ObjectId.isValid(id)
}

app.get('/api', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch {
        res.status(500).json({ message: 'Wrong something' })
    }
})
  
app.post('/api', async (req, res) => {
    try {
        const {
            trackId,
            companyName,
            carrierName,
            carrierPhone,
            comments,
            code
        } = req.body

        if (
            !trackId ||
            !companyName ||
            !carrierName ||
            !carrierPhone ||
            !comments ||
            !code
        ) res.status(500).json({ message: 'Wrong something' })

        await Post.create({
            trackId,
            companyName,
            carrierName,
            carrierPhone,
            comments,
            code
        })

        const posts = await Post.find()
        res.json(posts)
    } catch {
        res.status(500).json({ message: 'Wrong something' })
    }
})
  
app.put('/api/:id', async (req, res) => {
    try {
        const id = req.params.id
        const {
            trackId,
            companyName,
            carrierName,
            carrierPhone,
            comments,
            code
        } = req.body
        
        const post = await Post.findById(id)

        post.trackId = trackId || post.trackId
        post.companyName = companyName || post.companyName
        post.carrierName = carrierName || post.carrierName
        post.carrierPhone = carrierPhone || post.carrierPhone
        post.comments = comments || post.comments
        post.code = code || post.code

        await post.save()
        
        const posts = await Post.find()
        res.json(posts)
    } catch {
        res.status(500).json({ message: 'Wrong something' })
    }
})
  
app.delete('/api', async (req, res) => {
    try {
        const ids = req.body
    
        if (Array.isArray(ids)) {
          for (let id of ids) {
            if (ObjectId.isObjectId(id))
              await Post.findById(id).deleteOne()
          }
        }
    
        const posts = await Post.find()
        res.json(posts)
    } catch {
        res.status(500).json({ message: 'Wrong something' })
    }
})

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