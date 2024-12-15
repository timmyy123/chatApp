import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChatsMenu from '../Components/ChatsMenu'
import TopBar from '../Components/TopBar'

const ChatPage = () => {

  return (
    <main style={{ width: '100%' }}>
      <TopBar></TopBar>
      <div className='row'>
        <div className='col-4'>
          <ChatsMenu></ChatsMenu>
        </div>
      </div>
    </main>
  )
}

export default ChatPage