const express= require("express");
const { CreateContact } = require("../../controllers/UserController");
const router= express.Router();


router.post("/", CreateContact);

module.exports= router