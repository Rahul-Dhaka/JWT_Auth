import React, {useState} from "react";
import {useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [response, setResponse] = useState({})


  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log('formdata is ',formData)
    const response = await fetch('http://localhost:4444/user/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const parsedResponse = await response.json();
    Cookies.set('Token', parsedResponse.token , { expires: 1 }); //expires in 1 day 
    console.log('this is response' , parsedResponse);
    setResponse(parsedResponse);
    if(parsedResponse.success === true){ 
      navigate('/welcome');
    }

  }


  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-200'>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3 text-center">Login</h2>
        <div className="w-full mb-4  "> <p className={response.message ? "w-full text-center p-2 rounded bg-red-100 text-red-600 border": "hidden"}>{response?.message}</p></div>
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name='username' onChange={(e)=> setFormData({...formData, username: e.target.value})} placeholder="Enter your username"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" onChange={(e)=> setFormData({...formData, password: e.target.value})} placeholder="Enter your password"/>
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                    Sign In
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login
