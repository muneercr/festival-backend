const Admin = require("../model/admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const adminRegister = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        let user = new Admin({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone, 
            password: hashedpass,
        });
        if (err) {
            res.json({
                error: err
            });
        } else { 
            user.save()
                .then((user) => {
                    res.json({
                        user
                    });
                }) 
        }
    });
}

const adminLogin = (req, res, next) => {
    console.log("data", req.body);
    var email = req.body.email; // Change to email
    var password = req.body.password;

    Admin.findOne({ email: email }).then(user => { // Find by email
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ email: user.email }, "secret", { expiresIn: "1000" }); // Signing with email
                    res.json({
                        message: "login success",
                        token
                    });
                } else {
                    res.json({
                        message: "password not match"
                    });
                }
            });
        } else {
            res.json({
                message: "user not exist"
            });
        }
    });
}


const getAllAdmins =async (req,res) => {
    const data = await Admin.find({});
    console.log("aaaa",data);
    if(data){
        res.json(data);
    }else{
     res.json({
        message:"no data"

     })
    }
    }

    const getAdminById = async (req, res) => {
        const adminId = req.params.id; // Assuming you pass the admin ID as a route parameter
        
        try {
            const admin = await Admin.findById(adminId);
    
            if (admin) {
                res.json({
                    message: "Admin found successfully",
                    admin,
                });
            } else {
                res.json({
                    message: "Admin not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };

    
    const editAdmin = async (req, res) => {
        const adminId = req.params.id; // Assuming you pass the admin ID as a route parameter
        
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate({ _id : adminId}, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }, { new: true });
    
            if (updatedAdmin) {
                res.json({
                    message: "Admin updated successfully",
                    admin: updatedAdmin,
                });
            } else {
                res.json({
                    message: "Admin not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };

    
    const deleteAdmin = async (req, res) => {
        const adminId = req.params.id; // Assuming you pass the admin ID as a route parameter
        
        try {
            const deletedAdmin = await Admin.findByIdAndDelete({ _id : adminId});
    
            if (deletedAdmin) {
                res.json({
                    message: "Admin deleted successfully",
                    admin: deletedAdmin,
                });
            } else {
                res.json({
                    message: "Admin not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };
    
    
 
module.exports = { adminRegister,adminLogin,getAllAdmins ,deleteAdmin,editAdmin ,getAdminById}
