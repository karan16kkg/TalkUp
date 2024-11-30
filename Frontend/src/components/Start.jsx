import React from 'react'
import { useNavigate } from 'react-router-dom'
const Start = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/auth")
    }
  return (
    <div className='bg-teal-50 h-screen flex justify-center'>
        <div className='flex flex-col items-center'>
            <div className='md:mt-0 mt-20 [@media(min-width:768px)_and_(max-width:1024px)]:mt-40'>
                <img className="bg-transparent"src="https://img.freepik.com/free-vector/chat-conversation-mobile-phone-screen-tiny-people-group-persons-chatting-messenger-flat-vector-illustration-social-media-community-concept-banner-website-design-landing-web-page_74855-21724.jpg"style={{ background: "transparent", mixBlendMode: "multiply" }}alt=""/>
            </div>
            <div className='w-2/3 md:mt-0 mt-10 [@media(min-width:768px)_and_(max-width:1024px)]:mt-32'>
            Here to chat, connect, and make your moments brighter—let’s get started!
            </div>
            <button className='mt-36 md:mt-24 [@media(min-width:768px)_and_(max-width:1024px)]:mt-60 w-2/4 rounded-full h-14 bg-teal-400 hover:bg-teal-500 text-2xl text-white' onClick={handleClick}>Get Started</button>
        </div>

    </div>
  )
}

export default Start