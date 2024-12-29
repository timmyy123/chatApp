import React from 'react'

const UserBadgeItem = ({user, handleClick}) => {
  return (
    <div className='badge text-bg-success d-flex mx-1 mb-2 justify-content-center align-items-center'>  
      <span className='me-1 '>{user.name}</span>
      <button type='button' className='btn-close' onClick={handleClick}></button>

    </div>
  )
}

export default UserBadgeItem