import React from 'react'
import UserAvatar from './UserAvatar'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      className='list-group-item list-group-item-action'
      style={{ cursor: 'pointer' }}
      onClick={handleFunction}
      data-bs-dismiss='offcanvas'
    >
      <div className='d-flex align-items-center'>
        <UserAvatar userInfo={user} />
        <div>
          <strong>{user.name}</strong>
          <br />
          <small>{user.email}</small>
        </div>
      </div>
    </div>
  )
}

export default UserListItem