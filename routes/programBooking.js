const express = require("express");
const router = express.Router();

const programBooking = require("../controller/programBooking");

router.post("/programBooking/:id", programBooking.bookProgram);
router.get("/programBooking", programBooking.getAllBookingData);
router.get("/programBooking/date", programBooking.getByDate);
// router.put("/bandset/:id", bandsetController.editBandset);
// router.delete("/bandset/:id", bandsetController.deleteBandset);

module.exports = router;
