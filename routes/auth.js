const express = require("express")
const router = express.Router()

const authController = require("../controller/authController")
const adminAuthController = require("../controller/adminAuthController")

router.post("/register" , authController.register);
router.post("/login" , authController.Login);
router.get("/users" , authController.getAllUsers);
router.put("/users/:id", authController.editUser); 
router.delete("/users/:id", authController.deleteUser); 
router.get("/users/:id", authController.getUserById);

router.post("/adminRegister" , adminAuthController.adminRegister); 
router.post("/adminLogin" , adminAuthController.adminLogin);
router.get("/admins" , adminAuthController.getAllAdmins); 
router.put("/admins/:id", adminAuthController.editAdmin);
router.delete("/admins/:id", adminAuthController.deleteAdmin);
router.get("/admins/:id", adminAuthController.getAdminById);



module.exports = router
