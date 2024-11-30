import React from 'react'
import { useState } from 'react'

const Auth = () => {
  const [current, setcurrent] = useState("Login")
  return (
    <div className='flex justify-center items-center h-screen bg-teal-50'>
      <div className='flex flex-col w-11/12 [@media(min-width:768px)_and_(max-width:1024px)]:w-4/6 md:w-2/6 items-center rounded-3xl bg-teal-100'>
        <div className='flex flex-col w-full bg-teal-400 rounded-3xl pl-6 pb-7 text-white'>
          <div className='w-full'>
            <img src="back.svg" alt="back" />
          </div>
          <h1 className='text-4xl'>{current}</h1>
          <span className='mt-3'>Fill up your details to register</span>
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

          <button className='bg-teal-400 h-14 rounded-full hover:bg-teal-500 mt-5 text-2xl text-white'>Register</button>

          <div className='flex gap-2'>
            <span>Already have an account</span>
            <button className='text-teal-600'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth