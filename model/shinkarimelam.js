const mongoose = require("mongoose");

const shinkarimelamSchema = mongoose.Schema({
    shinkarimelamName: { type: String, required: true },
    shinkarimelamPrice: { type: String, required: true },
    category: { type: String, required:  true },
    snkBookingPeriod:{ type: String, required:  true },
    snkBiddingDueDays:{ type: String, required:  true },
    shinkarimelamImages: {
        data: Buffer,
        contentType: String
    }
});

const Shinkarimelam = mongoose.model("Shinkarimelam", shinkarimelamSchema);
module.exports = Shinkarimelam;
