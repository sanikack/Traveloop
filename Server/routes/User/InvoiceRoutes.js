const express= require("express");
const { DownloadInvoice } = require("../../controllers/InvoiceController");
const router= express.Router();
const UserAuth= require("../../Middleware/AuthMiddle")


router.get("/invoice/:bookingId", UserAuth, DownloadInvoice)


module.exports= router