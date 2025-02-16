import React from 'react'
import SideDrawer from './SideDrawer'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import { ChatState } from '../../Context/ChatProvider'
import { useState } from 'react'
const Chat = () => {
    const { user } = ChatState();
    const [fetchAgain, setfetchAgain] = useState(false)
    return (
        <div className='bg-teal-50 h-screen flex'>
            {user && <MyChats fetchAgain = {fetchAgain} />}
            {user && <ChatBox fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain} />}
        </div>
    )
}

export default Chat