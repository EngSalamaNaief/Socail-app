import React from 'react'
import LeftSide from '../components/home/LeftSide'
import Topar from '../components/Topar'
import {useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import PostEdite from '../components/PostEdite';
 function PostEditPage({user}) {

    const history=useHistory();
 
 
    if(user){
        return (
            <div>
                <Topar/>
                <div className="grid md:grid-cols-4 container m-auto">
                    <div className='order-last md:order-first'>
                        <LeftSide/>
                    </div>
                    <div className="col-span-3">
                       <PostEdite user={user}/>
                       
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                {history.push('/')}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{

    return{
        user:state.auth.user,
    }
}

export default connect(mapStateToProps)(PostEditPage);