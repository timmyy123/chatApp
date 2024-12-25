import React from 'react'
import UserAvatar from './UserAvatar'
import { ChatState } from './Context/ChatProvider'
import { getOtherUser } from './config/ChatLogics'

const ChatListItem = ({ user, chat }) => {
  const { selectedChat, setSelectedChat } = ChatState()
  return (
    <div
      className={`d-flex align-items-center p-2 mb-2 rounded ${selectedChat === chat ? 'bg-info text-white' : 'bg-light'}`}
      style={{ cursor: 'pointer' }}
      onClick={() => setSelectedChat(chat)}>

      {chat.isGroupChat ? '' : <UserAvatar userInfo={getOtherUser(user, chat.users)} />}

      <div className='d-flex flex-column flex-grow-1'>
        <strong>{chat.isGroupChat ? chat.chatName : getOtherUser(user, chat.users).name}</strong>
        {chat.latestMessage && (
          <small className='text-truncate'>
            <strong>{chat.latestMessage.sender.name}: </strong>
            {chat.latestMessage.content}
          </small>
        )}
      </div>
    </div>
  )
}

export default ChatListItem