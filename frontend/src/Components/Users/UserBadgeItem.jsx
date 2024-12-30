import React from 'react'
import { ChatState } from '../Context/ChatProvider'

const UserBadgeItem = ({ userInfo, handleClick }) => {
  const { user } = ChatState()
  const isAdmin = user._id === userInfo._id
  return (
    <div className='badge text-bg-success d-flex mx-1 mb-2 justify-content-center align-items-center'>
      <span className='me-1 '>{userInfo.name}</span>
      {isAdmin ? (
        <span>(Admin)</span>
      ) : (
        <button type='button' className='btn-close' onClick={handleClick}></button>
      )}

    </div>
  )
}

export default UserBadgeItem