const express= require("express");
const router= express.Router();
const {createCategory, GetCategories, GetcategoryById, UpdateCategory, DeleteCategory} = require("../../controllers/AdminController")
const Upload= require("../../Middleware/Multer");


router.post("/", Upload.single("image"), createCategory );
router.get("/", GetCategories );
router.get("/:id", GetcategoryById)
router.put("/:id", Upload.single("image"), UpdateCategory)
router.delete("/:id", DeleteCategory)


module.exports= router