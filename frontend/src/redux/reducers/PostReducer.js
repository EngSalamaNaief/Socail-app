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

const initailState={
    timelinePosts:[],
    userPosts:[],
    friendPosts:[],
    postedUser:[],
    loadeingPosts:false,
    loadingUser:false
}

export default function PostReducer(state=initailState,action){
    switch(action.type){

        case LOADING_POSTS:
            return{
                ...state,
                loadeingPosts:true
            }
        case LOADING_USER:
        return{
            ...state,
            loadingUser:true
        }
        case USERTIMELINE_POSTS_SCUSESS:
            
        const arrPosts=action.payload.posts.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
            return{
                ...state,
                timelinePosts:arrPosts,
                loadeingPosts:false,
                loadingUser:false
            }
        case USERTIMELINE_POSTS_FAIL:
            return{
                ...state,
                timelinePosts:[],
                loadeingPosts:false,
                loadingUser:false
            }
        case USER_POST_SCUSESS:
            const arr1Posts=action.payload.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })
            return{
                ...state,
                userPosts:arr1Posts,
                loadeingPosts:false,
                loadingUser:false
            }
        case USER_POST_FAIL:
            return{
                ...state,
                userPosts:[],
                loadeingPosts:false,
                loadingUser:false
            }
        case FRIEND_POSTS_SUCESS:

            return{
                ...state,
                friendPosts:action.payload,
                loadeingPosts:false,
                loadingUser:false
            }
        case FRIEND_POSTS_FAIL:
            return{
                ...state,
                friendPosts:action.payload,
                loadeingPosts:false,
                loadingUser:false
            }
        
        case POSTED_USER_SUCESS:
            return{
                ...state,
                postedUser:action.payload,
                loadeingPosts:false,
                loadingUser:false
            }
        case USER_POST_FAIL:
            return{
                ...state,
                postedUser:[],
                loadeingPosts:false,
                loadingUser:false
            }
        default :return state
    }
}