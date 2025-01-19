import React from 'react'
import SideDrawer from './SideDrawer'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import { ChatState } from '../../Context/ChatProvider'
const Chat = () => {
    const { user } = ChatState();
    return (
        <div>
            {user && <SideDrawer />}
            <div className='flex border-2 border-red-600'>
                {user && <MyChats />}
                {user && <ChatBox />}
            </div>
        </div>
    )
}

export default Chat