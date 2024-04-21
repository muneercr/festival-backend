const mongoose = require("mongoose")

const bandsetSchema = mongoose.Schema({
    bandsetName: { type: String, required:  true },
    bandsetPrice: { type: String, required:  true },
    bntBookingPeriod:{ type: Number, required:  true },
    biddingDuedays:{ type: Number, required:  true },
    category: { type: String, required:  true }, 
    bookings: [{ start_date: Date, end_date: Date }],
    bandsetImages:{
        data: Buffer,
        contentType: String
    },
})

const Bandset = mongoose.model("Bandset",bandsetSchema)
module.exports = Bandset