import React from 'react'

const UserAvatar = ({ userInfo, handleClick }) => {
  return (
    <div
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      style={{ width: '40px', height: '40px', borderRadius: '50%', }}
    >{userInfo.name.charAt(0).toUpperCase()}
    </div>
  )
}

export default UserAvatar