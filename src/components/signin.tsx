import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";
const API_URL = import.meta.env.VITE_API_URL;


export function SignIn() {
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement>(null);
  const [loader,setLoaderState] = useState(false)
  console.log(loader)
  
  const [signinState,setSigninState] = useRecoilState(signin);

  function handleClickListener(e:MouseEvent){
    if (signinRef.current && !signinRef.current.contains(e.target as Node)) {
      navigate('/')
    }
  }
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickListener);
    return ()=>{
      document.removeEventListener("mousedown",handleClickListener)
    }
  },[])
  
  async function signUserIn(){
    console.log(API_URL)
    setLoaderState(true)
    const response = await axios.post(`${API_URL}user/signin`,{
      username,password
    })
    setLoaderState(false)
    console.log(response)
    if(response.status == 200){
      setSigninState(true);
      console.log(signinState)
      navigate('/')
      localStorage.setItem('token',response.data.token)
    }
  }
  

  return (
    <div className="h-screen w-screen bg-[url('/lineArt.jpg')] bg-cover font-['Michroma'] flex justify-center pt-32 ">

        <div className="h-fit bg-transparent sm:p-20 p-10 flex flex-col items-center border rounded-3xl justify-center">
          <div className="flex flex-col justify-center items-start">
            <label
              htmlFor="companyInput"
              className="text-white p-3 text-xl animate-pulse"
            >
              Enter Your Username :
            </label>
            <input
              id="companyInput"
              className="border-2 md:w-[300px] lg:w-[400px] w-[300px] outline-none bg-transparent p-3 text-white rounded-3xl duration-500"
              placeholder="John Doe"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <label
              htmlFor="jobInput"
              className="text-white p-3 text-xl animate-pulse"
            >
              Enter Your Password : 
            </label>
            <input
              id="jobInput"
              className="border-2 md:w-[300px] lg:w-[400px] w-[300px] outline-none bg-transparent p-3 text-white rounded-3xl duration-500"
              placeholder='"xyz@gmail.com"'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="border-2 md:w-[300px] lg:w-[400px] w-[200px] outline-none bg-black bg-opacity-80 p-3 text-white rounded-3xl resize-y duration-500 my-5 flex justify-center cursor-pointer">
            <button
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]"
              type="submit"
              onClick={() => signUserIn()}
            >
              Create Job
            </button>
          </div>
        </div>
    </div>
  );
}
  