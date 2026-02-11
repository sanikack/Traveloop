const express= require("express");
const { GetSingleCategory, GetAllCategories } = require("../../controllers/UserController");
const router= express.Router();


router.get("/", GetAllCategories)
router.get("/:slug", GetSingleCategory)


module.exports= router