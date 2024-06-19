import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const  userSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
        const salt= await bcrypt.genSalt(10)
    this.password = await bcrypt.hash( this.password, salt)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};


export const User = mongoose.model("User",userSchema);
