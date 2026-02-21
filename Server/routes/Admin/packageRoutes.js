const express= require("express");
const { GetPackages, CreatePackage, GetSinglePackage, UpdatePackage, DeletePackge } = require("../../controllers/AdminController");
const router= express.Router();
const Upload= require("../../Middleware/Multer")

router.get("/", GetPackages);

router.post("/", (req,res,next) =>{
    console.log("ROUTE HIT");
    
},

(err,req,res,next)=>{
    if(err){
        console.log("MULTER ERROR:", err.message);
      return res.status(400).json({ error: err.message });
    }

    next()
},
 CreatePackage )

router.get("/:id", GetSinglePackage );

router.put("/:id", Upload.fields([
    {name:"image", maxCount:1},
    {name:"gallery", maxCount:10}
]), UpdatePackage)

router.delete("/:id", DeletePackge)



module.exports= router