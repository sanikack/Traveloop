const express= require("express");
const { GetPayments } = require("../../controllers/AdminController");
const router= express.Router();



router.get("/", GetPayments);


module.exports= router