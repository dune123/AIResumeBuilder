import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Button } from "antd";
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import CustomSpinner from "../../components/CustomSpinner";
import { useNavigate } from "react-router-dom";
const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle,setResumeTitle] = useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {user}=useUser();

  const onCreate=async()=>{
    setLoading(true);
    const uuidID=uuidv4();
    const data={
      title:resumeTitle,
      resumeId:uuidID,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName
    }

    try {
      const response=await axios.post('https://airesumebuilder-w42s.onrender.com/api/userResume/createResume',data)
      console.log(response);
      if(response.status==200){
        toast.success("Resume Added Successfully");
        setLoading(false);
        navigate('/dashboard/resume/'+response.data.userResumeId+'/edit')
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  }
  return (
    <div>
      <ToastContainer/>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-[#F5F5F5] border-none rounded-2xl mt-4 h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer hover:border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <CiSquarePlus className="text-2xl font-extrabold" />
        {/* Open the modal using document.getElementById('ID').showModal() method */}
      </div>
      {
        openDialog&&(
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-gray-800">Create New Resume</h2>
            <p className="mt-4 text-gray-600 mb-2">
              Add a title for your new Resume 
            </p>
            <Input placeholder="Ex. Full Stack resume" onChange={(e)=>setResumeTitle(e.target.value)}/>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                onClick={()=>setOpenDialog(false)}
                color="default" variant="text"
              >
                Cancel
              </Button>
              <Button disabled={!resumeTitle||loading} color="purple" variant="solid" onClick={onCreate}>{loading?<CustomSpinner/>:'Create'}</Button>
            </div>
          </div>
        </div>
            </div>
        )
      }
    </div>
  );
};

export default AddResume;
