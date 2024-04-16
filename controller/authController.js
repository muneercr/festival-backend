const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            designation:req.body.designation,
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

const Login = (req,res,next) => {
  
    console.log("data",req.body);
    var username = req.body.name
    var password = req.body.password
     
    User.findOne({}).then(user => {
         
        if(user){
        bcrypt.compare(password, user.password, (err,result) => {
            if(result){
                let token = jwt.sign({name :user.name}, "secret", {expiresIn:"1000"})
                res.json({
                    message:"loggin success",
                    token
                })
                }else{
                    res.json({
                        message:"password not match"
                    })
               
            }
        })
        }else{
            res.json({
                message:"user not exist"
            })
        }
    })


}

const getAllUsers =async (req,res) => {
    const data = await User.find({}); 
    if(data){
        res.json(data);
    }else{
     res.json({
        message:"no data"

     })
    }
    }

    const editUser = async (req, res) => {
        const userId = req.params.id; // Assuming you pass the user ID as a route parameter
        
        try {
            const updatedUser = await User.findByIdAndUpdate({_id : userId}, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                designation: req.body.designation,
            }, { new: true });
    
            if (updatedUser) {
                res.json({
                    message: "User updated successfully",
                    user: updatedUser,
                });
            } else {
                res.json({
                    message: "User not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };

    const deleteUser = async (req, res) => {
        const userId = req.params.id; // Assuming you pass the user ID as a route parameter
        
        try {
            const deletedUser = await User.findByIdAndDelete({_id : userId});
    
            if (deletedUser) {
                res.json({
                    message: "User deleted successfully",
                    user: deletedUser,
                });
            } else {
                res.json({
                    message: "User not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };

    const getUserById = async (req, res) => {
        const userId = req.params.id; // Assuming you pass the user ID as a route parameter
        
        try {
            const user = await User.findById({_id : userId});
    
            if (user) {
                res.json({
                    message: "User found successfully",
                    user,
                });
            } else {
                res.json({
                    message: "User not found",
                });
            }
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    };
        
    
 
module.exports = { register,Login,getAllUsers,getUserById,deleteUser,editUser }
