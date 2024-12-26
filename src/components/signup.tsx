import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from './loader';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
const API_URL = import.meta.env.VITE_API_URL;

export function SignUp() {
  const typeRef = useRef(null);

  const [emailError,setEmailError] = useState(false); 
  const [usernameError,setUsernameError] = useState(false); 
  const [passwordError,setPasswordError] = useState(false); 
  const [usernameTakenError,setusernameTakenError] = useState(false); 
  const [emailTakenError,setemailTakenError] = useState(false); 

  useEffect(()=>{
      if(typeRef.current){
          new Typewriter(typeRef.current, {
          strings: ['Already a user ?'],
          loop:true,
          autoStart: true,
          delay:35,
          pauseFor:10000
          });
      }
  },[])
  const navigate = useNavigate();


  function handleClickListener(e:MouseEvent){
    if (signupRef.current && !signupRef.current.contains(e.target as Node)) {
      navigate('/')
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickListener);
    return ()=>{
      document.removeEventListener("mousedown",handleClickListener)
    }
  },[])

  const signupRef = useRef<HTMLDivElement>(null);
  const [loader,setLoaderState] = useState(false)
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function signUserUp(){
    setemailTakenError(false)
    setusernameTakenError(false)
    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    console.log(API_URL)
    setLoaderState(true)
    try{
      const response = await axios.post(`${API_URL}user/signup`,{
        username,email,password
      })
      setLoaderState(false)
      if(response.status == 200){
        navigate('/')
      }else if(response.status == 203){
        const issues = response.data.error.issues;
        console.log(issues);
        issues.forEach((e: any) => {
          if (e.path.includes("email")) {
            setEmailError(true);
          } 
          else if (e.path.includes("password")) {
            setPasswordError(true);
          } 
          else if (e.path.includes("username")) {
            setUsernameError(true)
          }
        });
      }else if(response.status == 204){
        setemailTakenError(true);
        setusernameTakenError(true);
      }
      else if(response.status == 205){
        setusernameTakenError(true);
      }
      else if(response.status == 206){
        setemailTakenError(true);
      }
    }catch(e){
      console.log(e);
      setLoaderState(false)
    }

  }
  return (
    <div className="h-screen w-screen bg-[url('/lineArt.jpg')] bg-cover font-['Michroma'] flex justify-center pt-32 ">
      {loader ? <Loader/>:null}
        <div className="h-fit bg-transparent sm:px-20 p-10 flex flex-col items-start border rounded-3xl justify-center">
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
            {usernameError ? <span className = "text-red-600">Username needs to be between 3-16 words</span>:null}
            {usernameTakenError ? <span className = "text-red-600">Username is already taken</span>:null}

          </div>
          <div className="flex flex-col justify-center items-start">
            <label
              htmlFor="companyInput"
              className="text-white p-3 text-xl animate-pulse"
            >
              Enter Your Email :
            </label>
            <input
              id="companyInput"
              className="border-2 md:w-[300px] lg:w-[400px] w-[300px] outline-none bg-transparent p-3 text-white rounded-3xl duration-500"
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? <span className = "text-red-600">Invalid email format</span>:null}
            {emailTakenError ? <span className = "text-red-600">Email is already taken</span>:null}

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
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ? <span className = "text-red-600">Password needs to be between 3-16 words</span>:null}

          </div>
          <div className = "flex flex-col items-center self-center">
          <div className="border-2 md:w-[200px] lg:w-[200px] w-[200px] outline-none bg-black bg-opacity-80 p-3 text-white rounded-3xl resize-y duration-500 my-5 flex justify-center cursor-pointer" onClick={() => signUserUp()}>
            <button
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab]"
              type="submit"
            >
              Sign Up
            </button>
          </div>
            <span ref = {typeRef} className='text-white p-5'>

            </span>
            <Link to = "/signin"><span className = {'text-purple-700 cursor-pointer'}>Sign in ?</span></Link>
          </div>
        </div>
    </div>
  );
  }
  