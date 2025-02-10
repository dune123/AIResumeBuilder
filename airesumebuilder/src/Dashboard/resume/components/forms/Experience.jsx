import { Button, Input } from "antd";
import React, { useEffect, useState ,useContext} from "react";
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { toast, ToastContainer } from "react-toastify";
import RichTextEditor from "../RichTextEditor";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
const Experience = () => {
  const [experienceList, setExperienceList] = useState([formField]);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const {user}=useUser();
  const params=useParams()

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setExperienceList((prevList) => {
      const updatedList = prevList.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      );
      return updatedList;
    });
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const onRichTextEditorChange=(e,name,index)=>{
    const newEntries=[...experienceList];
    newEntries[index][name]=e.target.value;
    setExperienceList(newEntries);
  }

  const RemoveExperience=()=>{
    setExperienceList([...experienceList].slice(0,-1));
  }

  useEffect(()=>{
    if (resumeInfo && resumeInfo.experience) {
      const formattedExperience = resumeInfo.experience.map((exp) => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "", // Format to YYYY-MM-DD
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "", // Handle null case
      }));
      setExperienceList(formattedExperience);
    }
  },[])
console.log("resumeInfo",resumeInfo)
  const onSave=async()=>{
    try {
      const id = resumeInfo?._id; // Ensure we get the correct resume ID

      if (!id) {
        toast.error("User resume ID is missing");
        return;
      }

      const response = await axios.put(
        `https://resumeaibuilder-6.onrender.com/api/userResume/updateExperience/${id}`, // Use resumeId correctly
        { experience: experienceList }
      );
  
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Experiences saved successfully");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast.error("Failed to update experience");
    }
  }

  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        experience:experienceList
    })
  },[experienceList])
  console.log(resumeInfo.experience)
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#B771E5] border-t-4 w-full">
      <ToastContainer />
      <h2 className="font-bold text-lg">Proffesional Experience</h2>
      <p>Add your previous Job experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg border-gray-200">
              <div>
                <label className="text-xs">Position Title</label>
                <Input name="title" onChange={(e) => handleChange(index, e)} value={item?.title}/>
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(e) => handleChange(index, e)}
                  value={item?.companyName}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name="city" onChange={(e) => handleChange(index, e)} value={item?.city}/>
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input name="state" onChange={(e) => handleChange(index, e)} value={item?.state}/>
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(index, e)}
                  type="date"
                  value={item?.startDate}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(index, e)}
                  type="date"
                  value={item?.endDate}
                />
              </div>
              {/* Worl summery */}
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextEditorChange={(e)=>onRichTextEditorChange(e,'workSummery',index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outlined" color="purple" onClick={AddNewExperience}>
            + Add More Experience
          </Button>
          <Button variant="outlined" color="purple" onClick={RemoveExperience}>
            - Remove
          </Button>
        </div>
        <Button variant="solid" color="purple" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Experience;
