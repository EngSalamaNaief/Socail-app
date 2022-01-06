import React,{useState} from 'react'
import { Link } from 'react-router-dom';

export default function User({img,name,id}) {
    let [isOnline,setIsOnline] = useState(true);
    const PF =process.env.REACT_APP_PUBLIC_FOLDER
    return (
        
        <Link to={`./friend/${id}`} className="flex items-center my-2 relative cursor-pointer">
            <div className="rounded-full h-9 w-9 overflow-hidden">
                <img className=" object-cover w-full h-full" src={img?PF+img:PF+`/person-icon.png`} alt="small girl" />   
            </div>
            <span className={`ml-4 text-sm ${isOnline?`font-semibold`:`font-normal`}`}>{name}</span>
            <div className={`absolute top-0.5 left-6 rounded-full bg-green-400 w-2.5 h-2.5 ${isOnline?`block`:`hidden`}`}></div>
            
        </Link>
    )
}
