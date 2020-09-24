const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Post = require('./../models/Post')

const ObjectId = {
  isObjectId: (id) => mongoose.Types.ObjectId.isValid(id)
}

router.get('/list', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch {
    res.status(500).json({ message: 'Wrong something' })
  }
})

router.post('/add', async (req, res) => {
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

router.post('/edit/:id', async (req, res) => {
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

router.post('/delete', async (req, res) => {
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

module.exports = router