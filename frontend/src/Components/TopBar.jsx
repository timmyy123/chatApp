import React from 'react'
import UserAvatar from './UserAvatar'

const TopBar = () => {
  return (
    <div className='row navbar' style={{backgroundColor: '#18bfec' }}>
      <div className='col-10 text-center'>
        <h3>Talkitive</h3>
      </div>
      <div className='col-2 d-flex align-items-center'>
        <UserAvatar></UserAvatar>
      </div>
    </div>
  )
}

export default TopBar