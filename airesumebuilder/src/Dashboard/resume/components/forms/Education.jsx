import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Education = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { user } = useUser();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList([...educationalList].slice(0, -1));
  };

  const onSave = async () => {
    const id=resumeInfo._id;
    try {
      const response = await axios.put(
        `https://airesumebuilder-w42s.onrender.com/api/userResume/updateEducation/${id}`,
        { education: educationalList }
      );

      if (response.status === 200) {
        toast.success("Education saved successfully");
      }
    } catch (error) {
      toast.error("Education not saved");
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  useEffect(() => {
    if (resumeInfo && resumeInfo.education) {
      const formattedExperience = resumeInfo.education.map((exp) => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "", // Format to YYYY-MM-DD
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "", // Handle null case
      }));
      setEducationalList(formattedExperience);
    }
  }, []);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#B771E5] border-t-4 w-full">
      <ToastContainer />
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg border-gray-200">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree" 
                onChange={(e) => handleChange(e, index)} 
                  value={item?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)}
                value={item?.major} />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.endDate}
                />
              </div>
              <div>
                <label>Description</label>
                <TextArea
                  name="description"
                  className="col-span-2"
                  style={{ gridColumn: "span 2 / span 2", width: "100%" }}
                  onChange={(e) => handleChange(e, index)}
                  value={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outlined" color="purple" onClick={AddNewEducation}>
              + Add More Educawtion
            </Button>
            <Button variant="outlined" color="purple" onClick={RemoveEducation}>
              - Remove
            </Button>
          </div>
          <Button variant="solid" color="purple" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;
