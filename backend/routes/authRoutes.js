import express from "express"
import { registration } from "../controller/authController.js"

const authRoutes=express.Router()

authRoutes.post("/registration", registration) 
// for above routing the register function present in  "../controller/authController.js" is called

export default authRoutes