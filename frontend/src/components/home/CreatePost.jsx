import React,{useState} from 'react'
import {MdPhotoLibrary,MdRoom,MdSentimentVerySatisfied} from "react-icons/md";
import {IoMdPricetags} from "react-icons/io";
import {connect} from 'react-redux'
import { useHistory } from 'react-router';
import { createPost } from '../../redux/actions/PostActions';
import axios from 'axios';
function CreatePost({username,user,id,token,userImg,createPost}) {

    const [postText,setPostText]=useState('');
    const [postImg,setPostImg]=useState(null);
    const history = useHistory();
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  
    const Share=async()=>{

       
        const newPost={
            desc:postText,
        }

        if(postImg){

        const newdata= new FormData();
       // const filename=`${Date.now()}_${postImg.name}`;
        newdata.append("file",postImg);
        newdata.append("userId",user._id);
        newdata.append("desc",postText);

           // newPost.postPhoto=filename;
            

            
            try{

             await axios.post("/posts/create",newdata)
 
            }catch(e){
                console.log(e)
            }

            setPostImg(null);
            setPostText("")
            window.location.reload();
         //  createPost(postImg);

    }
    }
    return (
        <div className="rounded-md drop-shadow-2xl shadow-xl border-gray-300 h-auto pb-5 pt-4 px-4 border py-2 mb-20">    
        <div className="flex items-center py-3">
             <div className="rounded-full h-9 w-9 overflow-hidden">
                 <img className=" object-cover w-full h-full" src={user?PF + user?.userProfilePic:PF+`/person-icon.png`} alt="small girl" /> 
             </div>
             <input className="ml-3 focus:outline-none w-full" value={postText} onChange={e=>setPostText(e.target.value)} type="text" placeholder={ `What's in your mind ${user?.username} ?`}/>
        </div>

        <div className="border-t flex border-gray-400 mt-1 py-6 justify-between flex-wrap">
             
             <label htmlFor='file' className=" cursor-pointer capitalize flex my-1  items-center">
                 
                  <input type="file" id="file" className='hidden' onChange={e=>setPostImg(e.target.files[0])} accept='.png,.jpg,jpeg'/>
                    <MdPhotoLibrary className="text-2xl text-red-500"/>
                    <span  className="text-sm">photo or video</span>
                  
                   
             </label>
             <div className=" cursor-pointer capitalize flex my-1 items-center">
                  <IoMdPricetags className="text-2xl text-blue-700"/>
                 <span className="text-sm">tag</span>  
             </div>
             <div className=" cursor-pointer capitalize flex my-1 items-center">
                  <MdRoom className="text-2xl text-green-700"/>
                 <span className="text-sm">location</span>  
             </div>
             <div className=" cursor-pointer capitalize flex my-1 items-center">
                  <MdSentimentVerySatisfied className="text-2xl text-yellow-500"/>
                 <span className="text-sm">feelings</span>  
             </div>

             <button type='submit' onClick={()=>Share()}  className="bg-green-700 text-sm rounded px-2 py-0.5 text-white ">Share</button>

        </div>
    </div>
    )
  
}


const mapSateToProp=(state)=>{
    return{
        user:state.auth.user,
        token:state.auth.token
    }
}

export default connect(mapSateToProp,{createPost})(CreatePost);