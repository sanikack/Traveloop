const express= require("express");
const { GetAllReviews, UpdateReviews } = require("../../controllers/AdminController");
const router= express.Router();



router.get("/", GetAllReviews);
router.put("/:id", UpdateReviews);


module.exports= router