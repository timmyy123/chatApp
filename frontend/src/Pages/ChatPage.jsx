import React, { useState } from 'react'
import axios from 'axios'
import ChatsMenu from '../Components/ChatsMenu'
import SearchUser from '../Components/SearchUser'
import TopBar from '../Components/TopBar'
import { ChatState } from '../Components/Context/ChatProvider'

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    console.log(showSearch)
  }
  const {user} = ChatState()

  return (
    <main style={{ width: '100%' }}>
      <TopBar toggleSearch={toggleSearch} showSearch={showSearch}></TopBar>
      {showSearch && <SearchUser onClose={toggleSearch} />}
      <div className='row'>
        <div className='col-4'>
          <ChatsMenu fetchAgain={fetchAgain}></ChatsMenu>
        </div>
      </div>
    </main>
  )
}

export default ChatPage