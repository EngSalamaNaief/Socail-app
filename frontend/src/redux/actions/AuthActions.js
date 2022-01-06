import {
    AUTH_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCES,
    LOGOUT_FAIL,
    LOGOUT_SUCCES,
    REGISTER_FAIL,
    REGISTER_SUCCES,
    USER_LOADED,
    USER_LOADING,
    GET_FRIEND_FAIL,
    GET_FRIEND_SUCESS,
    DELETE_USER_SUCCES,
    DELETE_USER_FAIL
} from '../types/AuthTypes';
import axios from 'axios';

//load User
export const LoadedUer=()=>(dispatch,getState)=>{

    dispatch({
        type:USER_LOADING
    })

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get("/user",config)
        .then(res=>{
            console.log("loaded data",res.data)
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        }).catch(e=>{
            console.log(e)
            dispatch({
                type:AUTH_FAIL
            })
        })

        
    }else{
        dispatch({
            type:AUTH_FAIL
        })
    }

  
    
}

// REGISTER FUNCTION

export const register=({username,email,password})=>dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    const body=JSON.stringify({username,email,password});
    axios.post("/register",body,config)
         .then(res=>{
             dispatch({
                 type:REGISTER_SUCCES,
                 payload:res.data
             })
         }).catch(e=>{
            console.log(e)
             dispatch({
                 type:REGISTER_FAIL
             })
         })
}

//LOGIN

export const login=({email,password})=>dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    const body=JSON.stringify({email,password});
    axios.post("/login",body,config)
         .then(res=>{
             console.log(res.data)
             dispatch({
                 type:LOGIN_SUCCES,
                 payload:res.data
             })
         }).catch(e=>{
            console.log(e)
             dispatch({
                 type:LOGIN_FAIL
             })
         })
}

//logout
export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT_SUCCES
    })
}

// get frind by id

export const getUser=(id)=>(dispatch,getState)=>{


    
    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if(token){
        config.headers["x-auth-token"]=token;


        axios.get(`/user/${id}`,config)
        .then(res=>{
            dispatch({
                type:GET_FRIEND_SUCESS,
                payload:res.data.friend
            })
        }).catch(e=>{
            
            dispatch({
                type:GET_FRIEND_FAIL
            })
        })

        
    }else{
        dispatch({
            type:GET_FRIEND_FAIL
        })
    }

  
    
}

//delete user

export const deleteUser=(id)=>(dispatch,getState)=>{

      
    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    if(token){
        config.headers["x-auth-token"]=token;

        axios.delete(`/${id}`,config)
             .then(res=>{
                dispatch({
                    type:DELETE_USER_SUCCES
                })
             }).catch(err=>{
                dispatch({
                    type:DELETE_USER_FAIL
                })
             })
    }
}