import React from 'react'
import SideDrawer from './SideDrawer'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import { ChatState } from '../../Context/ChatProvider'
const Chat = () => {
    const { user } = ChatState();
    return (
        <div className='bg-teal-50 h-screen flex'>
            {user && <MyChats />}
            {user && <ChatBox />}
        </div>
    )
}

export default Chat