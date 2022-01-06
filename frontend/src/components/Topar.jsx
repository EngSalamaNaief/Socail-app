import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBell,FaSearch,FaUserAlt,FaEnvelope } from "react-icons/fa";
import UserSlidingBos from './UserSlidingBos';
import { connect } from 'react-redux';
const Topar = ({user}) => {

     const [userSlide,setUserSlide]=useState(false)
     const PF =process.env.REACT_APP_PUBLIC_FOLDER;
     const UserSliding=()=>{
       setUserSlide(!userSlide);
     }


    return (

      <div className="bg-blue-700 h-auto sticky top-0 z-10 rounded-b-md">
        <div className="container px-3 md:flex flex-wrap m-auto justify-between py-3 text-white">
           <div className="md:w-64 py-2 md:py-0">
             <Link className="text-white font-bold text-xl " to="/">Lamasocial</Link>
            </div>            
           <div className=" rounded-full items-center overflow-hidden flex bg-white flex-grow">
             <FaSearch className="text-black mx-3 cursor-pointer "/>
             <input type="text" className="h-full  w-full focus:outline-none text-black py-0.5 md:py-0 " placeholder=" Search for friend, Post or Video" />
            </div>            
           <div className="flex items-center justify-between md:w-96 py-2 md:py-0">
            <div className="ml-6">
              <Link className="px-2 cursor-pointer" to="/userpage">Home</Link>
              <Link className="px-2 mr-10 cursor-pointer" to="/">Timeline</Link>
            </div> 
            <div className="flex items-center">
              <div className='relative'>
                 <FaUserAlt className="mx-2 cursor-pointer"/>
                 <div className='bg-red-500 absolute bottom-2.5 right-0.5 rounded-full h-4 w-4 flex justify-center items-center text-sm '>2</div>
              </div>
              <Link to="/message" className='relative'>
                 <FaEnvelope className="mx-2 cursor-pointer"/>
                 <div className='bg-red-500 absolute bottom-2.5 right-0.5 rounded-full h-4 w-4 flex justify-center items-center text-sm '>3</div>
              </Link>
              <div className='relative'>
                 <FaBell className="mx-2 cursor-pointer"/>
                 <div className='bg-red-500 absolute bottom-2.5 right-0.5 rounded-full h-4 w-4 flex justify-center items-center text-sm '>4</div>
              </div>
            </div> 
            <div className='relative'>
              <div onClick={()=>UserSliding()} className="h-9 w-9 rounded-full overflow-hidden cursor-pointer">
                
                    <img src={user.userProfilePic?PF+user.userProfilePic:PF+`./img/person-icon.png`} className="object-cover w-full h-full" alt="beutful girl" />     
                
              </div> 
                   <UserSlidingBos userSlide={userSlide}/>
            </div>
            </div>            
        </div>
      </div>
    );
}

const mapStateToProps=(state)=>{
  return{
    user:state.auth.user
  }
}
export default connect(mapStateToProps)(Topar);
