import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "../assets/hamburgerIcon";

export function NavBar() {
  const [signinState,setSigninState] = useRecoilState(signin);
  function signout(){
    localStorage.clear();
    setSigninState(false);
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setToggleShort(false); // Close the hidden nav when screen size is >= sm
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [toggleShort,setToggleShort] = useState(false);
    return (
      
      
      
      <div className="w-full h-[70px] shadow-md flex justify-between items-center px-10  bg-gradient-to-b  from-gray-900 to-black fixed z-50">
        {/* Hidden Nav */}
        {toggleShort ? <div className = {'top-0 right-0 w-[100%] h-[100%] fixed bg-opacity-90 bg-black flex flex-col items-center justify-center'}>
            <div className="text-white hover:scale-150 duration-100 sm:hidden top-0 right-0 fixed m-6 mr-9" onClick = {()=>setToggleShort(c=>!c)}>
              <HamburgerIcon/>  
            </div>
            <Link to  = "/aboutGemini" className ="" onClick = {()=>setToggleShort(false)}><div className ="size-20 h-fit mb-3">
              <img src = {'/geminiLogo.png'}></img>
            </div>
            </Link>
            <Link to = "/" onClick = {()=>setToggleShort(false)}><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105  duration-100">
              Home
            </div></Link>
            <Link to = "/jobs" onClick = {()=>setToggleShort(false)}><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105  duration-100">
              Jobs
            </div></Link>

            <Link to = "/addContent" onClick = {()=>setToggleShort(false)}>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105 duration-100">
              Add Content
            </div>
            </Link>
            {signinState ? 
              <Link to = "/" onClick = {()=>setToggleShort(false)}>
              <div className="text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100" onClick = {()=>signout()}>
                Sign out
              </div>
              </Link>:

              <Link to = "/signin" onClick = {()=>setToggleShort(false)}>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105 duration-100">
                Sign in
              </div>
              </Link>
            
            }
        </div>:null}



        <div>
          <Link to  = "/aboutGemini" className =""><div className ="size-20 h-fit mb-3">
            <img src = {'/geminiLogo.png'}></img>
          </div>
          </Link>
        </div>
        <div className = "flex ">
          <Link to = "/"><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105  duration-100 hidden sm:block">
            Home
          </div></Link>
          <Link to = "/jobs"><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105  duration-100 hidden sm:block">
            Jobs
          </div></Link>

          <Link to = "/addContent">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] m-6 text-xl font-['Roboto'] hover:scale-105 duration-100 hidden sm:block">
            Add Content
          </div>
          </Link>
        </div>
        <div className="flex items-center">
          {signinState ? 
          <Link to = "/">
          <div className="text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100 hidden sm:block" onClick = {()=>signout()}>
            Sign out
          </div>
          </Link>:

          <Link to = "/signin">
          <div className="text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100 hidden sm:block">
            Sign in
          </div>
          </Link>
          
          }
          {toggleShort ? null:<div className="text-white hover:scale-150 duration-100 sm:hidden " onClick = {()=>setToggleShort(c=>!c)}>
            <HamburgerIcon/>  
          </div> }
          
        </div>
      </div>
    );
  }
  