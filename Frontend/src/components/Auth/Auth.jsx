import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [current, setcurrent] = useState("Login")
  const navigate = useNavigate()
  const handleLogin = ()=>{
    navigate("/verify")
  }
  return (
    <div className='flex justify-center items-center h-screen bg-teal-50'>
      <div className='flex flex-col w-full h-full [@media(min-width:768px)_and_(max-width:1024px)]:w-5/6 lg:w-2/6 items-center rounded-3xl bg-teal-100'>
        <div className='flex flex-col h-60 [@media(min-width:768px)_and_(max-width:1024px)]:h-60 w-full bg-teal-400 rounded-3xl pl-6 text-white'>
          <div className='w-full mt-4'>
            <img src="back.svg" alt="back" />
          </div>
          <h1 className='text-4xl'>{current}</h1>
          {current === "Register"?<span className='mt-3'>Fill up your details to register</span>:<span className='mt-3'>Enter your email and password to continue</span>}
        </div>
        <div className='pt-10 pb-2 w-full md:w-4/5 flex flex-col gap-8 px-2 md:px-0'>
        {current === "Register"?<div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Name</label><br />
            <input className='w-full mt-0 h-9 outline-none border-none text-xl px-3 bg-transparent' type="text" name="" id="" placeholder='Enter Your Name' />
          </div>:<div></div>}
          
          <div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Email</label><br />
            <input className='w-full mt-0 h-9 outline-none border-none text-xl px-3 bg-transparent' type='email' name="" id="" placeholder='Enter Your Email' />
          </div>

          <div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Password</label><br />
            <input className='w-full mt-0 h-9 outline-none border-none text-xl px-3 bg-transparent' type="password" name="" id="" placeholder='Enter Your Password' />
          </div>

          {current === "Login"?<button className='bg-teal-400 h-14 rounded-full hover:bg-teal-500 mt-5 text-2xl text-white' onClick={handleLogin}>Login</button>:<button className='bg-teal-400 h-14 rounded-full hover:bg-teal-500 mt-5 text-2xl text-white'>Register</button>}
          

          {current === "Register"?<div className='flex gap-2'>
            <span>Already have an account</span>
            <button className='text-teal-600' onClick={()=>{setcurrent("Login")}}>Login</button>
          </div>:<div className='flex gap-2 mt-10'>
            <span>Dont have an account</span>
            <button className='text-teal-600' onClick={()=>{setcurrent("Register")}}>Register</button>
          </div>}
          
        </div>
      </div>
    </div>
  )
}

export default Auth