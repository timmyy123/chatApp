import React from 'react'

const UserAvatar = ({ userInfo, handleclick }) => {
  console.log(userInfo)
  return (
    <div
      className='me-3 justify-content-center align-items-center d-flex'
      style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0f0f0' }}
    >{userInfo.name.charAt(0).toUpperCase()}
    </div>
  )
}

export default UserAvatar