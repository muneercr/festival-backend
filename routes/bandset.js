const express = require("express");
const router = express.Router();

const bandsetController = require("../controller/bandset");

router.post("/bandset", bandsetController.addBandset);
router.get("/bandset", bandsetController.getBandset);
router.get("/bandset/:id", bandsetController.getBandsetById);
router.put("/bandset/:id", bandsetController.editBandset);
router.delete("/bandset/:id", bandsetController.deleteBandset);

module.exports = router;
