 const mongoose = require("mongoose")

const programSchema = mongoose.Schema({
    bookedDates: { type: String },
    bookingPrice:{ type: String, required:  false },
    bandsetName:{ type: String, required:  false },
    committeeName:{ type: String, required:  false },
    timeStarting:{ type: String, required:  true },
    timeEnding:{ type: String, required:  true },
    food:{ type: String, required:  true },
    agrimentAmount:{ type: String, required:  true },
    advance:{ type: String, required:  false },
    pendingAmount:{ type: String, required:  false },
})

const Program = mongoose.model("Program",programSchema)
module.exports = Program


