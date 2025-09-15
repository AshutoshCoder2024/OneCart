import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRouter from './routes/productroute.js'

import cookieParser from "cookie-parser";
dotenv.config()
let port = process.env.PORT || 9000

let app=express();

app.use(cookieParser());
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true  
}))





app.use("/api/auth", authRoutes)//localhost:8000/api/auth/registration
app.use("/api/user", userRoutes)
app.use("/api/product", productRouter)

app.listen(port,()=>{
    console.log("Hello from Server")
    connectDb()
})

