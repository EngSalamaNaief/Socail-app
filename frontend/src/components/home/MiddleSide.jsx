import React,{useEffect,useState} from 'react'
import CreatePost from './CreatePost';
import Post from './Post';
import {connect} from 'react-redux';
import {getFollowerPosts,getTimelinePosts} from '../../redux/actions/PostActions'
 function MiddleSide({user,timelinePosts,getTimelinePosts,frinds,getFollowerPosts}) {

    const [posts,setPosts]=useState([]);
    
    useEffect(()=>{
        getFollowerPosts()
        getTimelinePosts()
    },[])

  /*  useEffect(()=>{
        
        setPosts(timelinePosts?.sort((p1,p2)=>{
            return new Date(p2.createdAt)-new Date(p1.createdAt);
        }))
    },[])*/
  
    return (
        <div className="md:p-4 h-full border-2">
           <CreatePost username={user?.username} id={user?._id} userImg={user?.userProfilePic}/>
          
           {timelinePosts?.map(post=>(
           
                 <Post key={post._id} post={post}/>
           ))}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        timelinePosts:state.posts.timelinePosts,
        frinds:state.posts.postedUser
       
    }
}
export default connect(mapStateToProps,{getFollowerPosts,getTimelinePosts})(MiddleSide);