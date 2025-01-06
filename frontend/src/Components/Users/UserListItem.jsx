import React from 'react'
import UserAvatar from './UserAvatar'

const UserListItem = ({ user, handleFunction, dismissTarget = undefined }) => {
  return (
    <div
      className='list-group-item list-group-item-action'
      style={{ cursor: 'pointer' }}
      onClick={handleFunction}
      data-bs-dismiss={dismissTarget}
    >
      <div className='d-flex align-items-center'>
        <div>

          <UserAvatar userInfo={user} clickAble={false} />
        </div>
        <div >
          <strong className='card border-0 ' style={{ maxWidth: '280px' }}>{user.name}</strong>
      
          <small className='card border-0' style={{ maxWidth: '280px' }}>{user.email}</small>
        </div>
      </div>
    </div>
  )
}

export default UserListItem