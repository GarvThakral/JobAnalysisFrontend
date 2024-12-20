import axios from "axios";
import { Circle } from "../assets/circleIcon";
import { DeleteIcon } from "../assets/deleteIcon";
import { useRecoilState } from "recoil";
import { jobState } from "./atoms";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

interface JobProps {
  id: string;
  title: string;
  description: string;
  company: string;
  status: "Applied" | "Interviewing" | "Offered";
}

const statusStyles = {
  "Applied": "blue",
  "Interviewing": "red",
  "Offered": "grey"
}

export function JobCard(props: JobProps) {
  const [jobs, setJobs] = useRecoilState(jobState);
  const token = localStorage.getItem('token')
  function deleteCard(cardId: string) {
    axios.delete(`${API_URL}job/${cardId}`, {
      headers: {
        token
      }
    })
    .then(() => setJobs(jobs.filter((item: JobProps) => item.id !== cardId)))
    .catch(error => console.error("Error deleting job:", error));
  }

  return (
    <div className="relative rounded-lg shadow-lg w-96 h-80 bg-white m-4 p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 hover:scale-105">
      <Link to={`/job/${props.id}`} className="w-full">
        <div className="text-center p-2 px-10 text-3xl m-1 border-b-2 border-gray-300">{props.company}</div>
      </Link>
      <div className="p-1 m-1 text-lg"><i>"{props.title}"</i></div>
      <div><b>Job description</b></div>
      <div
        className="px-4 py-1 overflow-hidden text-sm text-gray-600"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {props.description}
      </div>
      <div className="flex items-center mt-2 rounded-md bg-gray-100 px-3 py-1">
        <Circle fillColor={statusStyles[props.status]} /> {props.status}
      </div>
      <div
        className="absolute bottom-2 right-2 cursor-pointer p-1 hover:bg-gray-200 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          deleteCard(props.id);
        }}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}
