
const express = require("express");
const app = express();
const morgon = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors'); 
 

  mongoose.connect('mongodb://localhost:27017', {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
});
const AuthRoute = require("./routes/auth");  
const CategoryRoute = require("./routes/category");  
const BookingRoute = require("./routes/booking")
const DoctorRoute =require("./routes/doctor")
const ElephantRoute =require("./routes/elephant")
const BandsetRoute =require("./routes/bandset")
const ThambolamRoute =require("./routes/thambolam")
const ShinkarimelamRoute =require("./routes/shinkarimelam")



 
app.use(morgon('dev'))
app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json()) 
 app.use('/uploads',express.static('uploads'))

 app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use("/api",AuthRoute) 
app.use("/api",BookingRoute) 
app.use("/api",DoctorRoute) 
app.use("/api",ElephantRoute) 
app.use("/api",BandsetRoute) 
app.use("/api",ThambolamRoute)
app.use("/api",ShinkarimelamRoute)
app.use("/api",CategoryRoute)







app.use(cors());


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
