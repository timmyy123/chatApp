import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
  const [message, setMessage] = useState(null)

  const fetchMessage = async()=> {
    const {data} = await axios.get('/api')
    setMessage(data)
    console.log(data)
  }

  useEffect (() => {
    fetchMessage()
  },[])
  return (
    <div>{message}</div>
  )
}

export default ChatPage