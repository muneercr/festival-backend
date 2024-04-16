const Thambolam = require("../model/thambolam");

const addThambolam = (req, res, next) => {
    let thambolam = new Thambolam({
        thambolamName: req.body.thambolamName,
        thambolamPrice: req.body.thambolamPrice,
        thambolamImages: req.body.thambolamImages,
        category:req.body.category,
        tmbBookingPeriod:req.body.tmbBookingPeriod,
        tmbBiddingDueDays:req.body.tmbBiddingDueDays,
    });
    thambolam.save().then((thambolam) => {
        res.json({
            thambolam
        });
    });
};

const getThambolam = async (req, res, next) => {
    const data = await Thambolam.find({});
    if (data) {
        res.json(data);
    } else {
        res.json({
            message: "No data"
        });
    }
};

// Get thambolam by ID
const getThambolamById = async (req, res, next) => {
    const thambolamId = req.params.id;
    try {
        const thambolam = await Thambolam.findById(thambolamId);
        if (thambolam) {
            res.json(thambolam);
        } else {
            res.status(404).json({ message: "Thambolam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit thambolam by ID
const editThambolam = async (req, res, next) => {
    const thambolamId = req.params.id;
    const { thambolamName, thambolamPrice, thambolamImages,category,tmbBookingPeriod } = req.body;
    try {
        const updatedThambolam = await Thambolam.findByIdAndUpdate(
            thambolamId,
            { thambolamName, thambolamPrice, thambolamImages,category,tmbBookingPeriod },
            { new: true }
        );
        if (updatedThambolam) {
            res.json(updatedThambolam);
        } else {
            res.status(404).json({ message: "Thambolam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete thambolam by ID
const deleteThambolam = async (req, res, next) => {
    const thambolamId = req.params.id;
    try {
        const deletedThambolam = await Thambolam.findByIdAndDelete(thambolamId);
        if (deletedThambolam) {
            res.json({ message: "Thambolam deleted successfully" });
        } else {
            res.status(404).json({ message: "Thambolam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addThambolam,
    getThambolam,
    getThambolamById,
    editThambolam,
    deleteThambolam
};
