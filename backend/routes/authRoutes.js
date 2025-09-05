import express from "express"
import { registration,login,logout } from "../controller/authController.js"

const authRoutes=express.Router()

// registration Route
authRoutes.post("/registration", registration) 
// for above routing the register function present in  "../controller/authController.js" is called



// login route
authRoutes.post("/login", login) 

// logout route 
authRoutes.get("/logout", logout)


export default authRoutes