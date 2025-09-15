import express from "express"
import { registration,login,logout, googlelogin,adminLogin } from "../controller/authController.js"

const authRoutes=express.Router()

// registration Route
authRoutes.post("/registration", registration) 
// for above routing the register function present in  "../controller/authController.js" is called

// login route
authRoutes.post("/login", login) 

// logout route 
authRoutes.get("/logout", logout)

//google signup route
authRoutes.post("/googlelogin", googlelogin)

// //Admin login 
authRoutes.post("/adminlogin", adminLogin)


export default authRoutes