interface CircleProps{
    fillColor:string
}
export function Circle(props:CircleProps){
    return<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
    <circle r="7" cx="10" cy="10" fill={props.fillColor} />
  </svg>
}