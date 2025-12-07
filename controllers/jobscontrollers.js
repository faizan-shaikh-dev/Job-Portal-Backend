import Job from "../models/jobModels.js";

//Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    if (!jobs) {
      return res.status(404).json({ message: "No Jobs found" });
    }
    return res.json(jobs);
  } catch (error) {
    console.error("getAllJobs", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//Get single Job by Id
const getJobById = async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id).lean();
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json(jobs);
  } catch (error) {
    console.error("getJobByid", error);
    return res.status(500).json({ message: "internal server errro" });
  }
};

//Create New Job
const newJobs = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      category: req.body.category,
      salary: req.body.salary,
      description: req.body.description,
      responsibilities: req.body.responsibilities,
      requirements: req.body.requirements,
      jobType: req.body.jobType,
      experience: req.body.experience,
      logo: req.body.logo,
      contactEmail: req.body.contactEmail,
      applyUrl: req.body.applyUrl || req.body.applyLink || undefined,
      postedBy: req.user ? req.user.id : req.body.postedBy || null,
    };

    if (!payload) {
      return res.status(400).json({ message: "rquired fields is missing" });
    }

    const job = await Job.create(payload);
    return res.status(201).json(job, { message: "Job Created" });
    console.log(job);
    
    
  } catch (error) {
    console.error("newJobs", newJobs);
    res.status(500).json({ message: "internal server error" });
  }
};

//Update Jobs
const updateJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.body.applyLink) {
      updateData.applyUrl = req.body.applyLink;
      delete updateData.applyLink;
    }

    const updatedJobs = await Job.findByIdAndUpdate(
      id,
      req.body,

      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedJobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJobs, { message: "Job Updated" });
  } catch (error) {
    console.error("updateJobs", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//Delete Jobs
const deletJobs = async (req, res) => {
  try {
    const { id } = req.params;

    const deletJob = await Job.findByIdAndDelete(id).lean();

    if (!deletJob) {
      return res.status(404).json({ message: "job not found" });
    }

    return res.status(200).json({ message: "Job Deleted" });
  } catch (error) {
    console.error("deletJobs", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export { getAllJobs, getJobById , newJobs, updateJobs, deletJobs };
