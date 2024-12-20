interface ButtonProps{
    variant: "primary" | "secondary";
    size: "sm"|"md"|"lg";
    text:String;
    startIcon?:any;
    endIcon?:any;
    onClick:()=>void;
    
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}
const sizeStyles = {
    "sm":"md:py-1 md:px-2 md:w-28 sm:w-20 p-2",
    "md":"md:py-2 md:px-2 md:w-32 sm:w-24 p-2",
    "lg":"md:py-3 md:px-2 md:w-36 sm:w-36 p-2"
}


export function Button(props:ButtonProps){
    return<button onClick = {props.onClick} className = {`flex justify-center items-center ${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-xl mx-2`}>
        {props.startIcon}{props.text}{props.endIcon}
 
    </button>

}
