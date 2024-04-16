const express =require("express")
const router = express.Router()

const doctorController = require("../controller/doctor")

router.post("/doctor",doctorController.createDoctor)
router.get("/doctor",doctorController.getDoctor)
module.exports = router