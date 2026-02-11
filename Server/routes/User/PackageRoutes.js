const express= require("express");
const {GetSinglePackage, GetAllPackages} = require("../../controllers/UserController")
const router= express.Router();

router.get("/",GetAllPackages)
router.get("/:id",GetSinglePackage)

module.exports= router