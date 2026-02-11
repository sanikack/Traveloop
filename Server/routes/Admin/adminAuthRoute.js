const express= require("express");
const { AdminLog, AdminLogout, AdminCheck, GetAdminProfile, UpdateAdminprofile, UpdateAdminAvatar } = require("../../controllers/AdminController");
const AdminAuth = require("../../Middleware/AdminAuth");
const router= express.Router();
const multer= require("../../Middleware/Multer")


router.post("/login", AdminLog)
router.post("/logout", AdminLogout)
router.get("/check", AdminAuth, AdminCheck)
router.get("/profile", AdminAuth, GetAdminProfile )
router.put("/profile", AdminAuth, UpdateAdminprofile )
router.put("/profile/avatar", AdminAuth, multer.single("avatar"), UpdateAdminAvatar)





module.exports= router;