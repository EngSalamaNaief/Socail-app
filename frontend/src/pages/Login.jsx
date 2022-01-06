import React,{useState,useEffect} from 'react'
import {Formik,Field,} from 'formik';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/actions/AuthActions';
import {useHistory} from 'react-router-dom';
 function Login(props) {
    const [user,setUser]= useState(null);
    const history=useHistory();

   useEffect(()=>{
    setUser(props.user)
   })
    const loginFun =(values)=>{
       // setUser(props.user)
        props.login(values)     
        //console.log(user)   
    }

    const loginForm =(props)=>{
        return<form onSubmit={props.handleSubmit}>
                  <Field name="email" type="email" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full mt-3" placeholder="Email" />
                  <Field name="password" type="password" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full mt-3" placeholder="Password" />
                      

                      <button type='submit' className="w-full text-white bg-blue-600 rounded-lg text-xl font-semibold py-3 mt-3">Log in</button>
                      <div className="text-blue-600 flex justify-center my-3">
                         <a href="#">Forgot Password?  </a> 
                      </div>
                      <div className="w-full flex justify-center">
                        <Link to="/register" className="px-6 text-white bg-green-600 rounded-lg text-xl font-semibold py-3">Create a new Account</Link>
                      </div>
            </form>
                
    }

if(!user){
    return (
        <div className="bg-gray-100">

        <div className="grid-cols-2 grid container m-auto ">
            <div className="h-screen flex justify-center items-center">
                 <div className="">
                     <div className="text-blue-600 text-5xl font-extrabold">
                          Lamasocial
                     </div>
                     <div className="text-2xl mt-4 font-medium">
                         connect with friends and the world <br/> around you with lamasocial
                     </div>
                 </div>
            </div>
            <div className="h-screen flex  items-center">
                 <div className="p-5 bg-white w-96 rounded-lg">
                      
                    <Formik
                      initialValues={{email:"",password:""}}

                      onSubmit={loginFun}
                    >
                        {loginForm}
                    </Formik>

                 </div>

                <Link to='/'>to home</Link>
            </div>
        </div>
    </div>
    )

    }else{

        return (
            <div>
                {history.push('/')}
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    return{
        user:state.auth.user
    }
}

export default connect(mapStateToProps,{login})(Login)