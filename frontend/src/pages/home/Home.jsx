import React ,{useState,useEffect} from 'react';
import LeftSide from '../../components/home/LeftSide';
import MiddleSide from '../../components/home/MiddleSide';
import RightSide from '../../components/home/RightSide';
import Topar from '../../components/Topar';
import {connect } from 'react-redux';
import { useHistory} from 'react-router-dom';
import {LoadedUer} from '../../redux/actions/AuthActions'

const Home = (props) => {

    const [user,setToken] =useState(null)
    const history =useHistory();

    useEffect(()=>{
        setToken(props.user)
        props.LoadedUer();
    },[user])

    if(props.user&&props.loaded){
        return (
            <div>
                <Topar/>
                <div className="grid md:grid-cols-12   container  m-auto">
                    <div className="md:col-span-3 order-last md:order-first border-t-2">
                        <LeftSide/>
                    </div>
                    <div className="md:col-span-6">
                        <MiddleSide user={user}/>
                    </div>
                    <div className="md:col-start-10 md:col-span-3 border-t-2 md:boder-t-0">
                        <RightSide/>
                    </div>
                </div>
            </div>
        );
    }else if(props.loading){
        return(
            <div>
                loading
            </div>
        )
    }else{
        return(
            <div>
                {history.push("/login")}
            </div>
        )
    }
  
}

const mapStateToProps=(state)=>{
    console.log("state",state)
    return{
        user:state.auth.user,
        loading:state.auth.isLoading,
        loaded:state.auth.loaded
    }
}
export default connect(mapStateToProps,{LoadedUer})(Home);
