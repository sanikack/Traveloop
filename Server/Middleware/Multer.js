const multer= require("multer")
const path= require("path");
const fs= require("fs");



if(!fs.existsSync("uploads")){
    fs.mkdirSync("uploads")
}

const storage= multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "uploads/")
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});


const fileFilter= (req,file,cb)=>{
    console.log("FILE RECEIVED:", file.mimetype);
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else{
        cb(new Error("Only images allowed"), false)
    }
}

const upload= multer({ storage, fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,  //20mb per file
        fieldSize: 25 * 1024 * 1024   //25MB for non-file fields
    },
 });


module.exports= upload