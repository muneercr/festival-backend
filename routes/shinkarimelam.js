const express = require("express");
const router = express.Router();

const shinkarimelamController = require("../controller/shinkarimelam");

router.post("/shinkarimelam", shinkarimelamController.addShinkarimelam);
router.get("/shinkarimelam", shinkarimelamController.getShinkarimelam);
router.get("/shinkarimelam/:id", shinkarimelamController.getShinkarimelamById);
router.put("/shinkarimelam/:id", shinkarimelamController.editShinkarimelam);
router.delete("/shinkarimelam/:id", shinkarimelamController.deleteShinkarimelam);

module.exports = router;
