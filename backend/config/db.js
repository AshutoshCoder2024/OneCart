// in this file we connect our mongoodb with our server 

import mongoose from "mongoose";
const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGOODB_URL)
        console.log("Database connected successfully")
        
    } catch (error) {
        console.error("Database connection error:", error.message)
        throw error
    }
}

export default connectDb