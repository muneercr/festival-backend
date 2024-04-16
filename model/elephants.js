const mongoose = require("mongoose")

const elephantSchema = mongoose.Schema({
    elephantName: { type: String, required:  true },
    elephantPrice: { type: String, required:  true },
    category: { type: String, required:  true },
    elpBookingPeriod: { type: String, required:  true }, 
    elpBiddingDueDays: { type: String, required:  true },  
    elephantImages:{
        data: Buffer,
        contentType: String
    },
})

const Elephants = mongoose.model("Elephants",elephantSchema)
module.exports = Elephants 