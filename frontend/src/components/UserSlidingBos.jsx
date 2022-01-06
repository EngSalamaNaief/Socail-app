import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/AuthActions';
 function UserSlidingBos(props) {
    const {userSlide} =props
    return (
        <div className={`p-3 border-2 absolute top-6 right-0 bg-gray-200 text-black rounded-lg ${userSlide?`block`:`hidden`}`}>
            <Link to="/userpage" className='capitalize flex justify-center cursor-pointer my-3'>
                {/*props.user.username*/} username
            </Link>
            <div className='capitalize my-3 flex justify-center'>
                <Link onClick={()=>props.logout()} to='login'>log out</Link>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.auth.user
    }
}

export default connect(mapStateToProps,{logout}) (UserSlidingBos);