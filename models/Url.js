import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model("Url", urlSchema);