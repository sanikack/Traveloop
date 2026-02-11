const express= require("express");
const {SignUp,Login, LogOut, GetMe,}= require("../../controllers/UserController")
const router= express.Router();
const Protect= require("../../Middleware/AuthMiddle")

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/me", Protect, GetMe)
router.post("/logout", LogOut)




module.exports= router