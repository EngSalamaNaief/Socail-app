import axios from 'axios';
import {
    GET_CONVARSATION,
    GET_MESSAGES
} from '../types/Convarsations';
//get convarsations
export const GetConvarsation=()=>(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get("/convarsation",config)
        .then(res=>{
            dispatch({
                type:GET_CONVARSATION,
                payload:res.data
            })
        }).catch(e=>{
            console.log(e)
           
        })     
    }
}

// add convarsation
export const AddConvarsation=(receverId)=>async(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({receverId})
    if(token){
        config.headers["x-auth-token"]=token;
        try{

           await axios.post("/convarsation",body,config)
        }catch(err){
            console.log(err)
        }
             
    }
}

// get messages 
export const GetMessages=(convId)=>(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(token){
        config.headers["x-auth-token"]=token;
        
        axios.get(`/messages/${convId}`,config)
        .then(res=>{
            dispatch({
                type:GET_MESSAGES,
                payload:res.data
            })
        }).catch(e=>{
            console.log(e)
           
        })     
    }
}

// add message
export const AddMessages=(message)=>async(dispatch,getState)=>{

    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({...message})
    if(token){
        config.headers["x-auth-token"]=token;
        try{

           await axios.post("/messages",body,config)
        }catch(err){
            console.log(err)
        }
             
    }
}