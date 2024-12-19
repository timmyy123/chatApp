import React, { useEffect, useState } from 'react'
import { ChatState } from './Context/ChatProvider'
import axios from 'axios'

const ChatsMenu = ({fetchAgain}) => {

  // const [loggedUser, setLoggedUser] = useState()
  const {selectedChat, setSelectedChat, user, setUser, chats, setChats} = ChatState()

  const fetchChats = async () => {
    console.log(user)
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }

      }
      const {data} = await axios.get('/api/chat', config)
      setChats(data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  },[fetchAgain])
  return (
    <div>ChatsMenu</div>
  )
}

export default ChatsMenu