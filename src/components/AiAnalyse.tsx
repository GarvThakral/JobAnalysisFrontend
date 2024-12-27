import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

interface JobProps {
    description: string;
}

interface DescriptionAnalysis {
    description_analysis: string;
    desired_skills: Array<string>;
    experience_level: string;
    job_title: string;
    required_skills: Array<string>;
}

interface ResumeAnalysis {
    desired_skills: Array<string>;
    detailed_analysis: string;
    missing_keywords: Array<string>;
    required_skills: Array<string>;
}

export function AiAnalysis(props: JobProps) {
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [resumeDetail, setResume] = useState<ResumeAnalysis | null>(null);
    const [analysisDetail, setAnalysis] = useState<DescriptionAnalysis | null>(null);

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
                `${API_URL}ai/analyzeResume`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Correct header for file uploads
                    },
                }
            );
            setResume(response.data);
            setUploadStatus("Success: File uploaded and analyzed.");
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error: Failed to upload file.");
        }
    };

    async function analyseDesc() {
        const token = localStorage.getItem('token')
        try {
            const analysis = await axios.post(`${API_URL}ai/analyzeDescription`, {
                headers: {
                    token
                },
                description: props.description,
            });
            setAnalysis(analysis.data);
        } catch (error) {
            console.error("Error analyzing description:", error);
        }
    }

    return (
        <div className="p-8 overflow-auto w-full flex flex-col items-center ">
            <div className="space-y-4 flex flex-col items-center">
                <button
                    onClick={analyseDesc}
                    className="text-3xl p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#8759d8] to-[#ff91b5] mt-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                    Analyze Description
                </button>

                {analysisDetail && (
                    <div className="text-white flex flex-col items-center space-y-4">
                        <h3 className="text-lg font-bold">Description Analysis</h3>
                        <p className="text-white">{analysisDetail.description_analysis}</p>

                        <div className="flex ">
                            <div>
                                <h4 className="">Required Skills</h4>
                                <ul className="space-y-3">
                                    {analysisDetail.required_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-2xl bg-gradient-to-r from-[#1a73e892] via-[#683ab749] to-[#ff80aa42] w-fit px-4 py-1 text-white ">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {analysisDetail.desired_skills.length === 0 ? null:<div>
                                <h4 className="">Desired Skills</h4>
                                <ul className="space-y-3">
                                    {analysisDetail.desired_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-2xl bg-gradient-to-r from-[#1b3f8b] via-[#5032a6] to-[#e04277] w-fit px-4 py-1 text-white ">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div> }
                            
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-10 flex flex-col items-center">
                <label
                    htmlFor="resume-upload"
                    className="cursor-pointer text-3xl p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#8759d8] to-[#ff91b5] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                    Upload Resume
                    <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </label>

                {uploadStatus && (
                    <p
                        className={`text-sm ${uploadStatus.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
                    >
                        {uploadStatus}
                    </p>
                )}

                {resumeDetail && (
                    <div className="shadow-lg rounded-lg p-6 space-y-4 max-h-fit text-white flex flex-col items-center">
                        <h3 className="text-lg font-bold">Resume Analysis</h3>
                        <p className="">{resumeDetail.detailed_analysis}</p>

                        <div className="flex justify-around w-full">
                            <div>
                                <h4 className="text-sm font-semibold ">Required Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {resumeDetail.required_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-2xl bg-gradient-to-r from-[#0c4da2] via-[#5a34c7] to-[#b05acd] w-fit px-4 py-1 text-white">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold ">Desired Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {resumeDetail.desired_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-2xl w-fit px-4 py-1 text-white bg-gradient-to-r from-[#216bdc] via-[#a155b9] to-[#ff78a1]">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div  className = "self-start">
                                <h4 className="text-sm font-semibold">Missing Keywords</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {resumeDetail.missing_keywords.map((keyword, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-2xl px-4 py-1 text-white bg-gradient-to-r from-[#387af5] via-[#9448db] to-[#ff5c8a] min-w-32 w-fit ">
                                            {keyword}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                       
                    </div>
                )}
            </div>
        </div>
    );
}
