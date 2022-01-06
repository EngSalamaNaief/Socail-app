import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { deleteUser} from '../redux/actions/AuthActions';
 function Sittings({user,deleteUser}) {
    
    const history=useHistory();
    const paramss=useParams();

    const [postText,setpostText]=useState("");
    const [postPhoto,setPostPhoto]=useState(null);

    const handleForm= async(e)=>{
        e.preventDefault();
      if(postPhoto){
        const newData = new FormData();
         newData.append("desc",postText);
         newData.append("postPhoto",postPhoto);
         newData.append("userId",user._id);
         try{
          await axios.put(`/posts/${paramss.id}`,newData);
         }catch(err){
             console.log(err)
         }
         setpostText("");
         setPostPhoto(null)
        }

        window.location.reload();
       console.log(postPhoto)
    }

    if(true){
        return (
            <div className='w-full h-full p-6 border-2'>
                <div className='w-full flex justify-center py-4 font-medium text-lg'>
                    Editing Post
                </div>
                <form onSubmit={handleForm}>
    
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2 w-28'>post description</div>
                        <input name="username" value={postText} type="text" onChange={e=>setpostText(e.target.value)} required placeholder="post description" className="w-full p-4 mt-4 focus:outline-none border rounded-md"/>
                    </div>
                    <div className="flex mt-4 items-center capitalize">
                        <div className='mr-2'>post Picture</div>
                        <input name="userProfilePic" accept='.png,.jpg,jpeg' onChange={e=>setPostPhoto(e.target.files[0])} required type="file" placeholder="relationship" className="p-4"/>
                    </div>
                    <div className="w-full flex justify-end">
    
                      <button type='submit' className='text-white bg-green-600 py-2  px-5 mt-4 rounded-lg'>Save</button>
                    </div>
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