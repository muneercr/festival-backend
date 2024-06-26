const Program = require('../model/program');
const Bandset =require("../model/bandset")
const io = global.io;


const bandsetBidding = async (req,res) => {
    io.on('connection', (socket) => { 
       console.log('A user connected');
       
       socket.on('msg', (data) => {
           console.log('messege from user',data);

       });
       socket.emit("welcome" , "thanks for your mshdd")
     });
    const { id } =req.params
    const bandset =await Bandset.findById(id) 
    console.log("bandset",bandset);
    

    const currentDate = new Date();

    const biddingDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const bidEndingDate = new Date();
          bidEndingDate.setDate(bidEndingDate.getDate() + bandset?.biddingDuedays); // Add biddingDuedays days
    const bidEndingDateTime = `${bidEndingDate.getFullYear()}-${(bidEndingDate.getMonth() + 1).toString().padStart(2, '0')}-${bidEndingDate.getDate().toString().padStart(2, '0')}T${bidEndingDate.getHours().toString().padStart(2, '0')}:${bidEndingDate.getMinutes().toString().padStart(2, '0')}`;


console.log("bidEndingDateTime",bidEndingDateTime);


    bandset.bids.push({
        start_date: req.body.start_date,
        end_date: req.body.start_date,
        biddingAmount:req.body.biddingAmount,
        bidderName:req.body.bidderName,  
        biddingDateTime:biddingDateTime,
        bidEndingDateTime:bidEndingDateTime,
        userId:req.body.userId,
        booking:false,
        bidAccepted:true

        
    });

    bandset.bids.sort((a, b) => b.biddingAmount - a.biddingAmount);

    try { 
        await bandset.save();

        res.json({ bandset });
    } catch (error) {
        console.error("Error booking program:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
// Controller function to book a program by date
const bookProgram = async (req, res) => {
    const { id } = req.params; // Program ID  
    const bandset =await Bandset.findById(id) 
     const overlappingBooking = bandset.bookings.find(booking => {
        const existingStartDate = new Date(booking.start_date);
        const existingEndDate = new Date(booking.end_date);
        const newStartDate = new Date(req.body.bookedDates);
        const newEndDate = new Date(req.body.bookedDates);

        return (
            (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
            (newEndDate >= existingStartDate && newEndDate <= existingEndDate)
        );
    });

    if (overlappingBooking) {
        return res.status(400).json({ error: "Program cannot be booked on already booked dates" });
    } 

    let program = new Program({
        bookedDates:req.body.bookedDates,
        bookingPrice:bandset.bandsetPrice, 
        bandsetName:bandset.bandsetName,   
        timeStarting: req.body.timeStarting,
        timeEnding: req.body.timeEnding,
        food: req.body.food,
        biddingAmount: req.body.biddingAmount,
        advance:req.body.advance,
        pendingAmount:req.body.pendingAmount,
        committeeName:req.body.committeeName

    })
    console.log("bandset.bookings",bandset.bookings);
    bandset.bookings.push({
        start_date: req.body.bookedDates,
        end_date: req.body.bookedDates,
        committeeName:req.body.committeeName,
    });
    
    try {
        await program.save();
        await bandset.save();

        res.json({ program });
    } catch (error) {
        console.error("Error booking program:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }


   

   
};



// Controller function to get all booking data for programs
const getAllBookingData = async (req, res) => {
    const data = await Program.find({}) 
    if (data.length > 0) {
        const reversedData = data.reverse(); // Reverse the order of the data
        res.json(reversedData);
    }else{
     res.json({
        message:"no data"

     })
    }
   
};


const getByDate = async (req, res, next) => {
    console.log("hhhhhhhhhh");
    const { startDate, endDate } = req.query; // Date range provided as query parameters (format: YYYY-MM-DD)
    console.log("startDate",startDate);
    try {
        const programs = await Program.find({
            bookedDates: {
                $gte: startDate,
                $lte: endDate
            }
        });
        if (programs.length > 0) {
            res.json(programs);
        } else {
            res.status(404).json({ message: "No programs booked within this date range" });
        }
    } catch (error) {
        console.error("Error retrieving programs by date range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { bookProgram ,getAllBookingData,getByDate,bandsetBidding}