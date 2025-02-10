import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from 'antd';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { FaHome } from "react-icons/fa";
import { Link, Navigate, useParams } from 'react-router-dom';

const FormSection = () => {
  const [activeIndex,setActiveIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
      <div className='flex gap-2'>
          <Link to={"/dashboard"}>
            <Button variant='solid' color='purple'><FaHome/></Button>
          </Link>
          <Button>Theme</Button>
      </div>
        <div className='flex gap-2 items-center'>
        {activeIndex>1&&<Button className="flex gap-2" color='purple' variant='solid' onClick={()=>setActiveIndex(activeIndex-1)}><FaArrowLeft/> Prev</Button>}
          <Button disabled={!enableNext} className="flex gap-2" color='purple' variant='solid' onClick={()=>setActiveIndex(activeIndex+1)}>Next <FaArrowRight/></Button>
        </div>
      </div>
      <div className='flex justify-between items-center'>
      {/* Personal Detail */}
        {activeIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>:
        activeIndex==2?<Summery enabledNext={(v)=>setEnableNext(v)}/>:activeIndex===3?<Experience/>:activeIndex===4?<Education enabledNext={(v)=>setEnableNext(v)}/>:activeIndex===5?<Skills enabledNext={(v)=>setEnableNext(v)}/>:activeIndex===6?<Navigate to={'/my-resume/'+resumeId+'/view'}/>:null}
      </div>

    </div>
  )
}

export default FormSection