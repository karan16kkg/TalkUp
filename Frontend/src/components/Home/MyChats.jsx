import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import Profile from "./Profile";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage, getSender } from "../../config/ChatLogics";
import "./MyChats.css"
import GroupChat from "./GroupChat";
import Notification from "./Notification";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setselectedChat, chats, setchats } = ChatState();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setsearch] = useState("")
  const [searchResult, setsearchResult] = useState([])
  const [group, setgroup] = useState(false)
  const [isnotification, setisnotification] = useState(false)

  const handleProfile = () => {
    setShowProfile(true);
  };

  const handleSearch = (e) => {
    setsearch(e.target.value)
  }



  const handleAccessChat = async (userId) => {
    try {
      await axios.post("https://chat-room-utqc.onrender.com/createChat/accessChat", { userId, currentId: user._id })
        .then((response) => {
          if (!chats.find((c) =>
            c._id === response.data._id))
            setchats([response.data, ...chats])

          setselectedChat(response.data)
          setsearch("");
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
    const fetchResults = async () => {
      if (!search.trim()) {
        setsearchResult([]);
        return;
      }

      try {
        const response = await axios.get(`https://chat-room-utqc.onrender.com/search?id=${user._id}&search=${search}`);
        setsearchResult(response.data);
      } catch (error) {
        toast(error.message || "Error fetching search results", {
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
    };

    const debounceTimeout = setTimeout(fetchResults, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const fetchChats = async () => {
    try {
      await axios.get(`https://chat-room-utqc.onrender.com/createChat/fetchChats?id=${user._id}`)
        .then((response) => {
          setchats(response.data);
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
    fetchChats();
  }, [fetchAgain])


  const handleGroup = () => {
    setgroup(true);
  }

  const handleNotification = ()=>{
    setisnotification(true);
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
      <div className={`w-full md:w-1/3 lg:1/3 ${selectedChat ? "hidden md:block lg:block" : "block"} relative`}>
        {showProfile && <Profile user1={user} onClose={() => setShowProfile(false)} />}
        {group && <GroupChat onClose={() => setgroup(false)} />}
        {isnotification && <Notification onClose={()=>setisnotification(false)}/>}
        <div className="h-36 bg-teal-400 mt-0 rounded-3xl">
          <div className="flex gap-4 pt-2 ml-2 items-center relative">
            <img className="h-12 rounded-full border-2 border-teal-700" src={user.pic} alt="User" />
            <span className="text-2xl cursor-pointer" onClick={handleProfile}>{user.name}</span>
              <img className="absolute right-10 cursor-pointer" onClick={handleNotification} src="notification.svg" alt="notification" />
          </div>

          <div className="w-full mt-7 flex justify-center relative items-center">
            <input value={search} className="h-12 w-full mx-5 rounded-full border-none outline-none px-5 text-2xl" type="Search by name or email" onChange={handleSearch} placeholder="Search" />
            <img className="absolute right-14" src="search.svg" alt="Search Icon" />
          </div>
        </div>

        <div className="px-3 ">
          {!search ? (
            <div className="text-center mt-5">
              <div className="italic text-4xl text-teal-700 flex justify-start pl-3 mb-2">
                <h1>MY CHATS</h1>
              </div>

              <div className="custom h-[60vh] md:h-[74vh] lg:h-[57vh]">
                {chats && chats.length>0 ? chats.map((chat, idx) => (
                  <div key={idx} className={`flex py-3 px-5 gap-3 mb-3 items-center rounded-xl cursor-pointer hover:bg-teal-200 hover:mx-1 ${selectedChat === chat ? 'bg-teal-300' : 'bg-teal-100'}`} onClick={() => setselectedChat(chat)}>
                    <div className="">
                      {!chat.isGroupChat ? <img className=" h-14 rounded-full" src={getImage(user, chat.users)}></img> : <img className="h-14 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"></img>}
                    </div>
                    <div className="text-2xl">
                      {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
                    </div>

                  </div>

                ))
                  : (chats.length === 0 && <div className="flex justify-center items-center h-full text-3xl">No Chats</div>)}
              </div>
            </div>

          ) : (
            <div className="custom h-[65vh] md:h-[80vh] lg:h-[62vh]">
              {searchResult.map((user, index) => (
                <div
                  key={index}
                  className="flex py-3 px-5 gap-3 mt-3 bg-teal-100 rounded-xl cursor-pointer hover:bg-teal-200 hover:mx-1 items-center"
                  onClick={() => handleAccessChat(user._id)}
                >
                  <img className="h-12 rounded-full" src={user.pic} alt="" />
                  <div>
                    <span className="text-2xl">{user.name}</span>
                    {/* <br />
                    <span className="font-bold">Email:</span>
                    <span className="">{user.email}</span> */}
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>

        <div className="h-12 w-full flex absolute bottom-3 justify-center px-3">
          <button className="text-3xl w-full bg-teal-200 rounded-lg" onClick={handleGroup}>Create Group</button>
        </div>
      </div>
    </>
  );
};

export default MyChats;
