const Doctor = require("../model/docterDetails")

const createDoctor = (req,res,next) => {
    let doctor = new Doctor({
        doctorName:req.body.doctorName,
        Speciality:req.body.Speciality,
        discription:req.body. discription,
        AcademicQualifications:req.body.AcademicQualifications,
        IndustryExperience:req.body.IndustryExperience,
        doctorImgae:req.body.doctorImgae,
        dateShedule:req.body.dateShedule
    })
   doctor.save().then((doctor) => {
        res.json({
            doctor
        })
   })
}

const getDoctor = async (req,res,next) =>{
    const data = await Doctor.find({})
    if(data){
        res.json(data);
    }else{
     res.json({
        message:"no data"

     })
    }
}

module.exports = { createDoctor ,getDoctor}