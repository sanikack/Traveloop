const express= require("express");
const router= express.Router();
const Protect= require("../../Middleware/AuthMiddle");
const { SubmitReview, GetAllReviews } = require("../../controllers/UserController");



router.post("/", Protect, SubmitReview);
router.get("/", GetAllReviews);


module.exports= router;