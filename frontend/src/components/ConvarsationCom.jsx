import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { connect } from 'react-redux';

function ConvarsationCom({conv,user,token}) {
    const [friend,setFriend]=useState(null);
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        
        const id=  conv.members.filter(c=>c !==user._id)[0];
         const getFriend=async()=>{
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            if(token){
                config.headers["x-auth-token"]=token;
                try{
                    const res =await axios.get(`/user/${id}`,config);
                    setFriend(res.data);
                 }catch(err){
                     console.log(err)
                 }
            }
            
         }
         getFriend();
         
    },[user._id,conv])
    console.log(friend)
    return (
        <div  className='flex items-center px-4 py-2 cursor-pointer'>
            <div className='rounded-full overflow-hidden h-10 w-10'>
              <img src={friend?.friend?PF+friend?.friend.userProfilePic:PF+`/person-icon.png`} className='h-full w-full object-cover' alt="preson" />
            </div>
            <div className='ml-2 capitalize'> {friend?.friend.username}</div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.auth.user,
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(ConvarsationCom)
