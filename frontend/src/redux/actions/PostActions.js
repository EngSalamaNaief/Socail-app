import {USERTIMELINE_POSTS_FAIL,
    USERTIMELINE_POSTS_SCUSESS,
    USER_POST_FAIL,
    USER_POST_SCUSESS,
    POSTED_USER_FAIL,
    POSTED_USER_SUCESS,
    LOADING_POSTS,
    LOADING_USER,
    FRIEND_POSTS_FAIL,
    FRIEND_POSTS_SUCESS
} from '../types/PostTypes';
import axios from 'axios';

export const getTimelinePosts=()=>(dispatch,getState)=>{

   dispatch({type:LOADING_POSTS});

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get("/posts/timeline/all",config)
        .then(res=>{
            console.log("loaded data time line",res.data)
            dispatch({
                type:USERTIMELINE_POSTS_SCUSESS,
                payload:res.data
            })
        }).catch(e=>{
        
            dispatch({
                type:USERTIMELINE_POSTS_FAIL
            })
        })

        
    }else{
        dispatch({
            type:USERTIMELINE_POSTS_FAIL
        })
    }

}
 


//get user posts
export const getUserPosts=()=>(dispatch,getState)=>{

    dispatch({type:LOADING_USER})

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get("/posts/userposts/all",config)
        .then(res=>{
            dispatch({
                type:USER_POST_SCUSESS,
                payload:res.data.posts
            })
        }).catch(e=>{
        
            dispatch({
                type:USER_POST_FAIL
            })
        })

        
    }else{
        dispatch({
            type:USER_POST_FAIL
        })
    }
}


//get friend posts
export const getFriendPosts=(id)=>(dispatch,getState)=>{

    dispatch({type:LOADING_USER})

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get(`/posts/friendposts/${id}/all`,config)
        .then(res=>{
            console.log("friend data",res.data)
            dispatch({
                type:FRIEND_POSTS_SUCESS,
                payload:res.data.posts
            })
        }).catch(e=>{
        
            dispatch({
                type:FRIEND_POSTS_FAIL
            })
        })

        
    }else{
        dispatch({
            type:FRIEND_POSTS_FAIL
        })
    }
}

// like posts
export const postLikes=(id)=>(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body=JSON.stringify()
    if(token&&id){
        config.headers["x-auth-token"]=token;
        
        console.log("idd",token)
        axios.put(`/posts/${id}/like/likes`,body,config)
        .then(res=>{
            console.log("gggg",res.data)
        }).catch(e=>{
            console.log("eee",e)
            
        })

        
    }
    
}

///get follower posts
export const getFollowerPosts=()=>(dispatch,getState)=>{
     dispatch({type:LOADING_POSTS})
    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if(token){
        config.headers["x-auth-token"]=token;


        axios.get(`/users/all`,config)
        .then(res=>{
          
            dispatch({
                type:POSTED_USER_SUCESS,
                payload:res.data.frinds
            })
        }).catch(e=>{
            
            dispatch({
                type:POSTED_USER_FAIL
            })
        })

        
    }else{
        dispatch({
            type:POSTED_USER_FAIL
        })
    }

  
    
}

//create post 

export const createPost=(data)=>(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body=JSON.stringify({...data})
    if(token){
        config.headers["x-auth-token"]=token;

        axios.post("/posts/create",body,config)
             .then(res=>{
                 console.log("post created",res.data);
             }).catch(e=>{
                console.log("post created err",e);
             })
    }
}

// delete post 
export const deletePost=(id)=>async (dispatch,getState)=>{

      
    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if(token){
        config.headers["x-auth-token"]=token;

        try{

           await axios.delete(`/posts/${id}`,config);
           window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
}