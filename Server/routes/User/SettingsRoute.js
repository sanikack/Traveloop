const express= require("express");
const router= express.Router();
const Protect= require("../../Middleware/AuthMiddle");
const { GetProfile, UpdateProfile, UpdateAvatar, DeleteAccount } = require("../../controllers/UserController");
const multer= require("../../Middleware/Multer");



router.get("/", Protect, GetProfile),
router.put("/update", Protect, UpdateProfile)
router.put("/avatar", Protect, multer.single("avatar"), UpdateAvatar)
router.delete("/delete", Protect, DeleteAccount)


module.exports= router;