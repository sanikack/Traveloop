const express= require("express");
const { CreateUser, GetUser, UpdateUser, DeleteUser, GetSingleUser } = require("../../controllers/AdminController");
const router= express.Router();

router.post("/",CreateUser);
router.get("/",GetUser);
router.get("/:id",GetSingleUser);
router.put("/:id",UpdateUser);
router.delete("/:id",DeleteUser);



module.exports= router;
