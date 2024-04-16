const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    firstName: { type: String, required:  true },
    lastName: { type: String, required:  true },
    firstName: { type: String, required:  true },
    email: { type: String, required:  true },
    phone: { type: String, required:  true },
    address: { type: String, required:  true },
    place: { type: String, required:  true },
    age: { type: String, required:  true },
    bookingDate: { type: String, required:  true },
})

const Booking = mongoose.model("booking",bookingSchema)
module.exports = Booking 