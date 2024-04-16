const express = require("express");
const router = express.Router();

const thambolamController = require("../controller/thambolam");

router.post("/thambolam", thambolamController.addThambolam);
router.get("/thambolam", thambolamController.getThambolam);
router.get("/thambolam/:id", thambolamController.getThambolamById);
router.put("/thambolam/:id", thambolamController.editThambolam);
router.delete("/thambolam/:id", thambolamController.deleteThambolam);

module.exports = router;
