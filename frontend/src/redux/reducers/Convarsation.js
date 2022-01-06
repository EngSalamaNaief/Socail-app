import {GET_MESSAGES,GET_CONVARSATION} from '../types/Convarsations';

const initailState={
    convarsations:[],
    messages:[]
}

export default function ConvarsationReducer(state=initailState,action){
    switch(action.type){

        case GET_CONVARSATION:{
            return{
                ...state,
                convarsations:action.payload
            }
        }
        case GET_MESSAGES:{
            return{
                ...state,
                messages:action.payload
            }
        }
        default :return state
    }
}