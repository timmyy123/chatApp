import React, { useEffect, useState } from 'react'
import { ChatState } from './Context/ChatProvider'
import { data } from 'react-router-dom'
import { getOtherUser } from './config/ChatLogics'
import UserAvatar from './UserAvatar'
import UseApi from '../hooks/UseApi'


const ChatWindow = ({ fetchAgain, setFetchAgain, toggleMobileScreen }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const api = UseApi()

  const { selectedChat, setSelectedChat, user, notification, setNotification, createToast } = ChatState()

  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      setLoading(true)
      const { data } = await api.get(`/api/message/${selectedChat._id}`, config)
      setMessages(data)
      setLoading(false)
    } catch (error) {
      console.error(error.message)
      createToast('Failed to fetch messages')
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage) return
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await api.post(
        '/api/message',
        {
          content: newMessage,
          chatId: selectedChat._id
        },
        config
      )
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.error(error.message)
      createToast('Failed to send message')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])
  return (
    <div>
      {selectedChat ? (
        <div className='d-flex flex-column bg-white vh-100'>

            {selectedChat.isGroupChat ? selectedChat.name : (
              <div className='bg-light border-bottom d-flex align-items-center p-2'>
                <i className='bi bi-arrow-left d-block d-xl-none' onClick={() => setSelectedChat(undefined)}></i>

                <UserAvatar userInfo={getOtherUser(user, selectedChat.users)} />
                <h5>
                  {getOtherUser(user, selectedChat.users).name}
                </h5>
              </div>

            )}


        </div>
      ) : (
        <div className='d-flex flex-column bg-white vh-100 w-100'>
          <h4>Select a chat to start messaging</h4>
        </div>
      )}
    </div>
  )
}

export default ChatWindow