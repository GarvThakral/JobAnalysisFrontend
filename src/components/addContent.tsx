import { useRecoilState } from 'recoil';
import {  companyNameState,  jobTitleState,  jobDescriptionState,  jobStatusState,} from './atoms';
import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { JobCard } from './JobCard';
const API_URL = import.meta.env.VITE_API_URL;

export function AddContent() {
  const [companyName, setCompanyName] = useRecoilState(companyNameState);
  const [jobTitle, setJobTitle] = useRecoilState(jobTitleState);
  const [jobDescription, setJobDescription] = useRecoilState(jobDescriptionState);
  const placeHolderDesc=  "We are looking for a creative and passionate UI/UX Designer to join our design team. In this role, you will work closely with product managers, developers, ........"
  const options = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Interviewing', label: 'Interviewing' },
    { value: 'Offered', label: 'Offered' },
  ];
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(options[0]);

  async function handleAddJob(){
        
        const token = localStorage.getItem('token')
        console.log(token)
        try{
            const response = await axios.post(`${API_URL}job/create`, 
                {title: jobTitle,
                company: companyName,
                description: jobDescription,
                status: selectedOption},{
                headers: {
                    token: token,
                }}
            );
        console.log(response)

        }catch(e){
            console.log(e)
                
        }
    setCompanyName('');
    setJobTitle('');
    setJobDescription('');
    setSelectedOption(options[0]);
  };


  
  const [toggleShort,setToggleShort] = useState(true);

  return (
    <div className="h-screen w-screen bg-[url('/bg-3.png')] bg-cover font-['Michroma'] flex justify-center">
      <div className = 'h-fit bg-transparent pl-14 pt-32 flex flex-col md:items-start items-center'>
        <div className = "flex flex-col justify-center items-start">
          <label htmlFor = "companyInput" className = "text-white p-3 text-xl animate-pulse">Company Title</label>
          <input id =  "companyInput" className = "border-2 md:w-[400px] lg:w-[500px] w-[500px] outline-none bg-transparent p-3 text-white rounded-3xl duration-500" placeholder='Google' onChange = {(e)=>setCompanyName(e.target.value)}></input>
        </div>
        <div className = "flex flex-col justify-center items-start">
          <label htmlFor = "jobInput" className = "text-white p-3 text-xl animate-pulse">Job Title</label>
          <input id =  "jobInput" className = "border-2 md:w-[400px] lg:w-[500px] w-[500px] outline-none bg-transparent p-3 text-white rounded-3xl duration-500" placeholder='"UI/UX Designer"' onChange = {(e)=>setJobTitle(e.target.value)}></input>
        </div>
        <div className = "flex flex-col justify-center items-start">
          <label htmlFor = "companyInput" className = "text-white p-3 text-xl animate-pulse ">Job Description</label>
          <textarea
            id="companyInput"
            className="border-2 md:w-[400px] lg:w-[500px] w-[500px] outline-none bg-transparent p-3 text-white rounded-3xl resize-y duration-500"
            placeholder={placeHolderDesc}
           onChange = {(e)=>setJobDescription(e.target.value)}></textarea>
        </div>
        <div className = "flex flex-col justify-center items-start">
          <label htmlFor = "companyInput" className = "text-white p-3 text-xl animate-pulse">Job Title</label>
          <Select
            styles={{
              control: (base) => ({
                ...base,
                border: '2px solid white',
                backgroundColor: 'transparent',
                padding: '12px', // Same padding for consistency
                borderRadius: '1.5rem',
                color: 'white',
                width: '100%',
                minHeight: '48px', // Make the height consistent
                '@media (min-width: 1024px)': {
                  width: '500px', // For larger screens
                },
                '@media (min-width: 768px)': {
                  width: '400px', // For medium screens
                },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                padding: '12px',
                cursor: 'pointer',
              }),
              singleValue: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
            options={options}
          />


        </div>
        <div className='border-2 md:w-[300px] lg:w-[400px] w-[200px] outline-none bg-black bg-opacity-80 p-3 text-white rounded-3xl resize-y duration-500 my-5 flex justify-center'>
          <button className='bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]' type = "submit">Create Job</button>
        </div>

      </div>
      {toggleShort ? <div className='flex justify-center items-center w-full'>
        <JobCard title = {jobTitle || "UI/UX Designer"} company={companyName || "Google"} description={jobDescription || placeHolderDesc} status={selectedOption?.value as "Applied" | "Interviewing" | "Offered" || "Applied"} id={"123"}></JobCard>
      </div>:null}
      
    </div>
  );
}


