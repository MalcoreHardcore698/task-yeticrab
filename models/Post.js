const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    trackId: { type: String, required: true },
    companyName: { type: String, required: true },
    carrierName: { type: String, required: true },
    carrierPhone: { type: String, required: true },
    comments: { type: String, required: true },
    code: { type: String, required: true }
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

module.exports = mongoose.model('Post', PostSchema)