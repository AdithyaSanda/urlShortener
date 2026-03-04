import mongoose from "../config/db.js"

const urlModel = new mongoose.Schema({
    originalUrl: {
        type: String,
        required
    },
    shortCode: {
        type: String,
        required,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Url", urlModel)