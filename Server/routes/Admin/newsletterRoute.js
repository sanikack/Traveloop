const express= require("express");
const { GetSubscribers, CreateSubscribe, DeleteSubscriber } = require("../../controllers/AdminController");
const router= express.Router();


router.get("/", GetSubscribers)
router.post("/", CreateSubscribe)
router.delete("/:id", DeleteSubscriber)



module.exports= router;