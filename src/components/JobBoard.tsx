import { useRecoilState } from "recoil";
import { jobState, signin } from "./atoms";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { JobCard } from "./JobCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const API_URL = import.meta.env.VITE_API_URL;
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
import { Loader } from "./loader";

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

export function JobBoard() {
  const [loaderState,setLoaderState] = useState(false);
  const token = localStorage.getItem('token')
  const [jobs, setJobs] = useRecoilState(jobState);
  const [signinState,setSigninState] = useRecoilState(signin);
  const typeRef = useRef(null);
  console.log(signinState)
  async function fetchJobs() {
    try {
      console.log(token)
      setLoaderState(true);
      const fetchedData = await axios.get(`${API_URL}job/jobs`, {
        headers: {
          token:token
        }
      });
      setLoaderState(false);
      console.log(localStorage.getItem('token'))
      setJobs(fetchedData.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      setSigninState(true);
      fetchJobs();
    }else{
      setSigninState(false);
    }
    if(typeRef.current){
      new Typewriter(typeRef.current, {
      strings: [
        'Unlock powerful tools for job tracking.',
        'Stay organized with your career progress.',
        'Access tailored insights for success.',
        'Simplify your job application process.',
        'Join now to start your journey!'
      ],
      autoStart: true,
      delay:35,
      });
  }
  }, []);


  return (
    <div className="w-full min-h-screen bg-[url('/bg-grad-2.jpg')] bg-fixed bg-cover flex flex-wrap justify-center gap-6">
      {loaderState ? <Loader />:null}
      {signinState ? null:<div className = "max-w-[80%] flex items-center justify-center">
            <div className={'text-white h-[400px] max-w-[80%] sm:min-w-[600px] flex flex-col justify-around p-8 rounded-lg '}>
                <span className="text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold p-2">
                    Login to manage your jobs
                </span>
                <p ref={typeRef} className={'text-lg sm:text-2xl'}>
                    
                </p>
            </div>
        </div>}
        {jobs.length == 0 && signinState ? <div className = "flex self-center justify-center items-center ">
          <div className={'text-white h-[400px] max-w-[80%] sm:min-w-[600px] flex flex-col justify-around items-center p-8 rounded-lg '}>
                <span className="text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold p-2 ">
                    No Jobs added yet
                </span>
                <Link to = "/addContent">
                <span className="text-2xl text-white sm:text-4xl font-semibold p-3 bg-slate-700 w-fit rounded-2xl bg-opacity-45 border shadow-[0_0_15px_rgba(52,152,219,0.7)]">
                    Add a job
                </span>
                </Link>
                <p ref={typeRef} className={'text-lg sm:text-2xl'}>
                    
                </p>
            </div>
          </div>:null}
      {jobs.map((item: JobItem) => (
        <motion.div
          key={item.id}
          className="mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/job/${item.id}`} className="no-underline">
            <JobCard
              title={item.title}
              description={item.description}
              status={item.status}
              company={item.company}
              id={item.id}
              link = {true}

            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
