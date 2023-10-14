const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    addLogoUrl: {
        type: String,
        required: true
      },
      jobPosition: {
        type: String,
        required: true
      },
      monthlySalary: {
        type: String,
        required:true
      },
      jobType: {
        type: String,
        required: true
      },
      remoteOffice: {
        type: String,
        required: true
      },
      jobLocation: {
        type: String,
        required: true
      },
      jobDescription: {
        type: String,
        required: true
      },
      aboutCompany: {
        type: String,
        required: true
      },
      skillsRequired: {
        type: String,
        required:true 
      },
      jobInformation: {
        type: String,
        required:true 
      },
})

module.exports = mongoose.model("JobList",jobSchema) ;

