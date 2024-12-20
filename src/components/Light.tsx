import { useRecoilState } from "recoil";
import { countState } from "./atoms";
import { useEffect } from "react";

export function Light(){
    const [count, setCount] = useRecoilState(countState);
    useEffect(()=>{
        setInterval(()=>{
            setCount(c=>c+1)
        },1000)
    },[])
    return<div>
        Hi there
        {count}
    </div>
}