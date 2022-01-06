import React from 'react'
import Friend from './Friend'
import Post from './home/Post'
import {connect} from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
function FriendCom({friend,friendPosts,followings,user,token}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    const history=useHistory();
    const [myFriend,setMyFriend]=useState(false);
    useEffect(()=>{
        if(user?.followings.includes(friend?._id)){
           setMyFriend(true)
           console.log(user,myFriend)
        }
    },[user,friend])

    const Follow=async()=>{
        
      const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify()
    
    if(token){

        config.headers["x-auth-token"]=token;
        if(!myFriend){

            try{
            await axios.put(`/${friend._id}/follower`,body,config);
            window.location.reload();
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                await axios.put(`/${friend._id}/unfollow`,body,config);
                window.location.reload();
            }catch(err){
                console.log(err)
            }
        }
    }    
   
    }
    return (
        <div className="h-full border-2 pl-4">
            <div className="relative">
                <div className="overflow-hidden w-full rounded h-56">
                    <img className="w-full rounded object-cover h-full" src={friend?.userBackGroundPic?PF + friend?.userBackGroundPic:PF+`/frindes.jpg`} alt="ff" />
                </div>
                <div className="w-full absolute top-32 flex justify-center items-center">
                    <div className="">
                        <div className="rounded-full w-40 h-40 border-2 border-white overflow-hidden">
                            <img className="h-full w-full object-cover" src={friend?.userProfilePic?PF+friend?.userProfilePic:PF+`/person-icon.png`} alt="small girl" />
                        </div>
                        <div className="mt-3">
                            <div className="capitalize flex justify-center text-2xl font-semibold">
                                <span className='capitalize'>{friend?.username}</span>
                            </div>
                            <div className="capitalize flex justify-center text-gray-500 pt-1">
                                <span>Hello my friend</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 mt-40">
                <div className="col-span-2">
                    
                    {
                        friendPosts?.map(post=>(
                            <Post key={post._id} post={post} user={friend}/>
                        ))
                    }
                </div>
                <div className="px-5">
                    <div>
                        <ul>
                        <button onClick={()=>Follow()}  className='py-2 px-4 text-white bg-blue-800 rounded-lg mb-2'>{myFriend?"Unfollow":"follow"}</button>   
                            <div className="text-lg font-semibold mb-2">user information</div>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >City :</span> <span className="capitalize ml-1 text-base">{friend?.city}</span>
                            </li>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >from :</span> <span className="capitalize ml-1 text-base">{friend?.from}</span>
                            </li>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >relationship :</span> <span className="capitalize ml-1 text-base">{friend?.relationship}</span>
                            </li>
                        </ul>
                        <div className=" pt-4">
                            <span className="text-lg font-semibold">User Friends</span>
                              <div className="flex flex-wrap justify-between">
                               {
                               followings.frinds?.map(frind=>(
                                <>
                                     {

                                     <Friend key={frind._id} username={frind.username} id={frind._id} userImg={frind.userProfilePic}/>
                                     }
                                   </>
                               ))
                               }
                              </div>
                        </div>
                    </div>
                </div>
            </div>
       
        </div>
    )

}

const mapStateToProps=(state)=>{
    return{
        user:state.auth.user,
        token:state.auth.token,
    }
}

export default connect(mapStateToProps)(FriendCom);