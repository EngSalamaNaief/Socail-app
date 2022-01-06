import React from 'react'
import Friend from './Friend'
import CreatePost from './home/CreatePost'
import Post from './home/Post'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
function PresonalCom({user,frinds,userposts}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="h-full border-2 md:pl-4">
            <div className="relative">
                <div className="overflow-hidden w-full rounded h-56">
                    <img className="w-full rounded object-cover h-full" src={user.userBackGroundPic?PF+user.userBackGroundPic:PF+`/nature.jpg`} alt="ff" />
                </div>
                <div className="w-full absolute top-32 flex justify-center items-center">
                    <div className="">
                        <div className="rounded-full w-40 h-40 border-2 border-white overflow-hidden">
                            <img className="h-full w-full object-cover" src={user.userProfilePic?PF+user.userProfilePic:PF+`/person-icon.png`} alt="small girl" />
                        </div>
                        <div className="mt-3">
                            <div className="capitalize flex justify-center text-2xl font-semibold">
                                <span className='capitalize'>{user.username}</span>
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
                    <CreatePost username={user.username} id={user?._id} userImg={user.userProfilePic}/>
                    
                    {
                        userposts?.map(post=>(
                            <Post post={post} user={user}/>
                        ))
                    }
                </div>
                <div className="px-5">
                    <div>
                        <ul>
                            <div>
                                <Link to={`/sittings/${user._id}`} className='py-2 px-4 text-white bg-blue-800 rounded-lg mb-5'>Sittings</Link>    
                            </div>
                            <div className="text-lg font-semibold mb-2">user information</div>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >City :</span> <span className="capitalize ml-1 text-base">{user.city}</span>
                            </li>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >from :</span> <span className="capitalize ml-1 text-base">{user.from}</span>
                            </li>
                            <li className="text-gray-500 mt-1">
                                <span className="font-semibold capitalize text-base" >relationship :</span> <span className="capitalize ml-1 text-base">{user.relationship}</span>
                            </li>
                        </ul>
                        <div className=" pt-4">
                            <span className="text-lg font-semibold">User Friends</span>
                              <div className="flex flex-wrap justify-between">
                               {frinds?.map(frind=>(
                                   <>
                                     {

                                     (user._id!==frind._id)?<Friend username={frind.username} id={frind._id} userImg={frind.userProfilePic}/>:""
                                     }
                                   </>
                               ))}
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
        userposts:state.posts.userPosts
    }
}

export default connect(mapStateToProps)(PresonalCom);