import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { format} from 'timeago.js';

function Message({message,user,token}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    const [oner,setOner]=useState(null);
    const [friend,setFriend]=useState(null);
    useEffect(()=>{
         if(message.sender ===user._id){
             setOner(true);
         }else{
             setOner(false);
         }
    },[user._id,message]);

    useEffect(()=>{

        const getFriend=async(sender)=>{
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            if(token){
                config.headers["x-auth-token"]=token;
                try{
                    const res =await axios.get(`/user/${sender}`,config);
                    setFriend(res.data);
                 }catch(err){
                     console.log(err)
                 }
            }
            
         }

         if(message.sender !==user._id){
             getFriend(message.sender);
         }
    },[user._id,message])

    console.log(oner)
    return (
        <>
        <div className={`my-4 flex ${oner?" justify-start":" justify-end"}`}>
            <div>
            <div className={`flex items-center`}>
                <div className='rounded-full overflow-hidden h-8 w-8'>
                    <img src={oner?user?.userProfilePic?PF+user?.userProfilePic:PF+`/person-icon.png`:friend?.friend.userProfilePic?PF+friend?.friend.userProfilePic:PF+`/person-icon.png`} className='w-full h-full object-cover' alt="" />
                </div>
                <div className={`${oner?"bg-blue-600 text-white":"bg-gray-100 text-black"} text-base  py-1 px-3 rounded-lg ml-2`}> {message.text}</div>
            </div>
            <div className={`text-sm mt-1 flex text-gray-400 ${oner?" justify-start":" justify-end"}`}>{format(message.createdAt)}</div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.auth.user,
        token:state.auth.token,
    }
}

export default connect(mapStateToProps)(Message)
