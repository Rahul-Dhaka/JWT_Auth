import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { redirect, useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const token = Cookies.get('Token');
  const [userDetails, setUserDetails] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(()=>{
    if (!token){
      navigate('/login');
      // return null;
    }

    verifyReq();
    

  },[token])

  const verifyReq = async ()=>{

    try {
      const response = await fetch('http://localhost:4444/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
      }
    );
  
    if (response.ok) {
      const parsedResponse = await response.json();
      setUserDetails(parsedResponse.user);
      if (parsedResponse.success) {
        setIsAuthorized(true);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    
    }
      
    catch (error) {
      console.log('error');
    setAuth(false);
    }
  }

console.log('user details : ', isAuthorized);  

  const handleLogOut= ()=>{
      Cookies.remove('Token');
      navigate('/welcome');
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center w-4/5 m-auto '>
      <h1 className='w-full text-center'>Welcome to the application</h1>
      <h2 className='w-full  overflow-hidden text-ellipsis '>Your token value is {token} </h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogOut} >Log Out</button>
      <h2 className='w-full  overflow-hidden text-ellipsis '>{ userDetails?.username} {userDetails?.password}</h2>
    </div>
  )
}

export default Welcome
