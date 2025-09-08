import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";



let userRoutes=express.Router();

console.log("In userRoutes.js file");
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser)

export default userRoutes
