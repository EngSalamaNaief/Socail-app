import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { deleteUser} from '../redux/actions/AuthActions';
 function Sittings({user,deleteUser}) {
    
    const history=useHistory();
    const paramss=useParams();

    const [username,setUsername]=useState("");
    const [city,setCity]=useState("");
    const [from,setFrom]=useState("");
    const [relationship,setRelationship]=useState("");
    const [userProfilePic,setUserProfilePic]=useState("");
    const [userCoverPic,setUserCoverPic]=useState("");
    const handleForm= async(e)=>{
        e.preventDefault();
      
        const newData = new FormData();
         newData.append("username",username);
         newData.append("city",city);
         newData.append("from",from);
         newData.append("userId",user._id);
         newData.append("relationship",relationship);
         newData.append("userProfilePic",userProfilePic);
         newData.append("userBackgroundPic",userCoverPic);
         try{
          await axios.put(`/${paramss.id}`,newData);
         }catch(err){
             console.log(err)
         }
         setUsername("");
         setCity("");
         setFrom("");
         setRelationship("");
         setUserCoverPic("");
         setUserProfilePic("");
         window.location.reload();
    }

    const DeleteUser=()=>{
    
            deleteUser(user._id);
           
        
    }
    
    if(true){
        return (
            <div className='w-full p-6 border-2'>
                <div className='w-full flex justify-center py-4 font-medium text-lg'>
                    User Sittings
                </div>
                <form onSubmit={handleForm}>
    
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2 w-28'>username</div>
                        <input name="username" value={username} type="text" onChange={e=>setUsername(e.target.value)} required placeholder="username" className="w-full p-4 mt-4 focus:outline-none border rounded-md"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2 w-28'>user City</div>
                        <input name="city" type="text" value={city} onChange={e=>setCity(e.target.value)} required placeholder="city" className="w-full p-4 mt-4 focus:outline-none border rounded-md"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2 w-28'>From</div>
                        <input name="from" type="text" value={from} onChange={e=>setFrom(e.target.value)} required placeholder="from" className="w-full p-4 mt-4 focus:outline-none border rounded-md"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2 w-28'>relationship</div>
                        <input name="relationship" value={relationship} onChange={e=>setRelationship(e.target.value)} required type="text" placeholder="relationship" className="w-full p-4 mt-4 focus:outline-none border rounded-md"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2'>user Profile Picture</div>
                        <input name="userProfilePic"  onChange={e=>setUserProfilePic(e.target.files[0])} required type="file" placeholder="relationship" className="p-4"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2'>user Cover Picture</div>
                        <input name="userBackgroundPic" onChange={e=>setUserCoverPic(e.target.files[0])} required type="file" placeholder="relationship" className=" p-4 "/>
                    </div>
                    <div className="w-full flex justify-between">
    
                      <button type='submit' className='text-white bg-green-600 py-2  px-5 mt-4 rounded-lg'>Save</button>
                    </div>
                      <button type='button' onClick={()=>DeleteUser()} className='text-white bg-blue-600 py-2  px-5 mt-4 rounded-lg'>Delete User</button>
                </form>
            </div>
        )
    }else{
        return(
            <div>{history.push('/login')}</div>
        )
    }
}


export default connect(null,{deleteUser})(Sittings)