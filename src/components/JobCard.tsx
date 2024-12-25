import axios from "axios";
import { Circle } from "../assets/circleIcon";
import { DeleteIcon } from "../assets/deleteIcon";
import { useRecoilState } from "recoil";
import { jobState } from "./atoms";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

interface JobProps {
  id : string;
  title: string;
  description: string;
  company: string;
  status: "Applied" | "Interviewing" | "Offered";
  link:boolean
}

const statusStyles = {
  "Applied": "blue",
  "Interviewing": "red",
  "Offered": "grey"
}

export function JobCard(props: JobProps) {
  const [jobs, setJobs] = useRecoilState(jobState);
  const token = localStorage.getItem("token");

  function deleteCard(cardId: string) {
    axios
      .delete(`${API_URL}job/${cardId}`, {
        headers: {
          token,
        },
      })
      .then(() => setJobs(jobs.filter((item: JobProps) => item.id !== cardId)))
      .catch((error) => console.error("Error deleting job:", error));
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent Link navigation
    e.preventDefault();  // Prevent default behavior
    deleteCard(props.id);
  };

  return (
    <div className="relative font-['Michroma'] border border-transparent shadow-[0_0_15px_rgba(161,29,238,0.8)] rounded-lg w-96 h-96 bg-black opacity-95 m-4 p-6 flex flex-col items-center justify-between hover:shadow-[0_0_15px_rgba(52,152,219,0.7)] transition-shadow duration-300 hover:scale-105">
      {props.link ? (
        <Link to={`/job/${props.id}`} className="w-full">
          <div className="text-center p-4 px-10 text-3xl m-1 border-b-2 border-pink-300 text-white">
            {props.company}
          </div>
        </Link>
      ) : (
        <div className="text-center p-4 px-10 text-3xl m-1 border-b-2 border-pink-300 text-white">
          {props.company}
        </div>
      )}

      <div className="p-1 m-1 text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]">
        <i>"{props.title}"</i>
      </div>
      <div>
        <b className="text-white">Job description</b>
      </div>
      <div
        className="px-4 py-1 overflow-hidden text-sm text-white"
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

      {/* Delete Button */}
      {props.link && (
        <div
          className="absolute bottom-2 right-2 cursor-pointer p-1 hover:bg-gray-200 rounded-full"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </div>
      )}
    </div>
  );
}
