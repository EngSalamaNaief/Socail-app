import { connect } from 'react-redux';
import React from 'react'
import {GiPresent} from "react-icons/gi";
import User from './User';
 function RightSide({friends,user}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="p-4  ">
            <div className="flex items-center">
                <GiPresent className="text-6xl mr-2 text-red-500"/>
                <div className="flex flex-wrap">
                    <span className="font-bold">Pola foster</span><span className="px-1"> and </span><span className="font-bold">3 other frindes</span>
                    <span>have a brithday to day</span>
                </div>
            </div>
            <div className="rounded-lg overflow-hidden my-5">
                <img className="h-full w-full" src={`${PF}/frindes.jpg`} alt="freindes" />
            </div>
            <div>
                <h1 className="capitalize font-semibold">online friendes</h1>
                {friends?.map(frind=>(
                                   <>
                                     {

                                     (user._id!==frind._id)?<User key={frind._id} name={frind.username} id={frind._id} img={frind.userProfilePic}/>:""
                                     }
                                   </>
                               ))}
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        friends:state.posts.postedUser,
        user:state.auth.user
    }
}

export default connect(mapStateToProps)(RightSide)