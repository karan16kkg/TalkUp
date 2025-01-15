import React, { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth = () => {
  const imgRef = useRef();
  const passRef = useRef();
  const [current, setcurrent] = useState("Login")
  const [form, setform] = useState({name:"",email:"",password:""});

  const handleChange = (e)=>{
    setform({...form,[e.target.name]:e.target.value});
  }

  const handleRegister = ()=>{

    if(form.password.length>3 && form.email.includes("@gmail.com") && form.name.length>0){
      axios.post("http://localhost:3000/user/signup",form)
      .then((response)=>{
        let x = response.data.message;
        toast(x , {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
    }
    else if(form.password.length<=3){
      toast("Minimum 4 digits in password required" , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else if(form.name.length == 0){
      toast("Username Required " , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    else{
      toast("Enter a valid Email" , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    setform({name:"",email:"",password:""});
  }

  const navigate = useNavigate()
  const handleLogin = ()=>{
    axios.post("http://localhost:3000/user/login",form)
    .then((response)=>{
      console.log(response);
      let x = response.data.message;
      toast(x , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });



      if(x=="Logged In Successfully"){
        localStorage.setItem("userInfo",JSON.stringify(response.data))
        setTimeout(() => {
          navigate("/verify")
        }, 3000);
      }
    })

    setform({name:"",email:"",password:""});

  }

  const handleShow = ()=>{
    if(imgRef.current.src.includes("eye_close.svg")){
      imgRef.current.src = "eye_open.svg";
      passRef.current.type = "text";
    }

    else{
      imgRef.current.src = "eye_close.svg";
      passRef.current.type = "password";
    }
  }

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      <ToastContainer />
    <div className='flex justify-center items-center h-screen bg-teal-50'>
      <div className='flex flex-col w-full h-full [@media(min-width:768px)_and_(max-width:1024px)]:w-5/6 lg:w-2/6 items-center rounded-3xl bg-teal-100'>
        <div className='flex flex-col h-60 [@media(min-width:768px)_and_(max-width:1024px)]:h-60 w-full bg-teal-400 rounded-3xl pl-6 text-white'>
          <div className='w-full mt-4'>
            <img src="back.svg" alt="back" />
          </div>
          <h1 className='text-4xl'>{current}</h1>
          {current === "Register"?<span className='mt-3'>Fill up your details to register</span>:<span className='mt-3'>Enter your email and password to continue</span>}
        </div>
        <div className='pt-10 pb-2 w-full md:w-4/5 flex flex-col gap-8 px-2 md:px-0 [@media(min-width:768px)_and_(max-width:1024px)]:mt-20'>
        {current === "Register"?<div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Name</label><br />
            <input value={form.name} className='w-full mt-0 h-9 outline-none border-none text-xl px-3 bg-transparent' type="text" name="name" onChange={handleChange} placeholder='Enter Your Name' />
          </div>:<div></div>}
          
          <div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Email</label><br />
            <input value={form.email} className='w-full mt-0 h-9 outline-none border-none text-xl px-3 bg-transparent' type='email' name="email" onChange={handleChange} placeholder='Enter Your Email' />
          </div>

          <div className='relative border-2 border-teal-400 rounded-full flex flex-col justify-center items-center px-5 pb-4'>
            <label className=' absolute -top-4 left-10 bg-teal-100 text-teal-400 text-xl'>Password</label><br />
            <div className='flex w-full items-center'>
              <input ref={passRef} value={form.password} className='relative w-full mt-0 h-9 outline-none text-xl px-3 bg-transparent' type="password" name="password" onChange={handleChange} placeholder='Enter Your Password' />
              <img ref={imgRef} className='absolute right-10 cursor-pointer' src="eye_close.svg" alt="" onClick={handleShow} />
            </div>
          </div>

          {current === "Login"?<button className='bg-teal-400 h-14 rounded-full hover:bg-teal-500 mt-5 text-2xl text-white [@media(min-width:768px)_and_(max-width:1024px)]:mt-10' onClick={handleLogin}>Login</button>:<button className='bg-teal-400 h-14 rounded-full hover:bg-teal-500 mt-5 text-2xl text-white [@media(min-width:768px)_and_(max-width:1024px)]:mt-10' onClick={handleRegister}>Register</button>}
          

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
    </>
  )
}

export default Auth