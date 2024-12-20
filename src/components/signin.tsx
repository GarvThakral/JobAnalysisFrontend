import { Button } from "./button";
import { Input } from "./input";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "./loader";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";
const API_URL = import.meta.env.VITE_API_URL;


export function SignIn() {
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement>(null);
  const [loader,setLoaderState] = useState(false)
  
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
    <div className="flex justify-center items-center min-h-screen col-span-10 fixed top-0 left-0 w-screen bg-slate-50 bg-opacity-50 backdrop-blur-sm">
      {loader ? <Loader/>:null}
      <div ref = {signinRef } className = {"bg-[#fffefe] w-[95%] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] h-[600px] md:h-[500px] sm:h-[400px] flex flex-col items-center justify-between drop-shadow-lg py-8 px-6 rounded-xl"}>
        <span className = {"text-lg sm:text-xl text-center"}>Sign In Page</span>
        <Input variant = {"secondary"} size = {"lg"} placeholder="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>   
        <Button variant = {"primary"} size = {"lg"} text = {"Sign in"} onClick ={()=>{signUserIn()}}/>     
        <span>Dont have an account ?<Link to = "/signup"><span className = "text-purple-500">Sign up</span></Link>instead</span>
        
      </div>
    </div>
  );
}
  