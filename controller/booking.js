const Booking = require("../model/boooking")

const AddBooking = (req,res) => {
  let booking = new Booking({
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    place: req.body.place,
    age: req.body.age,
    bookingDate: req.body.bookingDate
  })

  booking.save()
    .then((booking) => {
        res.json({
            booking
        });
    }) 
}

const getAllBookings =async (req,res) => {
    const data = await Booking.find({});
    console.log(data);
    if(data){
        res.json(data);
    }else{
     res.json({
        message:"no data"

     })
    }
    }
    

module.exports = { AddBooking ,getAllBookings}