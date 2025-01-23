import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, onClose }) => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("userInfo");
        navigate("/");
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/3 rounded-lg p-6 relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl" onClick={onClose}> ✕ </button>
                <h2 className="text-4xl font-semibold mb-4 flex justify-center">Profile</h2>
                <div className="flex flex-col gap-4 items-center">
                    <img className="h-24 rounded-full border-4 border-teal-400" src={user.image} alt="User Profile"/>
                    <div className="w-full flex flex-col items-center text-2xl gap-3">
                        <p className="">Name: {user.name}</p>
                        <p className="">Email: {user.email}</p>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-10">
                    <button className="py-2 px-6 text-3xl bg-teal-400 rounded-full shadow-teal-700 shadow-xl" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
