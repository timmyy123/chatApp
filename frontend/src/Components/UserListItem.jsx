import React from 'react'

const UserListItem = ({user}) => {
  return (
    <div
    className='list-group-item list-group-item-action'
    style={{cursor: 'pointer'}}
    >
      <div className='d-flex align-items-center'>
        <div
        className='me-3 justify-content-center align-items-center d-flex'
        style={{width:'40px', height:'40px', borderRadius: '50%', backgroundColor: '#f0f0f0'}}
        ><h2>{user.name.charAt(0).toUpperCase()}</h2></div>
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