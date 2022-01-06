import React from 'react'
import { BsFillBookmarkFill,BsFillChatLeftTextFill,BsFillPeopleFill,BsBriefcase,BsCalendar2Event,
    BsQuestionCircle,BsRss,BsFillSkipEndCircleFill} from "react-icons/bs";
import {FaGraduationCap} from "react-icons/fa";
import User from './User';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
export default function LeftSide() {

    const [users,setUsers]=useState([]);

    useEffect(()=>{
        const getUsers=async()=>{
            try{
               const res= await axios.get("/usersall/all");
               setUsers(res.data);
            }catch(err){
              console.log(err)
            }
        }
        getUsers();
    },[])
    return (
        <div className="pl-4 md:pl-0 overflow-x-hidden  h-full hover:overflow-scroll">
        <div className="py-4 ">
            <ul className="  ">
                <li>
                    <a href="#" className="flex font-semibold items-center py-2 ">
                         <BsRss className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Feed</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsFillChatLeftTextFill className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Chats</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsFillSkipEndCircleFill className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Videos</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsFillPeopleFill className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Groups</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsFillBookmarkFill className="text-xl font-extrabold "/>
                         <span className="ml-3">Bookmarks</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsQuestionCircle className="text-xl font-extrabold "/>
                         <span className="ml-3">Qestions</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsBriefcase className="text-xl font-extrabold "/>
                         <span className="ml-3">Jobs</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center py-2">
                         <BsCalendar2Event className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Events</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex font-semibold items-center pt-2">
                         <FaGraduationCap className="text-xl font-extrabold "/>
                         <span className="ml-3 ">Coures</span>
                    </a>
                </li>
                <li className="mx-6 my-5">
                    <button className='py-2 rounded px-4 bg-gray-200'>Show More</button>
                </li>
            </ul>
            <div className="flex justify-center w-full">
                <span className="border-gray-400 border-b w-80"></span>
            </div>
        </div>
        <div className="pl-4">
            <div className='flex ml-8 font-medium text-base my-4'>All users</div>
            {users.length?users.map(user=>(
               <User img={user.userProfilePic} name={user.username} id={user._id}/>
            )):""}
        </div>
       
    </div>
    )
}
