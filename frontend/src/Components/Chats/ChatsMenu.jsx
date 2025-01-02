import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import ChatListItem from './ChatListItem'
import UseApi from '../../hooks/UseApi'

const ChatsMenu = ({ toggleFetch }) => {
  const [loading, setLoading] = useState(false)
  const { user, chats, setChats } = ChatState()
  const api = UseApi()

  const fetchChats = async () => {
    console.log('fetch')
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
      console.error(error.message)
      // setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [toggleFetch])
  return (
    <div
      className={`d-flex flex-column bg-warning  w-100`}
      style={{ height: '92vh' }}
    >
      <div
        className='d-flex w-100 align-items-center p-2'
        style={{ height: '8vh', minHeight: '50px' }}
        
      >
        <span className='fw-bold fs-3 flex-grow-1 ms-2' style={{ fontFamily: "Work Sans" }}>My Chats</span>
        <button type='button' className='btn btn-primary d-flex me-4' data-bs-toggle='modal' data-bs-target ='#groupChatModal' style={{minWidth: '180px'}}>
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