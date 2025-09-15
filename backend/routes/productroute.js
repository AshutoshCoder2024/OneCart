// in this file we will create routes for product 
import express from "express";
import { addProduct } from "../controller/productionController.js";
import upload from '../middleware/multer.js'; 


let productRouter=express.Router()

productRouter.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1}]) ,addProduct)

    export default productRouter