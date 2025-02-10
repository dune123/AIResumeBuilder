import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ResumeDropdown from '../../components/Dropdown'

const ResumeCardItem = ({resume}) => {
  
  return (
    <div>
    <Link to={'/dashboard/resume/'+resume._id+"/edit"}>
      <div className='p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] rounded-t-lg border-[#ff6666] border-t-4 rounded-lg mt-4 hover:scale-105 transition-all hover:shadow-md shadow-[#B771E5]'>
        <img src="/cv.png" width={80} height={80}/>
      </div>
    </Link>
    <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
         style={{
          background:resume?.themeColor
        }}>
        <h2 className='text-sm'>{resume.title}</h2>
        <ResumeDropdown resume={resume}/>
        </div>
    </div>
  )
}

export default ResumeCardItem