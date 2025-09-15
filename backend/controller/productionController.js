// in this file we make api for add product get remove update  product 


import uploadOnCloudinary from '../config/cloudinary.js';
import product from '../model/productModel.js';


// add product 
export const addProduct=async(req,res)=>{
    try{

        const {name,description,price, category,subCategory,sizes,bestseller}=req.body;

        // Upload images to Cloudinary
        let image1=await uploadOnCloudinary(req.files.images1[0].path);
        let image2=await uploadOnCloudinary(req.files.images2[0].path);
        let image3=await uploadOnCloudinary(req.files.images3[0].path);
        let image4=await uploadOnCloudinary(req.files.images4[0].path);

        const productionData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestseller:bestseller==="true"?true:false,
            date:Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        // Create product document in the database
        const product =await product.create(productionData);

        return res.status(201).json(product)

    }catch(error){
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: `Addproduct  Error ${error}` });
    }
}