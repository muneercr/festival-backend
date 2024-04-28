const mongoose = require("mongoose")

const bandsetSchema = mongoose.Schema({
    bandsetName: { type: String, required:  true },
    bandsetPrice: { type: String, required:  true },
    bntBookingPeriod:{ type: Number, required:  true },
    biddingDuedays:{ type: Number, required:  true },
    category: { type: String, required:  true }, 
    bookings: [{ start_date: Date, end_date: Date,committeeName:String }],
    bids: [{ start_date: Date, end_date: Date,biddingAmount:String,bidderName:String,
            biddingDateTime:String,booking:String,biddingDateTime:String,bidAccepted:String }],  
    bandsetImages: { type: String, required:  false }, 
})

const Bandset = mongoose.model("Bandset",bandsetSchema)
module.exports = Bandset