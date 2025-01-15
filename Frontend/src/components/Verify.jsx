import React from 'react'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
  const navigate = useNavigate();
  const handleVerify = ()=>{
    
  }

  return (
    <div className='flex h-screen justify-center items-center bg-teal-50'>
      <div className='w-full h-screen [@media(min-width:768px)_and_(max-width:1024px)]:w-4/5 lg:w-2/6 bg-teal-100 overflow-hidden rounded-3xl'>
        <div className='h-60 [@media(min-width:768px)_and_(max-width:1024px)]:h-96 lg:h-52 flex flex-col w-full bg-teal-400 rounded-3xl pl-6 pb-7 text-white'>
          <div className='w-full mt-4 mb-3'>
            <img src="back.svg" alt="back" />
          </div>
          <h1 className='text-4xl [@media(min-width:768px)_and_(max-width:1024px)]:mt-10'>OTP verification</h1>
          <span className='mt-5 '>Please enter your correct OTP for email verification process OTP is send to your Logged In Email</span>
        </div>

        <div className='flex flex-col items-center w-full mt-36'>
          <div className='w-full flex flex-col items-center'>
            <input className='h-16 w-2/3 border-b-2 border-teal-400 bg-transparent text-2xl px-2 outline-none' placeholder='Enter OTP' type="text" name="" id="" maxLength={4} />
          </div>
          <div className='flex flex-col mt-14 w-full items-center'>
            <button className='bg-teal-400 w-1/2 py-3 rounded-full text-white text-2xl' onClick={handleVerify}>Verify</button>
            <button className='mt-4 border-b-2 border-teal-500 text-teal-500 text-xl'>Resend OTP</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify