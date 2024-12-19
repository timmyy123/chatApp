import React from 'react'
import UserAvatar from './UserAvatar'

const TopBar = ({toggleSearch, showSearch}) => {
  return (
    <div className='row navbar' style={{backgroundColor: '#18bfec' }}>
      <div className='col-3 '><i className="bi bi-search mx-2" onClick={toggleSearch}></i></div>
      <div className='col-6 text-center'>
        <h3>Chatty</h3>
      </div>
      <div className='col-3 d-flex align-items-center'>
        <UserAvatar></UserAvatar>
      </div>
    </div>
  )
}

export default TopBar