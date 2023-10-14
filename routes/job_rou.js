const express = require('express')
const router = express.Router();
const JobList = require('../schema_model/job_mod')
const verifyjwt = require('../middlewares/middleware')


router.post("/postJob", verifyjwt, async (req, res) => {
  try {
    const {
      companyName,
      addLogoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      jobInformation,
    } = req.body;

    if (
      !companyName ||
      !addLogoUrl ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !remoteOffice ||
      !jobLocation ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !jobInformation
    )
      return res
        .status(400)
        .json({ error: "Please provide all following fields" });

    //if joblocation is remote set to empty
    const JobSpace = jobLocation === "" ? "Remote" : jobLocation;
    const Logo = req.body.addLogoUrl
      ? req.body.addLogoUrl
      : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

    const newJobList = new JobList({
      companyName,
      addLogoUrl: Logo,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation: JobSpace,
      jobDescription,
      aboutCompany,
      skillsRequired,
      jobInformation
    });
    await newJobList.save();

    res.status(200).json({ message: "Job post is success" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

router.patch("/postJob/:id", verifyjwt, async (req, res) => {
  try {
    const {
      companyName,
      addLogoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      jobInformation,
    } = req.body;

    if (
      !companyName ||
      !addLogoUrl ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !remoteOffice ||
      !jobLocation ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !jobInformation
    )
      return res
        .status(400)
        .json({ error: "Please provide all following fields" });

    const { id } = req.params;
    const updateJobSpace = jobLocation === "" ? "Remote" : jobLocation;
    const updateLogo = req.body.addLogoUrl
      ? req.body.addLogoUrl
      : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

    await JobList.findByIdAndUpdate(id, {
      companyName,
      addLogoUrl: updateLogo,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation: updateJobSpace,
      jobDescription,
      aboutCompany,
      skillsRequired,
      jobInformation,
    });

    if (!JobList) {
      return res.status(404).json({ error: "Job list not found" });
    }

    res.status(200).json({ message: "job update is success" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/jobSkills', async (req, res) => {
  try {
    const { skills, search } = req.query;
    const filter = {};
    if (skills) filter.skillsRequired = { $in: skills.split(",") };
    if (search) filter.jobPosition = new RegExp(search, 'i');

    const JobList = await JobList.find(filter);

    res.status(200).json({ JobList});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get('/jobSkills/:id', async (req, res) => {
  try {
    const id = req.params;
    const JobList = await JobList.findById(id);
    if(!JobList){
      return res
              .status(404)
              .json({error: 'job list not found'})
    }
    res.status(200).json({JobList});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
