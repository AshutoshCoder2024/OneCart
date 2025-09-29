// in this file we make api for add product get remove update  product 


import uploadOnCloudinary from '../config/cloudinary.js';
import Product from '../model/productModel.js';


// add product 
export const addProduct=async(req,res)=>{
    try{
        const {name,description,price, category,subCategory,sizes,bestseller}=req.body;

        // Basic required fields
        if(!name || !description || !price || !category || !subCategory || !sizes){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate and parse price
        const numericPrice = Number(price);
        if(Number.isNaN(numericPrice) || numericPrice <= 0){
            return res.status(400).json({ message: 'Invalid price' });
        }

        // Parse sizes safely
        let parsedSizes = [];
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        } catch {
            return res.status(400).json({ message: 'Invalid sizes format. Expect JSON array string.' });
        }
        if(!Array.isArray(parsedSizes) || parsedSizes.length === 0){
            return res.status(400).json({ message: 'Sizes must be a non-empty array' });
        }

        // Guard against missing files from multer
        const files = req.files || {};
        const pathOrNull = (field)=> Array.isArray(files[field]) && files[field][0] && files[field][0].path ? files[field][0].path : null;

        const image1Path = pathOrNull('image1');
        const image2Path = pathOrNull('image2');
        const image3Path = pathOrNull('image3');
        const image4Path = pathOrNull('image4');

        if(!image1Path || !image2Path || !image3Path || !image4Path){
            return res.status(400).json({ message: 'All four images (image1..image4) are required' });
        }

        // Upload images to Cloudinary
        const [image1,image2,image3,image4] = await Promise.all([
            uploadOnCloudinary(image1Path),
            uploadOnCloudinary(image2Path),
            uploadOnCloudinary(image3Path),
            uploadOnCloudinary(image4Path)
        ]);

        if(!image1 || !image2 || !image3 || !image4){
            return res.status(500).json({ message: 'Image upload failed' });
        }

        const productData={
            name,
            description,
            price: numericPrice,
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: String(bestseller) === 'true' || bestseller === true,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData);
        return res.status(201).json(product)
    }catch(error){
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: `AddProduct error: ${error.message || error}` });
    }
}


// list product

export const listProduct =async (req,res)=>{
    try {
        const product=await    Product.find({})
        return res.status(200).json(product)
    } catch (error) {
        console.log(("ListProduct Error"))
        return res.status(500).json({message:`ListProduct error ${error}`}) 
    }
}



// Remove Product 
// export const removeProduct=async (req,res)=>{
//     try {
//         let {id}=req.params;
//         const product=await  Product.findByIdAndDelete(id)
//         return res.status(200).json(product)
//     } catch (error) {
//         console.log(("RemoveProduct Error"))
//         return res.status(500).json({message:`ListProduct error ${error}`}) 

//     }
// }


export const removeProduct = async (req, res) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({
        message: "Product deleted successfully",
        product,
      });
    } catch (error) {
      console.log("RemoveProduct Error:", error); // ✅ Fixed: extra parentheses + added colon/error logging
      return res.status(500).json({ message: `RemoveProduct error: ${error.message}` }); // ✅ Fixed typo: was "ListProduct"
    }
  };