const express= require("express");
const { CreateRazorpayOrder } = require("../../controllers/PaymentController");
const Protect= require("../../Middleware/AuthMiddle")
const router= express.Router();

router.post("/create-order", Protect, CreateRazorpayOrder);


module.exports= router