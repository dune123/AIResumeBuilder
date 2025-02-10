import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { CiSquarePlus } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import ResumeCardItem from './components/ResumeCardItem';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  
  async function GetResumeList(useremail) {
    try {
      const response = await axios.get(`https://airesumebuilder-w42s.onrender.com/api/userResume/getAllResume?email=${useremail}`);
  
      
      if (response.status === 200) {
        setResumeList(response.data.getAllResume); // Access `resumes` correctly
        
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to fetch resumes");
    }
  }
  
  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      GetResumeList(email);
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <div className='p-10 md:px-20 lg:px-32'>
    <ToastContainer/>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creaating AI resume to your next JOB</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <AddResume/>
        {
          resumeList.length>0&&resumeList.map((item,index)=>(
            <ResumeCardItem key={index} resume={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard