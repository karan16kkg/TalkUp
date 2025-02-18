import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateGroup = ({ fetchAgain, setfetchAgain, onClose }) => {
    const { user, selectedChat, setselectedChat } = ChatState();
    const [groupName, setgroupName] = useState("")
    const [search, setsearch] = useState("")
    const [searchResult, setsearchResult] = useState([])

    const handleGroupName = (e) => {
        setgroupName(e.target.value)
    }

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }

    const handleRename = async () => {
        if (!groupName) {
            return;
        }

        try {
            await axios.put("https://chat-room-utqc.onrender.com/createChat/renameGroup", { chatId: selectedChat._id, chatName: groupName })
                .then((response) => {
                    setselectedChat(response.data);
                    setfetchAgain(!fetchAgain);
                    setgroupName("");
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
        const getUsers = async () => {
            if (!search.trim()) {
                setsearchResult([]);
                return;
            }

            try {
                await axios.get(`https://chat-room-utqc.onrender.com/search?id=${user._id}&search=${search}`)
                    .then((response) => {
                        setsearchResult(response.data);
                    })
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
        }

        const debounceTimeout = setTimeout(getUsers, 500);
        return () => clearTimeout(debounceTimeout);
    }, [search])

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => (u._id === user1._id))) {
            toast("User Already in group", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (selectedChat.groupAdmin._id != user._id) {
            toast("Only admin can add new User", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            await axios.put("https://chat-room-utqc.onrender.com/createChat/addToGroup", { chatId: selectedChat._id, userId: user1._id })
                .then((response) => {
                    setselectedChat(response.data);
                    setfetchAgain(!fetchAgain);
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

    const handleRemove = async(user1)=>{
        if(selectedChat.groupAdmin._id!=user._id && user1._id!=user._id){
            toast("Only admin can remove User", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try{
            await axios.put("https://chat-room-utqc.onrender.com/createChat/removeFromGroup", { chatId: selectedChat._id, userId: user1._id })
            .then((response)=>{
                user1._id == user._id?setselectedChat():setselectedChat(response.data);
                setfetchAgain(!fetchAgain)
            })
        }
        catch(error){
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
            <div className='fixed inset-0 bg-black opacity-80 flex justify-center items-center'>
                <div className='bg-white w-5/6 md:w-2/3 lg:w-1/3 rounded-lg p-6 relative'>
                    <button className='absolute top-2 right-3 text-3xl text-gray-600 hover:text-gray-800' onClick={onClose}> ✕ </button>
                    <div className='flex flex-col items-center mt-5'>
                        <h1 className='text-4xl'>{selectedChat.chatName}</h1>
                        <div className='style mt-6 flex gap-5 w-full justify-center'>
                            {selectedChat.users.map((user, index) => (
                                <div key={index} className='flex pl-3 pr-5 py-2 mt-2 bg-teal-100 rounded-xl items-center relative'>
                                    {user.name}
                                    <span className='absolute right-1 text-red-500 font-bold text-xl cursor-pointer' onClick={() => { handleRemove(user) }}>x</span>
                                </div>
                            ))}
                        </div>

                        <div className='mt-8 gap-5 flex flex-col items-center md:flex-row md:justify-center w-full'>
                            <input value={groupName} className='outline-none border-2 border-teal-200 h-10 px-3' placeholder='New Group Name' type="text" name='name' onChange={handleGroupName} />
                            <button className='bg-teal-200 px-5 py-2 rounded-full' onClick={handleRename}>Update</button>
                        </div>

                        <div className='mt-5 gap-2 flex flex-col items-center w-full'>
                            <input value={search} className='outline-none border-2 border-teal-200 h-10 px-3 w-3/4' placeholder='Add users to group' type="search" name="search" onChange={handleSearch} />
                            {searchResult && searchResult.length > 0 ? <div className='style h-28 w-3/4'>
                                {searchResult.map((user, index) => (
                                    <div className='flex items-center gap-2 mb-3 px-2 py-1 rounded-xl w-full bg-teal-200 cursor-pointer hover:bg-teal-300 hover:px-1' key={index} onClick={() => { handleAddUser(user) }}>
                                        <img className='h-12 rounded-full' src={user.pic} alt="" />
                                            {user.name}
                                        {/* <div className='w-full'>
                                        </div> */}
                                    </div>
                                ))}
                            </div> :
                                null}
                        </div>

                        <div className='w-full flex justify-end '>
                            <button className='mt-8 px-4 py-2 bg-red-600 text-white rounded-xl' onClick={()=>{handleRemove(user)}}>Leave Group</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateGroup