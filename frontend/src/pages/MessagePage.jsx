import React from 'react'
import Topar from '../components/Topar';
import { MdSend } from "react-icons/md";
import Message from '../components/Message';
import {connect } from 'react-redux';
import {GetConvarsation,GetMessages,AddMessages} from '../redux/actions/Convarsation';
import { useEffect } from 'react';
import ConvarsationCom from '../components/ConvarsationCom';
import { useState } from 'react';
import OnlineFriends from '../components/OnlineFriends';
function MessagePage(props) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    const [text,setText]=useState('');
    const [conv,setConv]=useState(null);
    useEffect(()=>{
        props.GetConvarsation();
    },[])

    const loadMassages =(id)=>{
        props.GetMessages(id)
    }
    
    const sellectConv=(c)=>{
        loadMassages(c._id)
        setConv(c._id)
    }
    const handleMessage=(e)=>{
        e.preventDefault();
        if(text!==''){
            const newMessage={
                text,
                convarsationId:conv
            }
            props.AddMessages(newMessage);
        }
        setText('')
    }
    console.log(conv)
    return (
        <div className='h-screen'>
            <Topar/>
            <div className='container m-auto'>
                <div className='grid md:grid-cols-12 w-full '>

                    <div className='border md:col-span-3 order-last md:order-first w-full bg-gray-50'>
                        <form className='border-b p-2 mb-4' action="post" onSubmit={(e)=>e.preventDefault()}>
                            <div>
                                <input className='focus:outline-none py-1 px-3 w-full rounded-lg border-2 md:border-none' type="text" name="" id="" placeholder='Search for friends'/>
                            </div>
                        </form>

                        {props.convarsations?.map(c=>(
                            <div onClick={()=>sellectConv(c)}>
                                <ConvarsationCom key={c._id} conv={c}/>
                            </div>
                        ))}
                    </div>
                    <div className='border md:col-span-6 order-1 md:order-2  '>
                        <div className='relative overflow-hidden' style={{height:`90vh`}}>
                            <div className='flex justify-center font-medium py-3'>
                                Friend messages ...
                            </div>
                            <hr/>
                            <div className='overflow-scroll overscroll-none h-full pb-28 px-4'>
                                {
                                     
                                    conv? props.messages.map(m=>(<Message message={m}/>))
                                    
                                    :<div className='flex h-full w-full justify-center items-center text-gray-400 text-2xl capitalize'> sellect convarsation .. </div>
                                
                                 }
                            </div>
                            <div className=' absolute w-full bottom-0 left-0 bg-white mb-3 '>
                                 <form action="" onSubmit={(e)=>handleMessage(e)} className='mx-3'>
                                     <div className='flex items-center border-2 rounded-md overflow-hidden'>
                                       <input onChange={e=>setText(e.target.value)} value={text} type="text" className='w-full py-3 px-5 focus:outline-none ' placeholder='Enter Message ' />
                                        <button type='submit' className='pr-3 border-l'><MdSend className='text-2xl'/> </button>                                   
                                     </div>
                                 </form>
                            </div>
                        </div>
                    </div>
                    <div className='border py-4 md:col-span-3 order-2 block  md:order-3 bg-gray-50'>
                        <div className='flex justify-center capitalize mb-2 font-medium'>online friends</div>
                        <hr/>
                         {props.user.followings.length?
                             props.user.followings.map(friend=>(
                                <OnlineFriends friendId={friend}/>
                              ))
                         :<div className='flex h-full w-full justify-center mt-10 text-gray-400 text-xl'> No friends online ..</div>}

                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
 
    return{
        convarsations:state.convarsation.convarsations,
        messages:state.convarsation.messages,
        user:state.auth.user,
    }
}
export default connect(mapStateToProps,{GetConvarsation,GetMessages,AddMessages})(MessagePage);