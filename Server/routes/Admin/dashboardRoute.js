const express= require("express");
const { GetDashboardStats, GetTopDestinationGraph, GetBookingTrendGraph, GetRecentBookings, GetRecentActivities,
        GetPaymentStats, 
        GlobalSearch,
        GetNotification,
        MarkNotificationRead} = require("../../controllers/AdminController");
const router= express.Router();


router.get("/",GetDashboardStats)
router.get("/top-destination",GetTopDestinationGraph)
router.get("/top-booking",GetBookingTrendGraph)
router.get("/recent-bookings",GetRecentBookings)
router.get("/recent-activities",GetRecentActivities)
router.get("/payment-stats",GetPaymentStats)
router.get("/search",GlobalSearch)
router.get("/notification",GetNotification)
router.put("/notification/:id/read",MarkNotificationRead)


module.exports= router
