import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productroute.js'

import cookieParser from "cookie-parser";
dotenv.config()
let port = process.env.PORT || 9000

let app=express();




app.use(cookieParser());
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["https://onecart-fronted-6z39.onrender.com","https://onecart-admin-2nh9.onrender.com"],
    credentials:true  
}))





app.use("/api/auth", authRoutes)//localhost:8000/api/auth/registration
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

app.listen(port,()=>{
    console.log("Hello from Server")
    connectDb()
})

