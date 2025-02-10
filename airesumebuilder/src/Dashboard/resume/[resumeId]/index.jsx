import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import dummy from "../../../data/dummy";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState(dummy);

    const GetParticularResume = async () => {
        
        try {
            const response = await axios.get(`https://resumeaibuilder-4.onrender.com/api/userResume/getUserResumeId/${params.resumeId}`);

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

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <ToastContainer />
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <FormSection />
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default EditResume;
