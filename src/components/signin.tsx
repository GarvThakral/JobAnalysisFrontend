import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {  Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
import { Loader } from './loader';
const API_URL = import.meta.env.VITE_API_URL;


export function SignIn() {
  const typeRef = useRef(null);
  
  const [usernameError,setUsernameError] = useState(false); 
  const [userError,setUserError] = useState(false); 
  const [passwordError,setPasswordError] = useState(false); 

  useEffect(()=>{
      if(typeRef.current){
          new Typewriter(typeRef.current, {
          strings: ['Dont have an account ?'],
          loop:true,
          autoStart: true,
          delay:35,
          pauseFor:3500
          });
      }
  },[])
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement>(null);
  
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
  const [loader,setLoader] = useState(false);
  async function signUserIn(){
    setUsernameError(false);
    setPasswordError(false);

    setLoader(true);
    try{
      const response = await axios.post(`${API_URL}user/signin`,{
        username,password
      })
      setLoader(false);
      console.log(response)
      if(response.status == 200){
        setSigninState(true);
        console.log(signinState)
        navigate('/')
        localStorage.setItem('token',response.data.token)
      }else if(response.status == 203){
        const issues = response.data.issues;
        issues.forEach((e: any) => {
          if (e.path.includes("username")) {
            setUsernameError(true);
          } 
          else if (e.path.includes("password")) {
            setPasswordError(true);
          } 
        });
      }else if(response.status == 204){
        setUserError(true);
      }
    }catch(e){
      console.log(e);
    }
  }
  

  return (
    <div className="h-screen w-screen bg-[url('/lineArt.jpg')] bg-cover font-['Michroma'] flex justify-center pt-32 ">
        {loader ? <Loader/>:null}
        <div className="h-fit bg-transparent sm:p-15 p-10 flex flex-col items-start border rounded-3xl justify-center">
          <div className="flex flex-col justify-center items-start ">
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
            {usernameError ? <span className = "text-red-600">Username needs to be between 3-16 words</span>:null}
            {userError ? <span className = "text-red-600">User does not exist</span>:null}
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
            {passwordError ? <span className = "text-red-600">Password needs to be between 3-16 words</span>:null}
          </div>
          <div className = {'flex flex-col items-center self-center'}>
            <div className="border-2 md:w-[200px] lg:w-[200px] w-[200px] outline-none bg-black bg-opacity-80 p-3 text-white rounded-3xl resize-y duration-500 my-5 flex justify-center cursor-pointer" onClick={() => signUserIn()}>
              <button
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <span ref = {typeRef} className = {"text-white p-5"}>

            </span>
            <Link to = "/signup"><span className = {'text-purple-700 cursor-pointer p-5'}>Sign Up?</span></Link>
          </div>
        </div>
    </div>
  );
}
  