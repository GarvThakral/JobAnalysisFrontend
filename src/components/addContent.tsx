import { useRecoilState } from 'recoil';
import {  companyNameState,  jobTitleState,  jobDescriptionState,  jobStatusState,} from './atoms';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export function AddContent() {
  const [companyName, setCompanyName] = useRecoilState(companyNameState);
  const [jobTitle, setJobTitle] = useRecoilState(jobTitleState);
  const [jobDescription, setJobDescription] = useRecoilState(jobDescriptionState);
  const [jobStatus, setJobStatus] = useRecoilState(jobStatusState);

    async function handleAddJob(){
        
        const token = localStorage.getItem('token')
        console.log(token)
        try{
            const response = await axios.post(`${API_URL}job/create`, 
                {title: jobTitle,
                company: companyName,
                description: jobDescription,
                status: jobStatus},{
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
    setJobStatus('Applied');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Add Job Application</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
          <select
            value={jobStatus}
            onChange={(e) => setJobStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
          </select>
        </div>
        <button
          onClick={handleAddJob}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Job
        </button>
      </div>
    </div>
  );
}


