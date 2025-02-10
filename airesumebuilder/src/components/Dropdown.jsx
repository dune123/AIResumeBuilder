import { useState, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ResumeDropdown = ({ resume }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const dropdownRef = useRef(null);
  const params=useParams();
  const resumeId=resume._id;
  console.log(resumeId);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel=()=>{
    setOpenAlert(false);
  }

  const handleDelete=async()=>{
    try {
      console.log(params.resumeId);
      const response=await axios.delete(`https://resumeaibuilder-4.onrender.com/api/userResume/deleteResumeById/${resumeId}`)

      if(response.status===200){
        toast.success(response.data.message);
        setOpenAlert(false);
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
    <ToastContainer/>
      <button onClick={toggleDropdown} className="p-2 rounded-full hover:bg-gray-200">
        <MoreVertical className='h-4 w-4 cursor-pointer' />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/dashboard/resume/${resume._id}/edit`)}>Edit</li>
            <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/my-resume/${resume._id}/view`)}>View</li>
            <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/my-resume/${resume._id}/view`)}>Download</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={() => setOpenAlert(true)}>Delete</li>
          </ul>
        </div>
      )}
      {
        <Modal open={openAlert} onCancel={handleCancel} onOk={handleDelete}>
          <p>Are you sure you want to delete this resume?</p>
          
        </Modal>
      }
    </div>
  );
};

export default ResumeDropdown;
