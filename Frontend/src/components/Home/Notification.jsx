import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { getSender } from '../../config/ChatLogics';

const Notification = ({ onClose }) => {
    const { user, notification, setnotification, selectedChat, setselectedChat } = ChatState();
    return (
        <div className='fixed inset-0 flex bg-opacity-0 z-50'>
            <div className='style absolute w-full md:w-1/3 lg:w-1/3 h-screen bg-teal-50'>
                <button className="absolute top-1 right-3 text-3xl text-gray-600 hover:text-gray-800" onClick={onClose}> ✕ </button>

                <div className='mt-14 px-4'>
                    {notification.length === 0 ? (
                        <div className='text-3xl flex justify-center items-center'>No new Notification</div>
                    ) : (
                        <>
                            <h2 className='text-4xl font-bold text-center mb-4'>Notifications</h2>
                            {notification.map((user1, index) => (
                                <div key={index}
                                    onClick={() => {
                                        setselectedChat(user1.chat);
                                        setnotification(notification.filter((n) => n !== user1));
                                    }}
                                    className='h-14 mt-4 bg-teal-200 px-3 flex items-center text-2xl cursor-pointer'
                                >
                                    {user1.chat.isGroupChat
                                        ? `New Message in: ${user1.chat.ChatName}`
                                        : `New Message from: ${getSender(user, user1.chat.users)}`}
                                </div>
                            ))}
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Notification