const express= require("express");
const { GetContacts, DeleteContacts, ReplytoMessage } = require("../../controllers/AdminController");
const router= express.Router();


router.get("/", GetContacts)
router.delete("/:id", DeleteContacts)
router.put("/reply/:id", ReplytoMessage)



module.exports= router;