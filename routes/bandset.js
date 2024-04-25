const express = require("express");
const router = express.Router(); 
const upload = require("../multer/multer")


const bandsetController = require("../controller/bandset");
 

router.post("/bandset",upload.single("bandsetImages"), bandsetController.addBandset);
router.get("/bandset", bandsetController.getBandset);
router.get("/bandset/:id", bandsetController.getBandsetById);
router.put("/bandset/:id", bandsetController.editBandset);
router.delete("/bandset/:id", bandsetController.deleteBandset);

module.exports = router;
