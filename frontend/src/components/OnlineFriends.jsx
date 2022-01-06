import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {AddConvarsation} from '../redux/actions/Convarsation';
function OnlineFriends({friendId,token,AddConvarsation}) {
    const [friend,setFriend]=useState(null);
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        

         const getFriend=async()=>{
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            if(token){
                config.headers["x-auth-token"]=token;
                try{
                    const res =await axios.get(`/user/${friendId}`,config);
                    setFriend(res.data);
                 }catch(err){
                     console.log(err)
                 }
            }
            
         }
         getFriend();
         
    },[friendId,token])
    return (
        <div onClick={()=>AddConvarsation(friendId)} className='flex items-center px-4 py-3 cursor-pointer'>
         <div className='rounded-full overflow-hidden h-10 w-10'>
                <img src={friend?.friend.userProfilePic?PF+friend?.friend.userProfilePic:PF+`/person-icon.png`} className='w-full h-full object-cover' alt="preson" />
          </div>
          <div className='ml-2 capitalize '> {friend?.friend.username}</div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps,{AddConvarsation})(OnlineFriends)
