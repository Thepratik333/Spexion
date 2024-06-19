import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import postRoute from "./routes/postRoutes.js"
import userRoutes from './routes/userRoutes.js'
import morgan from 'morgan'
const app = express()
dotenv.config({
    path: './.env'

})
const port = process.env.PORT || 5001

connectDB()

app.use(cookieParser())
app.use('/uploads', express.static('public/uploads'));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))


app.get("/", (req,res)=>{
    res.send("hello")
})

app.use("/api/v1/posts", postRoute)
app.use("/api/v1/user", userRoutes)

app.get("/check-route", (req, res) => {
    // Check if the "token" cookie is present in the request
    if (req.cookies.token) {
      // Cookie is present
      const token =req.cookies.token
      console.log("Token cookie found:", req.cookies.token);
      res.send({msg:"Token cookie found!", token});
    } else {
      // Cookie is not present
      console.log("Token cookie not found");
      res.send("Token cookie not found");
    }
  });

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})