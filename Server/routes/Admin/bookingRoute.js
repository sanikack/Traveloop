const express= require("express");
const { GetBookings, UpdateBookings, DeleteBooking, GetSingleBookings } = require("../../controllers/AdminController");
const router= express.Router();


router.get("/", GetBookings)
router.get("/:id", GetSingleBookings)
router.put("/:id", UpdateBookings)
router.delete("/:id", DeleteBooking)



module.exports= router;