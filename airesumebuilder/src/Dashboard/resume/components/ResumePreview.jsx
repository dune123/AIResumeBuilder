import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ProffesionalExperiencePreview from './preview/ProffesionalExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-12 border-t-[20px] border-gray-200' style={{borderColor:resumeInfo?.themeColor}}>
        {/* Personal Detail */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Proffesional Experience */}
            <ProffesionalExperiencePreview resumeInfo={resumeInfo}/>
        {/* Educational */}
            <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview