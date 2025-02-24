import React, { useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage, getSender, getSenderFull } from '../../config/ChatLogics';
import { useState } from 'react';
import Profile from './Profile';
import UpdateGroup from './UpdateGroup';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'

const ENDPOINT = "https://chat-room-utqc.onrender.com"
var socket, selectesChatCompare;

const ChatBox = ({ fetchAgain, setfetchAgain }) => {
  const [showProfile, setShowProfile] = useState(false)
  const [group, setgroup] = useState(false);
  const { user, selectedChat, setselectedChat, chats, setchats,notification,setnotification } = ChatState();
  const [messages, setmessages] = useState([]);
  const [newMessage, setnewMessage] = useState("")
  const [socketConnected, setsocketConnected] = useState(false)
  const [typing, settyping] = useState(false);
  const [isTyping, setisTyping] = useState(false)


  const handleProfile = () => {
    setShowProfile(true);
  }

  const handleGroup = () => {
    setgroup(true);
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setsocketConnected(true))
    socket.on("typing", () => setisTyping(true));
    socket.on("stop typing", () => setisTyping(false));
  }, [])

  const handlesendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        await axios.post("https://chat-room-utqc.onrender.com/message/sendMessage", { currentId: user._id, content: newMessage, chatId: selectedChat._id })
          .then((response) => {
            setnewMessage("");

            socket.emit("new Message", response.data);
            setmessages([...messages, response.data])
          })
      }
      catch (error) {
        toast(error, {
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
    }
  }

  const handlesendMessage2 = async (e) => {
    socket.emit("stop typing", selectedChat._id);
    try {
      await axios.post("https://chat-room-utqc.onrender.com/message/sendMessage", { currentId: user._id, content: newMessage, chatId: selectedChat._id })
        .then((response) => {
          setnewMessage("");

          socket.emit("new Message", response.data);
          setmessages([...messages, response.data])
        })
    }
    catch (error) {
      toast(error, {
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
  }

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      await axios.get(`https://chat-room-utqc.onrender.com/message/allMessages/${selectedChat._id}`)
        .then((response) => {
          setmessages(response.data);
          socket.emit("join chat", selectedChat._id)
        })
    }
    catch (error) {
      toast(error, {
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
  }

  useEffect(() => {
    fetchMessages();

    selectesChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectesChatCompare || selectesChatCompare._id != newMessageReceived.chat._id) {
        if(!notification.includes(newMessageReceived)){
          setnotification([newMessageReceived,...notification]);
          setfetchAgain(!fetchAgain)
        }
      }
      else {
        setmessages([...messages, newMessageReceived])
      }
    })
  })

  const handleTyping = (e) => {
    setnewMessage(e.target.value);

    if (!socketConnected) {
      return;
    }

    if (!typing) {
      settyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        settyping(false);
      }
    }, timerLength);
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
      <div className={`w-full md:w-2/3 lg:w-2/3 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/005/358/204/small/background-with-letter-pattern-envelope-email-vector.jpg')] ${!selectedChat ? "hidden md:block lg:block" : "block"} md:mx-2 lg:mx-2 rounded-xl shadow-black shadow-md`}>
        {selectedChat ? <div className='h-full relative'>
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
                {group && <UpdateGroup fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} fetchMessages={fetchMessages} onClose={() => { setgroup(false) }} />}
              </>
            }
          </div>
          <div className='h-[81vh]'>
            <ScrollableChat messages={messages} />
          </div>
          <div className='absolute bottom-1.5 w-full'>
            {isTyping ? <div className='text-xl ml-10'>...Messaging</div> : <div></div>}
            <div className='flex items-center gap-4 pl-3 w-full'>
              <input value={newMessage} className='h-10 w-5/6 md:w-5/6 md:h-16 lg:h-12 lg:w-11/12 outline-none rounded-full px-6 text-xl' placeholder='Enter a message' type="text" name="name" onChange={handleTyping} onKeyDown={handlesendMessage} />
              <img className='cursor-pointer' onClick={handlesendMessage2} src="send.svg" alt="Send" />
            </div>
          </div>
        </div>
          : <div className='flex justify-center items-center h-screen text-5xl md:text-4xl lg:text-5xl'>
            Click on a user to start chat
          </div>
        }

      </div>
    </>
  )
}

export default ChatBox