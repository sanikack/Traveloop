const express= require("express");
const { SingleDestination, GetAllDestinations } = require("../../controllers/UserController");
const router= express.Router();


router.get("/", GetAllDestinations);
router.get("/:slug", SingleDestination);

module.exports= router