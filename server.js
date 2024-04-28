
const express = require("express");
const app = express();
const morgon = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors'); 
app.use(cors());
require('dotenv').config()
 

 

//   mongoose.connect('mongodb://localhost:27017', {
//     serverSelectionTimeoutMS: 30000, // 30 seconds
//     socketTimeoutMS: 45000, // 45 seconds
// });



mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


const AuthRoute = require("./routes/auth");  
const CategoryRoute = require("./routes/category");  
const BookingRoute = require("./routes/booking")
const DoctorRoute =require("./routes/doctor")
const ElephantRoute =require("./routes/elephant")
const BandsetRoute =require("./routes/bandset")
const ThambolamRoute =require("./routes/thambolam")
const ShinkarimelamRoute =require("./routes/shinkarimelam")
const bookingRoute =require("./routes/programBooking")



 
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
app.use("/api",bookingRoute)

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


  
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
