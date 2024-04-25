const Bandset = require("../model/bandset")

const addBandset = (req,res,next) => {  

  const images =  req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename; 

    let bandset = new Bandset({
        bandsetName:req.body.bandsetName,
        bandsetPrice:req.body.bandsetPrice,
        bandsetImages:images,
        bntBookingPeriod:req.body.bntBookingPeriod,
        biddingDuedays:req.body.biddingDuedays,
        category:req.body.category,
    })
    bandset.save().then((bandset) => {
        res.json({
            bandset
        })
   })
}

const getBandset = async (req,res,next) =>{
    const data = await Bandset.find({})
    if (data.length > 0) {
        const reversedData = data.reverse(); // Reverse the order of the data
        res.json(reversedData);
    }else{
     res.json({
        message:"no data"

     })
    }
}


// Get bandset by ID
const getBandsetById = async (req, res, next) => {
    const bandsetId = req.params.id; // Assuming the ID is passed as a parameter
    try {
        const bandset = await Bandset.findById(bandsetId);
        if (bandset) {
            res.json(bandset);
        } else {
            res.status(404).json({ message: "Bandset not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Edit bandset by ID
const editBandset = async (req, res, next) => {
    const bandsetId = req.params.id;
    const { bandsetName, bandsetPrice, bandsetImages,category,bntBookingPeriod,biddingDuedays } = req.body;
    try {
        const updatedBandset = await Bandset.findByIdAndUpdate(
            bandsetId,
            { bandsetName, bandsetPrice, bandsetImages,category,bntBookingPeriod,biddingDuedays },
            { new: true } // To return the updated document
        );
        if (updatedBandset) {
            res.json(updatedBandset);
        } else {
            res.status(404).json({ message: "Bandset not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete bandset by ID
const deleteBandset = async (req, res, next) => {
    const bandsetId = req.params.id;
    try {
        const deletedBandset = await Bandset.findByIdAndDelete(bandsetId);
        if (deletedBandset) {
            res.json({ message: "Bandset deleted successfully" });
        } else {
            res.status(404).json({ message: "Bandset not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addBandset,
    getBandset,
    getBandsetById,
    editBandset,
    deleteBandset
}
 