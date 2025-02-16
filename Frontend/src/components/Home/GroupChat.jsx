import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import './GroupChat.css';

const GroupChat = ({onClose}) => {
    const { user, selectedChat, setselectedChat, chats, setchats } = ChatState();
    const [groupName, setgroupName] = useState("")
    const [selectedUsers, setselectedUsers] = useState([])
    const [search, setsearch] = useState("")
    const [searchResult, setsearchResult] = useState([])

    const handleGroupName = (e)=>{
        setgroupName(e.target.value)
    }

    const handleSearch = (e)=>{
        setsearch(e.target.value);

    }

    const handleGroup = (userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
            toast("User Already added ❌", {
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

        setselectedUsers([...selectedUsers,userToAdd]);
    }

    const handleDelete = (delUser)=>{
        setselectedUsers(selectedUsers.filter((sel)=>(sel._id != delUser._id)));
    }

    const handleCreate = async()=>{
        if(!groupName || !selectedUsers){
            toast("All fields are required ❌", {
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

            await axios.post("https://chat-room-utqc.onrender.com/createChat/groupChat",{user:JSON.stringify(selectedUsers.map((u)=>u._id)),name:groupName,currentId:user._id})
            .then((response)=>{
                setchats([response.data,...chats]);
                toast("Group Created Successfully ✅", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    onClose();
                }, 3000);
            })
        }
        catch (error){
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
        const getUsers = async()=>{
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
        }

        const debounceTimeout = setTimeout(getUsers, 500);
        return () => clearTimeout(debounceTimeout);
    }, [search])
    
    console.log(selectedUsers)
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
    <div className='fixed inset-0 flex bg-opacity-0 z-50'>
        <div className='absolute w-full md:w-1/3 lg:w-1/3 h-screen bg-teal-50'>
            <button className="absolute top-1 right-3 text-3xl" onClick={onClose}> ✕ </button>
            <h1 className="text-4xl mt-4 mb-6 flex justify-center">Create Group</h1>
            <div className='flex flex-col gap-4 items-center px-5'>
                <input value={groupName} className='border-2 border-teal-300 w-full h-12 outline-none px-3 text-2xl' placeholder='Group Name' type="text" name="name" onChange={handleGroupName} />
                <div className='relative w-full flex items-center'>
                    <input value={search} className='border-2 border-teal-300 w-full h-12 outline-none px-3 text-2xl' placeholder='Add Members' type="search" name="search" onChange={handleSearch} />
                    <img className='absolute right-3' src="search.svg" alt="" />
                </div>
                
                <div className='flex gap-5'>
                    {selectedUsers && selectedUsers.map((user,index)=>(
                        <div key={index} className='flex gap-2 text-2xl pl-3 pr-2 py-1 bg-teal-200 rounded-full'>
                            {user.name}
                            <button className='text-xl' onClick={()=>{handleDelete(user)}}>x</button>
                        </div>
                    ))}
                </div>

                <div className="style w-full max-h-72">
                    {searchResult && searchResult.map((user,index)=>(
                        <div key={index} className='flex py-3 px-5 gap-3 mt-3 bg-teal-100 rounded-xl cursor-pointer hover:bg-teal-200 hover:mx-1 items-center' onClick={()=>{handleGroup(user)}}>
                            <img className='h-12 rounded-full' src={user.pic} alt="" />
                            <div>
                                <span className='text-2xl'>{user.name}</span>
                                <br />
                                <span className="font-bold">Email:</span>
                                <span className="">{user.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='absolute bottom-3 px-10 py-3 text-2xl bg-teal-300 rounded-full' onClick={handleCreate}>Create</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default GroupChat