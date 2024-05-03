
const express = require("express");
const app = express();
const morgon = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors'); 
app.use(cors());
require('dotenv').config() 
const http = require('http');
const server = http.createServer(app);
// const io = require('./socket') 
global.io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  }
});



 

  mongoose.connect('mongodb://localhost:27017', {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
});


// mongoose
//   .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//   .catch((e) => {
//     console.log(e);
//     process.exit(0);
//   });


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

// Create HTTP server
// const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});



server.listen(5000, () => console.log(`Listening on port ${process.env.PORT }`));
// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server is running on port 5000");
// });\
module.exports = io
