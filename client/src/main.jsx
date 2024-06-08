import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Routes, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Welcome from './Components/Welcome.jsx';
import SignUp from './Components/SignUp.jsx';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path= "welcome" element = {<Welcome/>}/>
    </Route>
    
  
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
