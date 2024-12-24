import { useEffect, useRef } from "react";
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
export function DashBoard(){
    const typeRef = useRef(null);

    useEffect(()=>{
        if(typeRef.current){
            new Typewriter(typeRef.current, {
            strings: ['Streamline your job applications with ease.', 'Enhance your resume for maximum impact.','Prepare confidently for interviews.','Gain deep insights into job descriptions.','And much more tailored to your career growth.'],
            autoStart: true,
            delay:35,
            });
        }
    },[])

    return <div className = {`h-screen m-0 p-0 bg-[url('/new.jpg')] bg-cover bg-center flex justify-center `}>
        <div className = "max-w-[80%] flex items-center justify-center">
            <div className={'text-white border h-[400px] min-w-[600px] flex flex-col justify-around p-8 rounded-lg shadow-[0_0_15px_rgba(52,152,219,0.7)]'}>
                <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
                    Gemini Powered Job Dashboard
                </span>
                <p ref={typeRef} className={'text-2xl'}>
                    
                </p>
            </div>

            <div className = {'size-[1000px] justify-center items-center h-fit hover:scale-105 duration-500 hidden md:flex'}>
                <img src = {'/face.png'}></img>
            </div>
        </div>
    </div>
}