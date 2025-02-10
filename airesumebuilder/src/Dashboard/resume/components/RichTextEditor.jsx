import React, { useState } from "react";
import { Editor, EditorProvider,Toolbar,BtnBold,BtnItalic,BtnUnderline,BtnStrikeThrough,Separator,BtnNumberedList,BtnBulletList,BtnLink} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useContext } from "react";
import { toast,ToastContainer } from "react-toastify";
import { Button } from "antd";
import { AIChatSession } from "../../../../service/AIModal";
import { LuBrain } from "react-icons/lu";


const PROMPT='position title: {positionTitle}. Based on the position title, generate 5-7 bullet points for my experience in a resume. Return only an array of strings (without JSON keys or objects)'
const RichTextEditor = ({index,defaultValue,onRichTextEditorChange}) => {
  const [value, setValue] = useState(defaultValue);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  console.log(index,'->',defaultValue);
  const GenerateSummaryFromAI=async()=>{
    if (!resumeInfo.experience || resumeInfo.experience.length === 0) {
      toast.error("Experience is empty.");
      return;
    }
    console.log(resumeInfo.experience[index].title);
    if (!resumeInfo.experience[index]) {
      toast.error(`No experience found at index ${index}`);
      return;
    }
  
    if (!resumeInfo.experience[index].title) {
      toast.error("Please Add Position Title");
      return;
    }
  
    const prompt = PROMPT.replace("{positionTitle}", resumeInfo.experience[index].title);
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = result.response.text()
      setValue(resp.replace('[','').replace(']',''));
      console.log(resp);
    } catch (error) {
      console.error("AI Response Error:", error);
      toast.error("Failed to generate summary.");
    }
  }

  return (
    <div className="flex flex-col justify-between my-2">
    <ToastContainer/>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
          <Button variant='outlined' color='purple' onClick={GenerateSummaryFromAI}><LuBrain/>Generate from AI</Button>
      </div>
      <EditorProvider className='w-full'>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e);
          }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
