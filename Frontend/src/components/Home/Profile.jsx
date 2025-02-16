import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Profile = ({ user1, onClose }) => {
    const { user, selectedChat, setselectedChat, chats, setchats } = ChatState();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("userInfo");
        navigate("/");
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white w-5/6 md:w-1/3 lg:w-1/3 rounded-lg p-6 relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl" onClick={onClose}> ✕ </button>
                <h2 className="text-4xl font-semibold mb-4 flex justify-center">Profile</h2>
                <div className="flex flex-col gap-4 items-center">
                    <img className="h-24 rounded-full border-4 border-teal-400" src={user1.pic} alt="User Profile"/>
                    <div className="w-full flex flex-col items-center text-2xl gap-3">
                        <p className="">Name: {user1.name}</p>
                        <p className="">Email: {user1.email}</p>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-10">
                    {user==user1?<button className="py-2 px-6 text-3xl bg-teal-400 rounded-full shadow-teal-700 shadow-xl" onClick={handleLogout}>Logout</button>
                    :<span></span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
