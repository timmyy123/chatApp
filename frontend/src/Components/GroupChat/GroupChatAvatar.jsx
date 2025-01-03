import React from 'react'


const GroupChatAvatar = ({ clickAble = false, scale = 1 }) => {


  return (
    <div
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      style={{ width: `${40 * scale}px`, height: `${40 * scale}px`, borderRadius: '50%' }}
      data-bs-toggle={clickAble ? 'modal' : undefined}
      data-bs-target={clickAble ? '#groupProfileModal' : undefined}
    ><i className='bi bi-people-fill' style={{scale: scale}}></i>
    </div>
  )
}

export default GroupChatAvatar