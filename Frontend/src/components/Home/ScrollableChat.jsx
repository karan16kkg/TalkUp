import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed className='style w-full h-full px-3'>
      {messages && messages.map((m, index) => (
        <div className='flex gap-2' key={m._id}>
          {(isSameSender(messages, m, index, user._id) || isLastMessage(messages, index, user._id)) && 
          <img className='w-10 rounded-full' src={m.sender.pic} alt={m.sender.name} />
          }

          <span style={{backgroundColor: m.sender._id === user._id ? "#6EE7B7" : "#3EE3F8", marginLeft:isSameSenderMargin(messages,m,index,user._id), marginTop:isSameUser(messages,m,index)?3:10}} className="style px-2 py-1 rounded-lg text-black max-w-60">
            {m.content}
          </span>

        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat