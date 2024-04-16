const express = require("express")
const router = express.Router()

const bookingController = require("../controller/booking")

router.post("/booking" ,bookingController.AddBooking)
router.get("/booking",bookingController.getAllBookings) 
module.exports = router