import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { redirect, useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const token = Cookies.get('Token');

  useEffect(()=>{
    if (!token){
      navigate('/login');
      // return null;
    }

  },[token])
  

  const handleLogOut= ()=>{
      Cookies.remove('Token');
      navigate('/welcome');
  }
  return (
    <div className='flex flex-col items-center justify-center w-4/5 m-auto '>
      <h1 className='w-full text-center'>Welcome to the application</h1>
      <h2 className='w-full  overflow-hidden text-ellipsis '>Your token value is {token} </h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogOut} >
                    Log Out
                </button>
    </div>
  )
}

export default Welcome
