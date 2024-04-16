const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({
    doctorName:{ type: String, required:  true },
    Speciality:{ type: String, required:  true },
    discription:{ type: String, required:  true }, 
    AcademicQualifications:{ type: String, required:  true },
    IndustryExperience:{ type: String, required:  true },
    doctorImgae:{
        data: Buffer,
        contentType: String
    },
    dateShedule:[
        {type:String,},
    ] 
})

const Doctor = mongoose.model("doctors",doctorSchema)
module.exports = Doctor 