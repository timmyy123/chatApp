import React from 'react'

const GroupChatAvatar = ({chatInfo, handleClick}) => {
  return (
    <div
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    ><i className='bi bi-people-fill'></i>
    </div>
  )
}

export default GroupChatAvatar