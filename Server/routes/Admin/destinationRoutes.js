const express= require("express");
const router= express.Router();
const Upload= require("../../Middleware/Multer")
const { CreateDestination, GetDestinations, UpdateDestination, GetDestinationById, DeleteDestination } = require("../../controllers/AdminController");


router.post("/", Upload.single("image"), CreateDestination );
router.get("/", GetDestinations)
router.get("/:id", GetDestinationById)
router.put("/:id", Upload.single("image"), UpdateDestination)
router.delete("/:id", DeleteDestination)


module.exports= router;