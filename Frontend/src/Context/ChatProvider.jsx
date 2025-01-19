import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(); // Initialize state
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
                    const response = await axios.post("http://localhost:3000/user/jwtverify", {token});
                    console.log(response.data);
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
    }, []);
    
    

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatProvider;