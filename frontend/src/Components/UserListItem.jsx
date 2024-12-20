import React from 'react'

const UserListItem = ({user}) => {
  return (
    <div
    className='list-group-item list-group-item-action'
    style={{cursor: 'pointer'}}
    >
      <div className='d-flex align-items-center'>
        <div
        className='me-3'
        style={{width:'40px', height:'40px', borderRadius: '50%', backgroundColor: '#f0f0f0'}}
        ></div>
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