// in this file we make api for add product get remove update  product 


import uploadOnCloudinary from '../config/cloudinary.js';
import Product from '../model/productModel.js';


// add product 
export const addProduct=async(req,res)=>{
    try{

        const {name,description,price, category,subCategory,sizes,bestseller}=req.body;

        // Upload imagses to Cloudinary
        let image1=await uploadOnCloudinary(req.files.image1[0].path);
        let image2=await uploadOnCloudinary(req.files.image2[0].path);
        let image3=await uploadOnCloudinary(req.files.image3[0].path);
        let image4=await uploadOnCloudinary(req.files.image4[0].path);

        // Parse sizes safely
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      return res.status(400).json({ message: 'Invalid sizes format. Expect JSON array string.' });
    }


        const productData={
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes:parsedSizes,
            // bestseller:bestseller==="true"? true:false,
            bestseller: Boolean(bestseller),
            date: Date.now(),

            image1,
            image2,
            image3,
            image4
        }

        // Create product document in the database
        const product = await Product.create(productData);

        return res.status(201).json(product)

    }catch(error){
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: `Addproduct  Error ${error}` });
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