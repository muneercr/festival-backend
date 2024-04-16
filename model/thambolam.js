const mongoose = require("mongoose");

const thambolamSchema = mongoose.Schema({
    thambolamName: { type: String, required: true },
    thambolamPrice: { type: String, required: true },
    category: { type: String, required:  true },
    tmbBookingPeriod: { type: String, required:  true },
    tmbBiddingDueDays: { type: String, required:  true },
    thambolamImages: {
        data: Buffer,
        contentType: String
    }
});

const Thambolam = mongoose.model("Thambolam", thambolamSchema);
module.exports = Thambolam;
