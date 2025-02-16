import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage, getSender, getSenderFull } from '../../config/ChatLogics';
import { useState } from 'react';
import Profile from './Profile';
import UpdateGroup from './UpdateGroup';

const ChatBox = ({ fetchAgain, setfetchAgain }) => {
  const [showProfile, setShowProfile] = useState(false)
  const [group, setgroup] = useState(false);
  const { user, selectedChat, setselectedChat, chats, setchats } = ChatState();
  console.log(selectedChat);

  const handleProfile = ()=>{
    setShowProfile(true);
  }

  const handleGroup = ()=>{
    setgroup(true);
  }

  return (
    <div className={`w-full md:w-2/3 lg:w-2/3 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/005/358/204/small/background-with-letter-pattern-envelope-email-vector.jpg')] ${!selectedChat ? "hidden md:block lg:block" : "block"} md:mx-2 lg:mx-2 rounded-xl shadow-black shadow-md`}>
      {selectedChat ? <div className='h-full border-2 border-red-500'>
        <div className='flex items-center bg-teal-300 rounded-xl'>
          <img className='block md:hidden ' src="back2.svg" alt="" onClick={() => { setselectedChat("") }} />
          {!selectedChat.isGroupChat ? <>
            <div className='flex items-center gap-3 text-2xl py-2 cursor-pointer pl-2' onClick={handleProfile}>
              <img className='h-12 rounded-full' src={getImage(user, selectedChat.users)} alt="" />
              {getSender(user, selectedChat.users)}
            </div>
              {showProfile && <Profile user1={getSenderFull(user, selectedChat.users)} onClose={() => setShowProfile(false)} />}
          </>
            :
            <>
            <div className='flex items-center text-2xl gap-3 cursor-pointer py-3 pl-2' onClick={handleGroup}>
              <img className='h-12 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" />
              {selectedChat.chatName}
            </div>
            {group && <UpdateGroup fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain} onClose={()=>{setgroup(false)}}/>}
            </>
          }
        </div>
        <div className='border-2 border-red-500 h-5/6'>
          hello
        </div>
      </div>
        : <div className='flex justify-center items-center h-screen text-5xl md:text-4xl lg:text-5xl'>
          Click on a user to start chat
        </div>
      }

    </div>
  )
}

export default ChatBox