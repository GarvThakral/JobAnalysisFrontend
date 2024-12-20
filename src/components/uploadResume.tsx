import axios from "axios";
import { useState } from "react";

interface resumeProps{
    description:string
}
export function UploadResume(props:resumeProps) {
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }
  
    if (file.size > 100 * 1024) {
      setUploadStatus("Error: File size must be under 100KB.");
      return;
    }
  
    if (file.type !== "application/pdf") {
      setUploadStatus("Error: Only PDF files are allowed.");
      return;
    }
  
    setUploadStatus("Uploading...");
  
    const formData = new FormData();
    formData.append("resumeFile", file); // Add the file
    formData.append("jobDescription", props.description); // Add the job description
  
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/analyzeResume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct header for file uploads
          },
        }
      );
  
      setUploadStatus("Success: File uploaded and analyzed.");
      console.log("Analysis result:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error: Failed to upload file.");
    }
  };
  


  return (
    <div className={`w-96 h-fit flex flex-col items-center`}>
      <label
        htmlFor="resume-upload"
        className={`bg-slate-700 rounded-3xl py-2 px-4 text-white cursor-pointer text-center`}
      >
        Analyze Resume
        <input
          type="file"
          id="resume-upload"
          accept=".pdf"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      {uploadStatus && (
        <div
          className={`mt-2 text-sm ${
            uploadStatus.startsWith("Error")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {uploadStatus}
        </div>
      )}
    </div>
  );
}
