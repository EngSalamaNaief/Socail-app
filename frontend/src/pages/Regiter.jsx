import React from 'react';
import {Formik,Field} from 'formik';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../redux/actions/AuthActions';

 function Regiter(props) {

    const regist =(values)=>{
        console.log(values)
        props.register(values)       
    }

    const registerForm =(props)=>{
        return<form onSubmit={props.handleSubmit}>
                      <Field name="username" type="text" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full" placeholder="Username" />
                      <Field name="email" type="email" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full mt-3" placeholder="Email" />
                      <Field name="password" type="password" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full mt-3" placeholder="Password" />
                      <Field name="repassword" type="password" className="border rounded-lg border-gray-400 focus:outline-none p-3 w-full mt-3" placeholder="Password again" />

                      <button type='submit' className="w-full text-white bg-blue-600 rounded-lg text-xl font-semibold py-3 mt-3">Sign Up</button>
                      <div className="w-full flex justify-center">
                        <Link to='/login' className="px-6 text-white bg-green-600 rounded-lg text-xl font-semibold py-3 mt-3">Log into Account</Link>
                      </div>
            </form>
                
    }

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
                      initialValues={{username:"",email:"",password:"",prepassword:""}}

                      onSubmit={regist}
                    >
                        {registerForm}
                    </Formik>

                 </div>
            </div>
        </div>
    </div>
    )
}

export default connect(null,{register})(Regiter);