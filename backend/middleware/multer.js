import multer from "multer";

// here we create a storege for multer that store our img in public folder
let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public") // our img is store in public folder temporarily
    },
    
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

});
let upload =multer({storage})

export default upload 