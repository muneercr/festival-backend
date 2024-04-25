const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer'); 


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        let user = new User({
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
                        user,
                        message:"registration success"
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
                    user,
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


    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "keralafestivals.com",
          pass: "fastival@12",
        },
      });

// Generate a reset token
const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
      const token =jwt.sign({id : user._id},"jwt_secret_key",{expiresIn:"1d"})
      console.log("token",token);

        await user.save();

        // Send email with reset token
        const mailOptions = {
            from: 'keralafastivals@gmail.com', // Your email address
            to: email, // User's email address
            subject: 'Password Reset', // Email subject
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `http://localhost:3000/forgetPassword/${user._id}/${token}` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to send reset token email' });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: `Reset token sent to your email ${email? email :'no email get'}` });
        });
    } catch (error) {
        next(error);
    }
};

        
    
 
module.exports = { register,Login,getAllUsers,getUserById,deleteUser,editUser,resetPassword }
