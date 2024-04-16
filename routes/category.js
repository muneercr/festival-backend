const express = require("express");
const router = express.Router();

const categoryController = require("../controller/cotegoryController"); // Update controller import

router.post("/category", categoryController.addCategory); // Update route
router.get("/category", categoryController.getCategory); // Update route
router.get("/category/:id", categoryController.getCategoryById); // Update route
router.put("/category/:id", categoryController.editCategoryById); // Update route
router.delete("/category/:id", categoryController.deleteCategoryById); // Update route

module.exports = router;
