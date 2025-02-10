const express=require('express');
const { CreateNewResume, getAllResume, updateResume, updateExperience, updateEducation, updateUserSkills, getUserResumeById, deleteResumeById } = require('../controller/UserResume');

const router=express.Router();
router.post('/createResume',CreateNewResume);
router.get('/getAllResume',getAllResume);
router.put('/UpdateResumeById/:resumeId',updateResume);
router.put('/updateExperience/:id',updateExperience);
router.put('/updateEducation/:id',updateEducation);
router.put('/updateUserSkills/:id',updateUserSkills);
router.get('/getUserResumeId/:resumeId',getUserResumeById);
router.delete('/deleteResumeById/:resumeId',deleteResumeById);

module.exports = router;