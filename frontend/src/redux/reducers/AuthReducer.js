import {
    AUTH_FAIL,
    AUTH_SUCCES,
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
    DELETE_USER_FAIL,
    DELETE_USER_SUCCES
} from '../types/AuthTypes';

const initailState={
    token:localStorage.getItem("token"),
    isLoading:false,
    loaded:false,
    user:null,
    friend:null
}

export default  function AuthReducer(state=initailState,action){
    switch(action.type){
        case USER_LOADING :
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading:false,
                loaded:true,
                user:action.payload.user
            }
        case REGISTER_SUCCES:
        case LOGIN_SUCCES:
            localStorage.setItem("token",action.payload.token)
            return{
                ...state,
                isLoading:false,
                loaded:true,
                user:action.payload.user,
                token:action.payload.token
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_FAIL:
        case LOGOUT_SUCCES:
        case DELETE_USER_SUCCES:
            localStorage.removeItem("token");
            return{
                ...state,
                isLoading:false,
                loaded:false,
                user:null,
            }
        case GET_FRIEND_SUCESS:
           return{
              ...state,
              friend:action.payload
           } 
           case GET_FRIEND_FAIL:
            return{
               ...state,
               friend:null
            } 
        default: return state;
    }
}