const express= require("express");
const { GetPackages, CreatePackage, GetSinglePackage, UpdatePackage, DeletePackge } = require("../../controllers/AdminController");
const router= express.Router();
const Upload= require("../../Middleware/Multer")

router.get("/", GetPackages);

router.post("/", Upload.fields([
        {name:"image", maxCount:1},
        {name:"gallery", maxCount:10}
    ]),
    CreatePackage )

router.get("/:id", GetSinglePackage );

router.put("/:id", Upload.fields([
    {name:"image", maxCount:1},
    {name:"gallery", maxCount:10}
]), UpdatePackage)

router.delete("/:id", DeletePackge)



module.exports= router