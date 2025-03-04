import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import ChatListItem from './ChatListItem'
import UseApi from '../../hooks/UseApi'
import styles from '../Style.module.css'

const ChatsMenu = () => {
  const [loading, setLoading] = useState(false)
  const { user, chats, setChats, toggleFetch } = ChatState()
  const api = UseApi()

  const fetchChats = async () => {
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await api.get('/api/chat', config)
      setChats(data)
      setLoading(false)
    } catch (error) {
      console.error(error.response.data.message||'Unexpected Error')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [toggleFetch])
  return (
    <div
      className={`d-flex flex-column border-end ${styles.chatsMenu}`}
      style={{ height: '92vh' }}
    >
      <div
        className='d-flex w-100 align-items-center p-2'
        style={{ height: '8vh', minHeight: '50px', minWidth:'330px' }}
        
      >
        <span className='fw-bold fs-4 flex-grow-1 ms-2 text-info' style={{ fontFamily: "Work Sans"}}>My Chats</span>
        <button type='button' className='btn bg-primary-subtle d-flex me-4' data-bs-toggle='modal' data-bs-target ='#groupChatModal' style={{minWidth: '180px'}}>
          <p className='fs-6 flex-grow-1 my-0 me-1'>
          Create Group Chat
          </p>
          <i className='bi bi-plus-lg'></i>
          </button>
      </div>
      <div className='d-flex flex-column'>

        {loading ? (
          <div className="d-flex justify-content-center" >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : chats && chats.length > 0 ? (
          <div className='d-flex flex-column overflow-auto p-3' style={{height: '84vh'}}>
            {chats.map((chat) => <ChatListItem key={chat._id} chat={chat} />)}
          </div>
        ) : (
          <div className="text-center text-muted">No chats available</div>
        )
        }
      </div>
    </div>
  )
}

export default ChatsMenu