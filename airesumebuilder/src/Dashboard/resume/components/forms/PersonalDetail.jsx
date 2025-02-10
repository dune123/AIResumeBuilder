import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { Button, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const PersonalDetail = ({enabledNext}) => {
    const params=useParams()
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    
    const handleInputChange=(e)=>{
        enabledNext(false);
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(params)
    },[])

    const onSave=async()=>{
        enabledNext(true);
        setLoading(true);
        const updateData=formData;
        const id=params.resumeId
        try {
            const response=await axios.put(`https://resumeaibuilder-4.onrender.com/api/userResume/UpdateResumeById/${id}`,updateData);

            if(response.status===200){
                toast.success('successfully updated resume')
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-[#B771E5] border-t-4 w-full'>
    <ToastContainer/>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>
        <form>
        <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" required onChange={handleInputChange} value={resumeInfo?.firstName} />
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" required onChange={handleInputChange} value={resumeInfo?.lastName}
                   />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" required 
                    onChange={handleInputChange} value={resumeInfo?.jobTitle} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" required 
                    onChange={handleInputChange} value={resumeInfo?.address} />
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" required 
                    onChange={handleInputChange} value={resumeInfo?.phone} />
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" required 
                    onChange={handleInputChange} value={resumeInfo?.email} />
                </div>
            </div>
            <div className='mt-4 flex justify-end'>
                <Button variant='solid' color='purple' type='submit' onClick={onSave}>Save</Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail