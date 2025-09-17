// in this file we will write a function that will upload img from public folder(help of multer middleware)  on cloudinary and return the url of that img

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import upload from '../middleware/multer.js';


const uploadOnCloudinary=async (filepath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KAY,
        api_secret: process.env.CLOUDINARY_API_KAY // Click 'View API Keys' above to copy your API secret
    });

    try {
        if(!filepath)
            {
                return null;
            }
        // Upload an image
            const uploadResult=await cloudinary.uploader.upload
            (filepath)
            fs.unlinkSync(filepath)
            return uploadResult.secure_url

        
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error);
        
    }
    
}

export default uploadOnCloudinary;