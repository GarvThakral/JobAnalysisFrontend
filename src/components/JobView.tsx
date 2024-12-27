import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiAnalysis } from "./AiAnalyse";
import { Loader } from "./loader";
import { Circle } from "../assets/circleIcon";
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


export function JobView() {
    const { id: jobId } = useParams();
    const [details, setDetails] = useState<JobItem | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [loader,setLoader] = useState(false);
    const maxLength = 250
    async function fetchJob() {
        const token = localStorage.getItem('token')
        try {
            setLoader(true);
            const response = await axios.get(`${API_URL}job/${jobId}`, {
                headers: {
                    token
                },
            });
            setLoader(false);
            setDetails(response.data.job);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    }

    useEffect(() => {
        fetchJob();
    }, [jobId]);
    const statusStyles = {
        "Applied": "blue",
        "Interviewing": "red",
        "Offered": "grey"
      }

    return (
        <div className="h-[100vh] overflow-auto bg-[url('/bg-grad-2.jpg')] bg-cover">
            {loader ? <Loader/>:null}
            <div className = {'mt-32 flex flex-col items-center w-[80%] mx-auto'}>
                <div className = "w-[60%] flex flex-col items-center">
                    <span className = {'text-white text-4xl p-2'}>{details?.company}</span>
                    <span className = {' font-["Michroma"] p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] text-xl'}>"{details?.title}"</span>
                    <div className="flex items-center mt-2 rounded-md bg-white bg-opacity-5 px-3 py-1 text-white">
                            <Circle fillColor={statusStyles[details?.status || "Applied"]} /> {details?.status}
                        </div>
                    {showFullDescription ? <span className = {'text-white p-2 text-transparent bg-clip-text bg-gradient-to-r'}>{details?.description}<span className = {'text-purple-600 self-start cursor-pointer'} onClick = {()=>{setShowFullDescription(c=>!c)}}> Read More</span></span>:<span className = {'text-white p-2 text-transparent bg-clip-text bg-gradient-to-r'}>{details?.description.slice(0,maxLength)}<span className = {'text-purple-600 self-start cursor-pointer'} onClick = {()=>{setShowFullDescription(c=>!c)}}> Read More</span></span>}
                </div>
                <AiAnalysis description={details?.description || " "}/>
            </div>
    </div>

    );
}
