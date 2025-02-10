import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useContext } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LuBrain } from "react-icons/lu";
import { AIChatSession } from '../../../../../service/AIModal'

const Summery = ({enabledNext}) => {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [summery,setSummery]=useState("");
  const params=useParams()
  const [loading,setLoading]=useState(false);
  const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();

  useEffect(()=>{
    summery&&setResumeInfo({
      ...resumeInfo,
      summery:summery
    })
  },[summery])

  const onSave=async()=>{
    enabledNext(true);
    setLoading(true);
    const updateData={summery:summery};
    try {
        const response=await axios.put(`https://airesumebuilder-w42s.onrender.com/api/userResume/UpdateResumeById/${params.resumeId}`,updateData);

        if(response.status===200){
            toast.success('successfully updated resume')
        }
    } catch (error) {
        toast.error(error.message);
    }
}

  const GenerateSummaryFromAI=async()=>{
    setLoading(true);
    const prompt = `Given the job title: "${resumeInfo.jobTitle}", generate a list of AI-powered summaries for three experience levels: Fresher, Mid-Level, and Experienced. Each summary should be 3-4 lines long. Return the response in JSON format with an array under the key "experience_levels", where each object contains:
- "experience_level": (e.g., "Fresher", "Mid-Level", "Experienced")
- "summary": (a short professional summary suitable for the given job title)`
    const result=await AIChatSession.sendMessage(prompt);

    setAiGenerateSummeryList(JSON.parse(result.response.text()))
    setLoading(false);
  }
  console.log(aiGeneratedSummeryList)
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-[#B771E5] border-t-4 w-full'>
    <ToastContainer/>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summary for your job title</p>
    <div className='mt-7'>
        <div className='flex justify-between items-end mb-5'>
            <label>Add Summery</label>
            <Button variant='outlined' color='purple' onClick={GenerateSummaryFromAI}><LuBrain/>Generated from AI</Button>
        </div>
        <TextArea rows={4} onChange={(e)=>setSummery(e.target.value)} value={resumeInfo?.summery} required>
        </TextArea>
        <div className='flex justify-end mt-2'>
          <Button variant='solid' color='purple' onClick={onSave}disabled={loading}>Save</Button>
        </div>
    </div>
    {
      aiGeneratedSummeryList&&<div className='my-5'>
        <h2>Suggestions</h2>
        {
          aiGeneratedSummeryList?.experience_levels?.
          map((item,index)=>(
            <div key={index} className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
            <p>{item?.summary}</p>
            </div>
          ))
        }
      </div>  
    }
    </div>
  )
}

export default Summery