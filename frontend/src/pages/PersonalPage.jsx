import React,{useEffect} from 'react'
import LeftSide from '../components/home/LeftSide'
import PresonalCom from '../components/PresonalCom'
import Topar from '../components/Topar'
import {useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import {getUserPosts} from "../redux/actions/PostActions";
import Sittings from '../components/Sittings';
import { useState } from 'react';
 function PersonalPage({user,frinds,getUserPosts}) {

    const history=useHistory();
    const [hidden,setHidden]=useState(true);
    useEffect(()=>{
        getUserPosts();
    })
 
    if(user){
        return (
            <div>
                <Topar/>
                <div className="grid md:grid-cols-4 container m-auto">
                    <div className='md:order-first order-last'>
                        <LeftSide/>
                    </div>
                    <div className="col-span-3">
                        <PresonalCom user={user} frinds={frinds} />
                       
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
        frinds:state.posts.postedUser
    }
}

export default connect(mapStateToProps,{getUserPosts})(PersonalPage);
