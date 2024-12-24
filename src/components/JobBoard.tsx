import { useRecoilState } from "recoil";
import { jobState, signin } from "./atoms";
import { useEffect } from "react";
import axios from "axios";
import { JobCard } from "./JobCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

export function JobBoard() {
  const token = localStorage.getItem('token')
  const [jobs, setJobs] = useRecoilState(jobState);
  const [signinState,setSigninState] = useRecoilState(signin);
  console.log(signinState)
  async function fetchJobs() {
    try {
      console.log(token)
      const fetchedData = await axios.get(`${API_URL}job/jobs`, {
        headers: {
          token:token
        }
      });
      console.log(localStorage.getItem('token'))
      setJobs(fetchedData.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      console.log("Here token")
      setSigninState(true);
      fetchJobs();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[url('/bg-3.gif')] bg-fixed bg-contain flex flex-wrap justify-center gap-6">
      {signinState ? null:<div className = "h-screen w-screen flex items-center justify-center">Sign in to see your jobs</div>}
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
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
