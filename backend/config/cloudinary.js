// in this file we will write a function that will upload img from public folder(help of multer middleware)  on cloudinary and return the url of that img

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import upload from '../middleware/multer.js';


const uploadOnCloudinary=async (filepath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if(!filepath)
            {
                return null;
            }
        // Upload an image
            const uploadResult=await cloudinary.uploader.upload(filepath)
            try{ fs.unlinkSync(filepath) } catch(_) {}
            return uploadResult.secure_url

        
    } catch (error) {
        try{ if(filepath) fs.unlinkSync(filepath) } catch(_) {}
        console.log(error);
    }
    
}
export default uploadOnCloudinary;
