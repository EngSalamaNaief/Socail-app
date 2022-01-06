import React from 'react'
import { Link } from 'react-router-dom'

export default function Friend({username,userImg,id}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link to={`/friend/${id}`} className="mt-3">
            <div className="rounded-md w-20 h-24 overflow-hidden ">
                <img className="w-full h-full object-cover" src={userImg?PF+userImg:PF+`/person-icon.png`} alt="gg" />
            </div>
            <div className="capitalize flex justify-center text-sm font-medium mt-1 ">
                {username}
            </div>
        </Link>
    )
}
