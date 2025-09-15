import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";
import adminAuth from "../middleware/adminauth.js";
import { getAdmin } from "../controller/userController.js";



let userRoutes=express.Router();

userRoutes.get("/getcurrentuser", isAuth, getCurrentUser)

userRoutes.get("/getadmin", adminAuth, getAdmin)

export default userRoutes
