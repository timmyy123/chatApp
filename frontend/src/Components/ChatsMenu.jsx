import React, { useEffect, useState } from 'react'
import { ChatState } from './Context/ChatProvider'
import ChatListItem from './ChatListItem'
import UseApi from '../hooks/UseApi'

const ChatsMenu = ({ fetchAgain }) => {
  const [loading, setLoading] = useState(false)
  const { user, chats, setChats } = ChatState()
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
      console.error(error.message)
      // setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [fetchAgain])
  return (
    <div
      className={`d-flex flex-column bg-warning vh-100 w-100 p-2`}
    >
      <div
        className='d-flex w-100 align-items-center mb-3 p-2'
        
      >
        <span className='fw-bold fs-3' style={{ fontFamily: "Work Sans" }}>My Chats</span>
      </div>
      <div className='d-flex flex-column'>

        {loading ? (
          <div className="d-flex justify-content-center" >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => <ChatListItem key={chat._id} user={user} chat={chat} />)}
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