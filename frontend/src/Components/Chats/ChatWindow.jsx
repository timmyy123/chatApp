import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { getOtherUser } from '../config/ChatLogics'
import UserAvatar from '../Users/UserAvatar'
import GroupChatAvatar from '../GroupChat/GroupChatAvatar'
import UseApi from '../../hooks/UseApi'
import UseLeaveGroup from '../../hooks/UseLeaveGroup'


const ChatWindow = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const api = UseApi()
  const chatEndRef = useRef(null)

  const { selectedChat, setSelectedChat, user, notification, setNotification, createToast } = ChatState()
  const leaveGroup = UseLeaveGroup()

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

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })

    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div>
      {selectedChat ? (
        <div className='d-flex flex-column bg-white' style={{ height: '92vh' }}>
          <div >
            <div className='bg-light border-bottom d-flex align-items-center p-2' style={{ height: '7vh', minHeight: '50px' }}>
              <i className='bi bi-arrow-left d-block d-xl-none' onClick={() => setSelectedChat(undefined)}></i>

              {selectedChat.isGroupChat ? (
                <>
                  <GroupChatAvatar chatInfo={selectedChat} clickAble='true'></GroupChatAvatar>
                  <h5>
                    {selectedChat.chatName}
                  </h5>
                </>
              ) : (
                <>
                  <UserAvatar userInfo={getOtherUser(user, selectedChat.users)} clickAble='true' />
                  <h5>
                    {getOtherUser(user, selectedChat.users).name}
                  </h5>
                </>
              )
              }
              {selectedChat.isGroupChat && (selectedChat.Admin._id === user._id ? (
                <button type='button' className='btn btn-warning ms-auto me-2' data-bs-toggle='modal' data-bs-target='#ManageGroupModal'>Manage</button>
              ) : (
                <button className='btn btn-danger ms-auto me-2' onClick={() => leaveGroup()}>Leave</button>
              ))}
            </div>
            <div className={` flex-grow-1 overflow-auto ${loading ? 'd-flex align-items-center justify-content-center' : ''} p-3`} style={{ height: '77vh' }}>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`d-flex my-2 ${msg.sender._id === user._id ? 'justify-content-end' : 'justify-content-start'}`}>
                    {msg.sender._id !== user._id ?
                      (
                        <>
                          <UserAvatar userInfo={msg.sender} clickAble={true}></UserAvatar>
                          <div className='card px-2  bg-light text-dark justify-content-center'>

                            {msg.content}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='card px-2 bg-warning text-white justify-content-center'>

                            {msg.content}
                          </div>
                          <UserAvatar userInfo={msg.sender} clickAble={true}></UserAvatar>
                        </>

                      )
                    }

                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
          </div>



          <div className='py-2 px-3 border-top' style={{ height: '8vh', minHeight: '58px' }}>
            <div className='input-group'>
              <input type="text"
                className='form-control'
                placeholder='Type a message'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
              <button className='btn btn-primary'
                onClick={() => sendMessage()}
                disabled={!newMessage.trim()}>

                send
              </button>
            </div>

          </div>


        </div>
      ) : (
        <div className='d-flex flex-column bg-white w-100 align-items-center justify-content-center' style={{ height: '92vh' }}>
          <h4>Select a chat to start messaging</h4>
        </div>
      )}
    </div>
  )
}

export default ChatWindow