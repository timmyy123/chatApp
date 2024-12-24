import React from 'react'
import { ChatState } from './Context/ChatProvider'
import { getSender } from './config/ChatLogics'

const ChatListItem = ({ user, chat }) => {
  const { selectedChat, setSelectedChat } = ChatState()
  return (
    <div 
    className={`d-flex flex-column p-2 mb-2 rounded ${selectedChat === chat? 'bg-info text-white': 'bg-light'}`}
    style={{ cursor: 'pointer' }}
    onClick={() => setSelectedChat(chat)}>
      <strong>{chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}</strong>
      {chat.latestMessage && (
        <small className='text-truncate'>
          <strong>{chat.latestMessage.sender.name}: </strong>
          {chat.latestMessage.content}
        </small>
      )}
    </div>
  )
}

export default ChatListItem