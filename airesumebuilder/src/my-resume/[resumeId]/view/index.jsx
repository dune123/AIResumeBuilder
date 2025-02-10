import React, { useState ,useEffect} from 'react'
import Header from '../../../components/Header'
import { Button } from 'antd'
import ResumePreview from '../../../Dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { RWebShare } from 'react-web-share'

const View = () => {

  const [resumeInfo,setResumeInfo]=useState();
  const params = useParams();
  
  const GetParticularResume = async () => {
        
    try {
        const response = await axios.get(`https://resumeaibuilder-4.onrender.com/api/userResume/getUserResumeId/${params.resumeId}`);
        console.log(response.data);
        if (response.status === 200) {
            console.log("Resume Data:", response.data.userResume);
            setResumeInfo(response.data.userResume);
        }
    } catch (error) {
        console.error("Error fetching resume:", error);
        toast.error(error.message);
    }
};

useEffect(() => {
    if (params.resumeId) {
        GetParticularResume();
    }
}, [params.resumeId]);

  const HandleDownlaod=()=>{
    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id='no-print'>
        <Header/>

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>Congrats! Your Ulitmate AI generated Resume is ready</h2>
          <p className='text-center text-gray-400'>Now youare ready to download your resume and you can share resume url with the recruiter</p>
          <div className='flex justify-between px-30 py-10'>
            <Button variant='solid' color='purple' onClick={HandleDownlaod}>Download</Button>
            <RWebShare
             data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"my-resume/"+params.resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
            >
            <Button variant='solid' color='purple'>Share</Button>
            </RWebShare>
          </div>
          </div>
        </div>
        <div id='print-area'>
            <ResumePreview/>
          </div>
    </ResumeInfoContext.Provider>
  )
}

export default View