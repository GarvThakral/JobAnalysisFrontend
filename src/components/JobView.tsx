import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiAnalysis } from "./AiAnalyse";
const API_URL = import.meta.env.VITE_API_URL;

interface JobItem {
    company: string;
    createdAt: string;
    description: string;
    id: string;
    status: "Applied" | "Interviewing" | "Offered";
    title: string;
    updatedAt: string;
    userId: string;
}

const statusStyles = {
    Applied: "bg-indigo-400",
    Interviewing: "bg-yellow-500",
    Offered: "bg-emerald-500",
};

export function JobView() {
    const { id: jobId } = useParams();
    const [details, setDetails] = useState<JobItem | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    async function fetchJob() {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${API_URL}${jobId}`, {
                headers: {
                    token
                },
            });
            setDetails(response.data.job);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    }

    useEffect(() => {
        fetchJob();
    }, [jobId]);

    if (!details) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-400 text-lg">
                Loading job details...
            </div>
        );
    }

    return (
        <div className="h-[1200px] w-full bg-gradient-to-tr from-gray-50 via-blue-100 to-gray-200 p-6 flex justify-center items-start">
        <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-500">
            <div className="p-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white shadow-md rounded-t-3xl">
                <h1 className="text-4xl font-extrabold">{details.company}</h1>
                <p className="text-lg mt-2 italic opacity-90">"{details.title}"</p>
            </div>

            <div className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                    <div className={`w-5 h-5 rounded-full ${statusStyles[details.status]}`}></div>
                    <span className="text-gray-800 text-sm font-semibold tracking-wide uppercase">
                        {details.status}
                    </span>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                        Job Description
                    </h2>
                    <p
                        className={`text-gray-600 text-base leading-relaxed ${
                            !showFullDescription ? "line-clamp-4" : ""
                        }`}
                    >
                        {details.description}
                    </p>
                    <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                        {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                </div>
            </div>

            <div className="p-8 bg-gray-100 border-t border-gray-300 rounded-b-3xl">
                <AiAnalysis description={details.description} />
            </div>
        </div>
    </div>

    );
}
