import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signin } from "./atoms";

export function NavBar() {
  const [signinState,setSigninState] = useRecoilState(signin);
  function signout(){
    localStorage.clear();
    setSigninState(false);
  }
    return (
      <div className="w-full h-[70px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md flex justify-between items-center px-10">
        <div className = "flex items-center">
          <Link to = "/"><div className="px-6 py-2 bg-white text-black rounded-3xl hover:bg-gray-100 transition duration-300 mx-2">
            Home
          </div></Link>
          <Link to = "/addContent">
          <div className="px-6 py-2 bg-white text-black rounded-3xl hover:bg-gray-100 transition duration-300 mx-2">
            Add Content
        </div>
        </Link>
        </div>
        {signinState ? 
        <Link to = "/">
        <div className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300" onClick = {()=>signout()}>
          Sign out
        </div>
        </Link>:
        <Link to = "/signin">
        <div className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300">
          Sign in
        </div>
        </Link>
        }
      </div>
    );
  }
  