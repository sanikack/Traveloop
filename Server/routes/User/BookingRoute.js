const express= require("express");
const { CreateBooking, CheckoutBooking, GetMyBookings, CancelBooking } = require("../../controllers/UserController");
const router= express.Router();
const Protect= require("../../Middleware/AuthMiddle");



router.post("/:id", Protect, CreateBooking);
router.post("/checkout/:bookingId", Protect, CheckoutBooking)
router.get("/my-bookings", Protect, GetMyBookings)
router.put("/cancel/:id", Protect, CancelBooking)


module.exports= router;