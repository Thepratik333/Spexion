import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Food', 'Educations', 'Businessmen', 'Positions'],
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})

export const Article = mongoose.model("Article", articleSchema)