import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { getOtherUser } from '../config/ChatLogics'
import UserAvatar from '../Users/UserAvatar'
import GroupChatAvatar from '../GroupChat/GroupChatAvatar'
import UseApi from '../../hooks/UseApi'
import UseLeaveGroup from '../../hooks/UseLeaveGroup'
import io from 'socket.io-client'
import styles from '../Style.module.css';

const ENDPOINT = 'https://ti-talk.onrender.com' //'http://localhost:5000' 
let socket

const ChatWindow = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)
  const [othersTyping, setOthersTyping] = useState()
  const api = UseApi()
  const chatEndRef = useRef(null)
  const keyStroke = useRef(0)

  const { selectedChat, setSelectedChat, user, createToast } = ChatState()
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

      socket.emit('join chat', selectedChat._id)
    } catch (error) {
      console.error(error.response.data.message || 'Unexpected Error')
      createToast('Failed to fetch messages')
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage) return
    socket.emit('stop typing', selectedChat._id)
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
      socket.emit('new message', data)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.error(error.response.data.message || 'Unexpected Error')
      createToast('Failed to send message')
    }
  }

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    keyStroke.current += 1

    if (!socketConnected) return

    socket.emit('typing', selectedChat._id, user)

    const keyStrokePre = keyStroke.current

    setTimeout(() => {
      if (keyStrokePre === keyStroke.current) {

        socket.emit('stop typing', selectedChat._id)
      }
    }, 1500);
  }

  const stopTypingHandler = () => {
    if (!socketConnected) return

    socket.emit('stop typing', selectedChat._id)
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user._id)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', (typingUser) => setOthersTyping(typingUser))
    socket.on('stop typing', () => setOthersTyping(undefined))

    return () => {
      socket.off('connected')
      socket.off('typing')
      socket.off('stop typing')
    }
  }, [])


  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (selectedChat && selectedChat._id === newMessageReceived.chat._id) {
        setMessages([...messages, newMessageReceived])
      }
    })
  })
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setNewMessage('')
  }, [selectedChat])

  return (
    <div>
      {selectedChat ? (
        <div className={`d-flex flex-column`} style={{height: '92vh'}}>
          <div >
            <div className={`d-flex align-items-center border-bottom p-2 ${styles.chatWindowHeader}`}>
              <i className='bi bi-arrow-left d-block d-xl-none' onClick={() => setSelectedChat(undefined)}></i>

              {selectedChat.isGroupChat ? (
                <>
                  <div>

                    <GroupChatAvatar chatInfo={selectedChat} clickAble='true'></GroupChatAvatar>
                  </div>
                  <h5 className='text-truncate'>
                    {selectedChat.chatName}
                  </h5>
                </>
              ) : (
                <>
                  <div>
                    <UserAvatar userInfo={getOtherUser(user, selectedChat.users)} clickAble='true' />
                  </div>

                  <h5 className='text-truncate'>
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
            <div className={`flex-grow-1 overflow-auto ${loading ? 'd-flex align-items-center justify-content-center' : ''} p-3 ${styles.chatWindowBody}`}>
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
                          <div>
                            <UserAvatar userInfo={msg.sender} clickAble={true}></UserAvatar>
                          </div>
                          <div className='card px-2 me-5 d-flex bg-warning bg-gradient bg-opacity-10 text-dark justify-content-center'>
                            {msg.content}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='card px-2 ms-5 d-flex bg-success bg-gradient bg-opacity-25 text-light justify-content-center'>
                            {msg.content}
                          </div>
                        </>
                      )
                    }
                  </div>
                ))
              )}
              {othersTyping && (
                <div className='d-flex align-items-center'>
                  <div>
                    <UserAvatar userInfo={othersTyping}></UserAvatar>
                  </div>
                  <div className=' d-inline-flex badge rounded-pill text-bg-light '>
                    <div className='spinner-grow spinner-grow-sm text-warning d-flex'></div>
                    <div className='spinner-grow spinner-grow-sm text-success d-flex ms-1'></div>
                    <div className='spinner-grow spinner-grow-sm text-danger d-flex ms-1'></div>
                  </div>
                </div>
              )
              }
              <div ref={chatEndRef} style={{ height: '2vh' }}></div>
            </div>
          </div>
          <div className={`py-2 px-3 border-top ${styles.chatWindowFooter}`}>
            <div className='input-group'>
              <input type="text"
                className='form-control'
                placeholder='Type a message'
                value={newMessage}
                onChange={typingHandler}
                onBlur={stopTypingHandler}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
              <button className='btn btn-primary'
                onClick={() => sendMessage()}
                disabled={!newMessage.trim()}>
                send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`d-flex flex-column  w-100 align-items-center justify-content-center ${styles.noChatSelected}`} >
          <h4 className='text-success'>Select a chat to start messaging</h4>
        </div>
      )}
    </div>
  )
}

export default ChatWindow