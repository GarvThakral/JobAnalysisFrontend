import { useRecoilState } from "recoil";
import {
  jobTitleState,
  jobDescriptionState,
  signin,
} from "./atoms";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { Loader } from "./loader";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function AddContent() {
  const [toggleShort, setToggleShort] = useState(true);
  const [signinState] = useRecoilState(signin);
  const [companyNameError,setCompanyNameError] = useState(false);
  const [jobNameError,setJobNameError] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!signinState) {
      navigate('/');
    }
  
    const mediaQuery = window.matchMedia("(min-width: 870px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setToggleShort(e.matches);
    };
    setToggleShort(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [signinState]); // Add signinState as a dependency
  

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useRecoilState(jobTitleState);
  const [jobDescription, setJobDescription] = useRecoilState(
    jobDescriptionState
  );

  const placeHolderDesc =
    "We are looking for a creative and passionate UI/UX Designer to join our design team. In this role, you will work closely with product managers, developers, ........";

  const [selectedOption, setSelectedOption] = useState({
    value: "Applied",
    label: "Applied",
  });
  const [loader,setLoader] = useState(false);
  async function handleAddJob() {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!jobNameError && !companyNameError){

      try {
        setLoader(true);
        const response = await axios.post(
        `${API_URL}job/create`,
        {
          title: jobTitle,
          company: companyName,
          description: jobDescription,
          status: selectedOption.value, 
        },
        {
          headers: {
            token: token,
          },
        }
      );
      setLoader(false);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    setCompanyName("");
    setJobTitle("");
    setJobDescription("");
    setSelectedOption({ value: "Applied", label: "Applied" }); 
  }else{
    setLoader(true)
    setTimeout(()=>setLoader(false),2000);
    return
  }
  }
  
  return (
    
    <div className="h-screen w-screen bg-[url('/bg-grad-2.jpg')] bg-cover flex justify-center overflow-hidden">
      {loader ? <Loader/>:null}
      <div className="h-fit bg-transparent p-14 pt-32 flex flex-col md:items-start items-center">
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="companyInput"
            className="text-white py-4 text-2xl animate-pulse"
          >
            Company Title
          </label>
          <input
            id="companyInput"
            className="border-2 md:w-[400px] lg:w-[500px] w-[350px] outline-none bg-transparent p-4 text-white rounded-md duration-500"
            placeholder="Google"
            onChange={(e) => {
              if (e.target.value.length > 11) {
                setCompanyNameError(true);
              } else {
                setCompanyNameError(false);
              }
              setCompanyName(e.target.value);
            }}
            maxLength={12}
          />
          {companyNameError ? (
            <span className="text-red-600">Company name cannot be bigger than 11 characters</span>
          ) : null}

        </div>
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="jobInput"
            className="text-white py-4 text-2xl animate-pulse"
          >
            Job Title
          </label>
          <input
            id="jobInput"
            className="border-2 md:w-[400px] lg:w-[500px] w-[350px] outline-none bg-transparent p-4 text-white rounded-md duration-500"
            placeholder='"UI/UX Designer"'
            onChange={(e) => {
              if (e.target.value.length > 19) {
                setJobNameError(true);
              } else {
                setJobNameError(false);
              }
              setJobTitle(e.target.value);
            }}
            maxLength={20}
          />
          {jobNameError ? (
            <span className="text-red-600">Job title cannot be bigger than 20 characters</span>
          ) : null}
        </div>
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="jobDescInput"
            className="text-white py-4 text-2xl animate-pulse"
          >
            Job Description
          </label>
          <textarea
            id="jobDescInput"
            className="border-2 md:w-[400px] lg:w-[500px] w-[350px] outline-none bg-transparent p-4 text-white rounded-md resize-y duration-500"
            placeholder={placeHolderDesc}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="jobStatusSelect"
            className="text-white py-4 text-2xl animate-pulse"
          >
            Job Status
          </label>
          <Select
            id="jobStatusSelect"
            styles={{
              control: (base) => ({
                ...base,
                border: "2px solid white",
                backgroundColor: "transparent",
                padding: "12px",
                borderRadius: ".5rem",
                color: "white",
                width: "100%",
                minHeight: "48px",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                color: "white",
                padding: "12px",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
            }}
            value={selectedOption}
            onChange={(val) => setSelectedOption(val || selectedOption)} // Handle null values
            options={[
              { value: "Applied", label: "Applied" },
              { value: "Interviewing", label: "Interviewing" },
              { value: "Offered", label: "Offered" },
            ]}
          />
        </div>
        <div className="border-2 md:w-[300px] lg:w-[400px] w-[200px] outline-none bg-black bg-opacity-80 p-4 text-white rounded-md resize-y duration-500 my-5 flex justify-center cursor-pointer">
          <button
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]"
            type="submit"
            onClick={() => handleAddJob()}
          >
            Create Job
          </button>
        </div>
      </div>
      {toggleShort ? (
        <div className="flex justify-center items-center w-[50%]">
          <JobCard
            title={jobTitle || "UI/UX Designer"}
            company={companyName || "Google"}
            description={jobDescription || placeHolderDesc}
            status={(selectedOption?.value as "Applied" | "Interviewing" | "Offered") || "Applied"}
            id={"123"}
            link = {false}
          ></JobCard>
        </div>
      ) : null}
    </div>
  );
}
