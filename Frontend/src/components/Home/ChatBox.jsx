import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatBox = () => {
  const { user, selectedChat, setselectedChat, chats, setchats } = ChatState();
  return (
    <div className={`border-2 border-red-500 w-full md:w-2/3 lg:w-2/3 ${!selectedChat ? "hidden md:block lg:block" : "block"}`}>
      ChatBox
      
    </div>
  )
}

export default ChatBox