import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './config/db.js'
import articleRoute from "./controllers/article.controller.js"
const app = express()
dotenv.config({
    path: './.env'

})
const port = process.env.PORT || 5001

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    res.send("hello")
})

app.use("/api/v1/article", articleRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})