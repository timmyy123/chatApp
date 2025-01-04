import React from 'react'
import UserAvatar from '../Users/UserAvatar'
import GroupChatAvatar from '../GroupChat/GroupChatAvatar'
import { ChatState } from '../Context/ChatProvider'
import { getOtherUser } from '../config/ChatLogics'

const ChatListItem = ({ chat }) => {
  const { selectedChat, setSelectedChat, user } = ChatState()

  // Check if the other user exists
  const otherUser = getOtherUser(user, chat.users);
  if (!otherUser) return null; // Return null if there's no other user
  return (
    <div
      className={`d-flex align-items-center p-2 mb-2 rounded ${selectedChat && selectedChat._id === chat._id ? 'bg-info text-white' : 'bg-light'}`}
      style={{ cursor: 'pointer' }}
      onClick={() => setSelectedChat(chat)}>
      <div>
        {chat.isGroupChat ? <GroupChatAvatar chatInfo={chat}></GroupChatAvatar> : <UserAvatar userInfo={otherUser} />}
      </div>

      <div className='d-flex flex-column flex-grow-1 text-truncate'>
        <strong>{chat.isGroupChat ? chat.chatName : otherUser.name}</strong>
        {chat.latestMessage && (
          <small className='text-truncate '>
            <strong>{chat.latestMessage.sender.name}: </strong>
            {chat.latestMessage.content}
          </small>
        )}
      </div>
    </div>
  )
}

export default ChatListItem