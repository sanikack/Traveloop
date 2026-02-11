const express= require("express");
const { SubscribeNewsletter } = require("../../controllers/UserController");
const router= express.Router();


router.post("/", SubscribeNewsletter)


module.exports= router