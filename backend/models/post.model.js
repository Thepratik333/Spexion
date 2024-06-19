import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    addedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true})

export const Post = mongoose.model("Post", postSchema)