const Shinkarimelam = require("../model/shinkarimelam");

const addShinkarimelam = (req, res, next) => {
    let shinkarimelam = new Shinkarimelam({
        shinkarimelamName: req.body.shinkarimelamName,
        shinkarimelamPrice: req.body.shinkarimelamPrice,
        shinkarimelamImages: req.body.shinkarimelamImages,
        category:req.body.category,
        snkBookkingPeriod:req.body.snkBookkingPeriod,
        snkBiddingDueDays:req.body.snkBiddingDueDays,
    });
    shinkarimelam.save().then((shinkarimelam) => {
        res.json({ shinkarimelam });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
};

const getShinkarimelam = async (req, res, next) => {
    try {
        const data = await Shinkarimelam.find({});
        if (data) {
            res.json(data);
        } else {
            res.json({ message: "No data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShinkarimelamById = async (req, res, next) => {
    const shinkarimelamId = req.params.id;
    try {
        const shinkarimelam = await Shinkarimelam.findById(shinkarimelamId);
        if (shinkarimelam) {
            res.json(shinkarimelam);
        } else {
            res.status(404).json({ message: "Shinkarimelam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editShinkarimelam = async (req, res, next) => {
    const shinkarimelamId = req.params.id;
    const { shinkarimelamName, shinkarimelamPrice, shinkarimelamImages,category ,snkBookkingPeriod,snkBiddingDueDays} = req.body;
    try {
        const updatedShinkarimelam = await Shinkarimelam.findByIdAndUpdate(
            shinkarimelamId,
            { shinkarimelamName, shinkarimelamPrice, shinkarimelamImages,category,snkBookkingPeriod,snkBiddingDueDays },
            { new: true }
        );
        if (updatedShinkarimelam) {
            res.json(updatedShinkarimelam);
        } else {
            res.status(404).json({ message: "Shinkarimelam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteShinkarimelam = async (req, res, next) => {
    const shinkarimelamId = req.params.id;
    try {
        const deletedShinkarimelam = await Shinkarimelam.findByIdAndDelete(shinkarimelamId);
        if (deletedShinkarimelam) {
            res.json({ message: "Shinkarimelam deleted successfully" });
        } else {
            res.status(404).json({ message: "Shinkarimelam not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addShinkarimelam,
    getShinkarimelam,
    getShinkarimelamById,
    editShinkarimelam,
    deleteShinkarimelam
};
