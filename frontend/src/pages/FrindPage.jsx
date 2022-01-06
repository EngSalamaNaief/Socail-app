import React,{useEffect} from 'react'
import LeftSide from '../components/home/LeftSide'
import FriendCom from '../components/FriendCom'
import Topar from '../components/Topar'
import {useHistory,useParams} from "react-router-dom";
import {connect} from 'react-redux';
import {getUser} from "../redux/actions/AuthActions";
import {getFriendPosts} from "../redux/actions/PostActions";
import { useState } from 'react';
import axios from 'axios';
 function FriendPage(props) {

    const history=useHistory();
    const paramss=useParams();
    const [friend,setFriend]=useState(null);
    const [load,setLoad]=useState(true);
    const [friendPosts,setFriendPosts]=useState([]);
    const [followings,setFollowings]=useState([]);
    useEffect(()=>{
       
      // props.getUser(paramss.id);
      // props.getFriendPosts(paramss.id);

      const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if(props.token){
        config.headers["x-auth-token"]=props.token;
      const Friends=async()=>{

        try{
         const res= await axios.get(`/user/${paramss.id}`,config);
          setLoad(false);
         setFriend(res.data.friend)
        }catch(err){
            console.log(err)
            setLoad(true)
        }
      }
      Friends();

    }
    },[paramss.id])

    useEffect(()=>{
       
        // props.getUser(paramss.id);
        // props.getFriendPosts(paramss.id);
  
        const config={
          headers:{
              "Content-Type":"application/json"
          }
      }
      
      if(props.token){
          config.headers["x-auth-token"]=props.token;
        const FriendPosts=async()=>{
          try{
              const res1= await axios.get(`/posts/friendposts/${paramss.id}/all`,config);
              setFriendPosts(res1.data.posts.sort((p1,p2)=>{
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
              }))
             }catch(err){
                 console.log(err)
             }
             try{
                const res2= await axios.get(`/users/all/${paramss.id}`,config);
                setFollowings(res2.data)
               
               }catch(err){
                   console.log(err)
               }
        }
        FriendPosts();
      }
      },[paramss.id])

 
    if(props.user){
        return (
            <div>
                <Topar/>
                <div className="grid md:grid-cols-4 container m-auto">
                    <div className='md:order-first order-last'>
                        <LeftSide/>
                    </div>
                    <div className="col-span-3">
                       <FriendCom friend={friend} followings={followings} friendPosts={friendPosts}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                {history.push('/')}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{

    return{
        user:state.auth.user,
        token:state.auth.token,
       // frinds:state.posts.postedUser
    }
}

export default connect(mapStateToProps,{getUser,getFriendPosts})(FriendPage);
