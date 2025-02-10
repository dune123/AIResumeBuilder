const mongoose = require("mongoose");
const UserResume = require("../models/UserResumeModel");
const UserExperience = require("../models/UserExperience");
const UserEducation = require("../models/UserEducation");
const UserSkills = require("../models/UserSkills");

module.exports.CreateNewResume = async (req, res, next) => {
  try {
    const { title, resumeId, userEmail, userName } = req.body;

    if (!title || !resumeId || !userEmail || !userName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newResume = new UserResume({
      title,
      resumeId,
      userEmail,
      userName,
      themeColor:"#ff6666"
    });

    await newResume.save();

    return res
      .status(200)
      .json({ userResumeId: newResume._id, message: "Resume created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllResume = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(409).json({ message: "User should be given" });
    }

    const getAllResume = await UserResume.find({ userEmail: email });

    return res.status(200).json({ getAllResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateResume = async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    const updateData = req.body;

    if (!resumeId) {
      return res
        .status(404)
        .json({ message: "Resume Id is required for updating" });
    }
    console.log(resumeId, updateData);
    const updatedResume = await UserResume.findByIdAndUpdate(
      resumeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res
      .status(200)
      .json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user's experience
module.exports.updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params; // Get _id from request params
    const { experience } = req.body; // Get experience array from request body
    console.log("id=>",id);
    console.log("Received Experience Data:", experience);

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user resume ID" });
    }
    
    if (!experience || !Array.isArray(experience)) {
      return res.status(400).json({ error: "Invalid experience data" });
    }

    // Find UserResume by _id
    let userResume = await UserResume.findById(id);

    if (!userResume) {
      return res.status(404).json({ error: "UserResume not found" });
    }

    // Remove old experience records
    if (userResume.experience.length > 0) {
      await UserExperience.deleteMany({ _id: { $in: userResume.experience } });
    }

    // Insert new experience records
    const newExperience = await UserExperience.insertMany(experience);

    // Update UserResume with new experience references
    userResume.experience = newExperience.map((exp) => exp._id);
    await userResume.save();

    return res.status(200).json({
      message: "Experience updated successfully",
      userResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params; // Extract resume ID from request parameters
    const { education } = req.body; // Extract education data from request body

    // Validate resume ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid resume ID" });
    }

    // Validate education input
    if (!education || !Array.isArray(education)) {
      return res.status(400).json({ error: "Invalid education data" });
    }

    // Validate startDate and endDate format
    for (const edu of education) {
      if (
        !edu.startDate ||
        !edu.endDate ||
        isNaN(Date.parse(edu.startDate)) ||
        isNaN(Date.parse(edu.endDate))
      ) {
        return res.status(400).json({ error: "Invalid date format" });
      }
    }

    // Find UserResume by ID
    let userResume = await UserResume.findById(id);

    if (!userResume) {
      return res.status(404).json({ error: "UserResume not found" });
    }

    // Remove old education records
    if (userResume.education.length > 0) {
      await UserEducation.deleteMany({ _id: { $in: userResume.education } });
    }

    // Insert new education records
    const newEducation = await UserEducation.insertMany(education);

    // Update UserResume with new education references
    userResume.education = newEducation.map((edu) => edu._id);
    await userResume.save();

    return res.status(200).json({
      message: "Education updated successfully",
      userResume,
    });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateUserSkills = async (req, res) => {
  try {
    const { id } = req.params; // Extract resume ID from request parameters
    const { skills } = req.body; // Extract skills data from request body

    // Validate resume ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid resume ID" });
    }

    // Validate skills input
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Invalid skills data" });
    }

    // Find UserResume by ID
    let userResume = await UserResume.findById(id);

    if (!userResume) {
      return res.status(404).json({ error: "UserResume not found" });
    }

    // Remove old skills records
    if (userResume.skills.length > 0) {
      await UserSkills.deleteMany({ _id: { $in: userResume.skills } });
    }

    // Insert new skills records
    const newSkills = await UserSkills.insertMany(skills);

    // Update UserResume with new skills references
    userResume.skills = newSkills.map((skill) => skill._id);
    await userResume.save();

    return res.status(200).json({
      message: "Skills updated successfully",
      userResume,
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getUserResumeById=async(req,res,)=>{
  try {
    const { resumeId } = req.params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(resumeId);
    
    let query = isValidObjectId ? { _id: resumeId } : { resumeId: resumeId };
    
    // Fetch raw data without population
    let userResume = await UserResume.findOne(query).lean();
    console.log("🔍 Raw Fetched Resume Before Populate:", userResume);
    
    // If userResume is found but education is empty, problem is in the database
    if (!userResume) {
        console.log("Resume not found for ID:", resumeId);
        return res.status(404).json({ success: false, message: "Resume not found" });
    }
    
    // Fetch with population
    userResume = await UserResume.findOne(query)
        .populate({ path: "education", model: "UserEducation" }) // Explicit model reference
        .populate("experience")
        .populate("skills")
        .exec();
    
    console.log("✅ Fully Populated Resume:", userResume);
    return res.json({ success: true, userResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports.deleteResumeById=async(req,res)=>{
  try {
    const {resumeId}=req.params;
    console.log(resumeId);
    await UserResume.findByIdAndDelete({_id:resumeId});

    return res.status(200).json({success: true, message:"Successfully deleted resume"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}