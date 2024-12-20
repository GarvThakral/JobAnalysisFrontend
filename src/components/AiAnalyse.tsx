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
        <div className="p-8 space-y-8 bg-gray-50 border-t border-gray-300 max-h-[80vh] overflow-auto">
            <div className="space-y-4">
                <button
                    onClick={analyseDesc}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                    Analyze Description
                </button>

                {analysisDetail && (
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-h-[80vh] overflow-auto">
                        <h3 className="text-lg font-bold text-gray-700">Description Analysis</h3>
                        <p className="text-gray-600">{analysisDetail.description_analysis}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Required Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {analysisDetail.required_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-md bg-green-500 px-2 py-1 text-white">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Desired Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {analysisDetail.desired_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-md bg-teal-500 px-2 py-1 text-white">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <label
                    htmlFor="resume-upload"
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all"
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
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-h-fit">
                        <h3 className="text-lg font-bold text-gray-700">Resume Analysis</h3>
                        <p className="text-gray-600">{resumeDetail.detailed_analysis}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Required Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {resumeDetail.required_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-md bg-green-500 px-2 py-1 text-white">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Desired Skills</h4>
                                <ul className="text-gray-600 space-y-1">
                                    {resumeDetail.desired_skills.map((skill, idx) => (
                                        <li key={idx} className="list-disc list-inside rounded-md bg-teal-500 px-2 py-1 text-white">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-700">Missing Keywords</h4>
                            <ul className="text-gray-600 space-y-1">
                                {resumeDetail.missing_keywords.map((keyword, idx) => (
                                    <li key={idx} className="list-disc list-inside bg-red-600 rounded-lg w-fit px-2 text-white">
                                        {keyword}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
