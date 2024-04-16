const express =require("express")
const router = express.Router()

const elephantController = require("../controller/elephant")

router.post("/elephant",elephantController.addElephant);
router.get("/elephant",elephantController.getElephant); 
router.get("/elephants/:id", elephantController.getElephantById);
router.put("/elephants/:id", elephantController.editElephantById); 
router.delete("/elephants/:id", elephantController.deleteElephantById);
module.exports = router