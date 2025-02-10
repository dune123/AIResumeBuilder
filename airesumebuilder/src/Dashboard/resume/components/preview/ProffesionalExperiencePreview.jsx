/*import React from "react";

const ProffesionalExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Proffesional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName} {experience?.city} {experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
        </div>
      ))}
    </div>
  );
};

export default ProffesionalExperiencePreview;*/
import React from 'react'

function ExperiencePreview({resumeInfo}) {
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
  
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{formatDate(experience?.startDate)} To {experience?.currentlyWorking?'Present':formatDate(experience.endDate)} </span>
                </h2>
                {/* <p className='text-xs my-2'>
                    {experience.workSummery}
                </p> */}
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview
