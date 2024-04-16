const Elephants = require("../model/elephants")

const addElephant = (req,res,next) => {
    let elephant = new Elephants({
        elephantName:req.body.elephantName,
        elephantPrice:req.body.elephantPrice,
        category:req.body.category,
        elpBookingPeriod:req.body.elpBookingPeriod,
        elpBiddingDueDays:req.body.elpBiddingDueDays,
        elephantImages:req.body. elephantImages,  
        
    })
    elephant.save().then((elephant) => {
        res.json({
            elephant
        })
   })
}

const getElephant = async (req,res,next) =>{
    const data = await Elephants.find({})
    if(data){
        res.json(data);
    }else{
     res.json({
        message:"no data"

     })
    }
}
const getAllElephants = async (req, res) => {
    try {
        const data = await Elephants.find({});
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({
                message: "No elephants found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const getElephantById = async (req, res) => {
    const elephantId = req.params.id; // Assuming you pass the elephant ID as a route parameter
    
    try {
        const elephant = await Elephants.findById({ _id :elephantId});

        if (elephant) {
            res.json({
                message: "Elephant found successfully",
                elephant,
            });
        } else {
            res.json({
                message: "Elephant not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const editElephantById = async (req, res) => {
    const elephantId = req.params.id; // Assuming you pass the elephant ID as a route parameter
    
    try {
        const updatedElephant = await Elephants.findByIdAndUpdate({ _id :elephantId}, {
            elephantName: req.body.elephantName,
            elephantPrice: req.body.elephantPrice,
            elpBookingPeriod:req.body.elpBookingPeriod,
            elpBiddingDueDays:req.body.elpBiddingDueDays,
            category: req.body.category, 
            elephantImages: req.body.elephantImages,

        }, { new: true });

        if (updatedElephant) {
            res.json({
                message: "Elephant updated successfully",
                elephant: updatedElephant,
            });
        } else {
            res.json({
                message: "Elephant not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};


const deleteElephantById = async (req, res) => {
    const elephantId = req.params.id; // Assuming you pass the elephant ID as a route parameter
    
    try {
        const deletedElephant = await Elephants.findByIdAndDelete({ _id :elephantId});

        if (deletedElephant) {
            res.json({
                message: "Elephant deleted successfully",
                elephant: deletedElephant,
            });
        } else {
            res.json({
                message: "Elephant not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};



module.exports = {  addElephant,getElephant,getAllElephants ,getElephantById ,editElephantById ,deleteElephantById}