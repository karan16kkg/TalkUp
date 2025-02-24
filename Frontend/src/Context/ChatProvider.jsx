import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setselectedChat] = useState()
    const [chats, setchats] = useState([])
    const [notification, setnotification] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
            setUser(userInfo);
    
            if (!userInfo) {
                navigate("/");
            } else {
                const token = userInfo.token;
                try {
                    const response = await axios.post("https://chat-room-utqc.onrender.com/user/jwtverify", {token});
                    if(response.data.message === "Token is valid"){
                        navigate("/chats")
                    }
                    else{
                        localStorage.removeItem("userInfo");
                        navigate("/auth")
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                }
            }
        };
    
        fetchUserData();
    },[]);
    
    

    return (
        <ChatContext.Provider value={{ user, setUser,selectedChat,setselectedChat,chats,setchats,notification,setnotification }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatProvider;