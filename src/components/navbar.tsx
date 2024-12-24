import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";
import geminiLogo from '../assets/Google_Gemini_logo.svg.png'

export function NavBar() {
  const [signinState,setSigninState] = useRecoilState(signin);
  function signout(){
    localStorage.clear();
    setSigninState(false);
  }
    return (
      <div className="w-full h-[70px] shadow-md flex justify-between items-center px-10  bg-gradient-to-b  from-gray-900 to-black fixed z-50">
        <div>
          <Link to  = "/aboutGemini" className =""><div className ="size-20 h-fit mb-3">
            <img src = {geminiLogo}></img>
          </div>
          </Link>
        </div>
        <div className = "flex ">
          <Link to = "/"><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] text-white m-6 text-xl font-['Roboto'] hover:scale-105  duration-100">
            Home
          </div></Link>
          <Link to = "/jobs"><div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] text-white m-6 text-xl font-['Roboto'] hover:scale-105  duration-100">
            Jobs
          </div></Link>

          <Link to = "/addContent">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#673ab7] to-[#ff80ab] text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100">
            Add Content
          </div>
          </Link>
        </div>
        <div>
          {signinState ? 
          <Link to = "/">
          <div className="text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100" onClick = {()=>signout()}>
            Sign out
          </div>
          </Link>:

          <Link to = "/signin">
          <div className="text-white m-6 text-xl font-['Roboto'] hover:scale-105 duration-100 ">
            Sign in
          </div>
          </Link>
          
          }
        </div>
      </div>
    );
  }
  