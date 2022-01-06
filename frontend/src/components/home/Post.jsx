import React,{useState,useEffect} from 'react'
import {BiDotsVerticalRounded} from "react-icons/bi";
import {FcLike} from "react-icons/fc";
import {AiTwotoneLike,AiOutlineLike} from "react-icons/ai";
import { connect } from 'react-redux';
import { format} from 'timeago.js';
import {postLikes} from '../../redux/actions/PostActions'
import { Link } from 'react-router-dom';
import {deletePost} from '../../redux/actions/PostActions';

function Post({user,currentUser,post,postLikes,frinds,deletePost}) {

    const [frind,setFrind]=useState([]);
    const [postSlide,setPostSlide]=useState(false)
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    console.log(PF)
    useEffect(()=>{
        frinds.map(friend=>{
            if(friend._id===post.userId){
                setFrind(friend)
            }
        })
        
    })
    const PostSliding=()=>{
        if(currentUser._id===post.userId){
            setPostSlide(!postSlide);
        }
      }

    const Liked =()=>{
       
        postLikes(post._id)
    }
    
    const Dislike =()=>{
        
        postLikes(post._id)
    }
    return (
        
        <div className="rounded-md shadow-lg pb-3 mt-4 border border-gray-300 ">
            
            {/*post header*/ }
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center my-2 relative cursor-pointer">
                    <div className="rounded-full h-9 w-9 overflow-hidden">
                        <img className=" object-cover w-full h-full" src={user?PF+user.userProfilePic:PF+frind.userProfilePic} alt="small girl" />   
                    </div>
                    <span className={`ml-3 font-semibold capitalize`}>{user?user.username:frind.username}</span>
                    <div className={`absolute top-0.5 left-6 rounded-full bg-green-400 w-2.5 h-2.5`}></div> 
                    <span className="text-sm ml-2">{format(post.createdAt)}</span>
                </div>
                <div className='relative'>
                    <div onClick={()=>PostSliding()}>
                        <BiDotsVerticalRounded className="text-2xl cursor-pointer"/>
                    </div>
                    <div className={`absolute top-2 py-3 px-1 bg-gray-100 rounded-md border right-2 ${postSlide?'block':'hidden'}`}>
                        <Link to={`/editpost/${post._id}`} className='py-2 px-4'>
                            edite
                        </Link>
                        <button onClick={()=>deletePost(post._id)} className='py-2 px-4'>
                            delete
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="capitalize p-2">
                {post.desc}
            </div>
            <div className="w-full h-auto my-4">
                <img className="w-full rounded object-cover" src={`${PF}${post.postPhoto}`}  alt="Friendes" />
            </div>

            <div className="flex justify-between items-center px-2">

                <div className="flex items-center">
                    <AiOutlineLike onClick={()=>Liked()} className={`text-2xl text-blue-600 mr-2 cursor-pointer ${post.likes.length?`hidden`:`block`}`} />
                    <AiTwotoneLike onClick={()=>Dislike()} className={`text-2xl text-blue-600 mr-2 cursor-pointer ${!post.likes.length?`hidden`:`block`}`}/>
                    <div className="cursor-pointer flex">
                        <FcLike className="text-2xl mr-2"/>
                        <span className="mr-1">{post.likes.length}</span>people like it
                    </div>
                </div>

                <div className="cursor-pointer">
                    <span className="mr-1">2</span>
                    Comments
                </div>

            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        postedUser:state.posts.postedUser,
        frinds:state.posts.postedUser,
        currentUser:state.auth.user
    }
}
export default connect(mapStateToProps,{postLikes,deletePost})(Post);