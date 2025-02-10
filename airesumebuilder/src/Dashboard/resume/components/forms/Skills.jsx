import { Input,Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const skillList = ({enabledNext}) => {

    const [skillList,setskillList]=useState([{
        name:'',
        rating:0
    }])
    const {user}=useUser();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    

    const handleChange=(index,field,value)=>{
        const newEntries=[...skillList];
        newEntries[index][field]=value;
        setskillList(newEntries);
    }
    
    const AddNewskillList=()=>{
        const newskillList=[...skillList];
        setskillList([...newskillList,{
            name:'',
            rating:0
        }])
    }

    const RemoveskillList=()=>{
        setskillList([...skillList].slice(0,-1))
    }

    const onSave=async()=>{
      const id=resumeInfo._id
        try {
          const response=await axios.put(`https://resumeaibuilder-4.onrender.com/api/userResume/updateUserSkills/${id}`,{skills:skillList});
    
          if(response.status===200){
            toast.success("Skills saved successfully")
          } 
    
        } catch (error) {
            console.error(error.message);
          toast.error("skill not saved") 
        }
    }
    
   useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillList
        })
    },[skillList])
  
  useEffect(()=>{
    resumeInfo&&setskillList(resumeInfo?.skills)
  },[])
  return (
    <div className='w-full'>
    <div className="p-5 shadow-lg rounded-lg border-t-[#B771E5] border-t-4 w-full">
      <ToastContainer />
      <h2 className="font-bold text-lg">skill</h2>
      <p>Add your top proffesional key skill</p>
      <div className='flex flex-col gap-4'>
        {
            skillList.map((item,index)=>(
                <div key={index} className='flex justify-between rounded-lg border border-gray-200 p-3'>
                    <div>
                        <label className='text-xs'>Name</label>
                        <Input className='w-full' onChange={(e)=>handleChange(index,'name',e.target.value)}
                          value={item.name}
                        />
                    </div>
                    <Rating style={{maxWidth:120}}  value={item.rating} onChange={(v)=>handleChange(index,'rating',v)}/>
                </div>
            ))
        }
      </div>
      <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  color="purple"
                  onClick={AddNewskillList}
                >
                  + Add More skillList
                </Button>
                <Button
                  variant="outlined"
                  color="purple"
                  onClick={RemoveskillList}
                >
                  - Remove
                </Button>
              </div>
              <Button variant="solid" color="purple" onClick={onSave}>
                Save
              </Button>
            </div>
      </div>
    </div>
  )
}

export default skillList