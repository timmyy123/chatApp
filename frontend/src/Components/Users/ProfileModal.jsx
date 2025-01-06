import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserAvatar from './UserAvatar'
import UseSelectUser from '../../hooks/UseSelectUser'

const ProfileModal = () => {
  const { user, logout, profileUser, selectedChat } = ChatState()

  const showMessageButton = selectedChat && selectedChat.isGroupChat
  const selectUser = UseSelectUser()

  const forLoggedInUser = profileUser ? profileUser._id === user._id : undefined

  return (
    <div className='modal fade' id='profileModal' data-bs-backdrop="static" tabIndex={'-1'} aria-labelledby='profileModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        {profileUser && <div className='modal-content'>
          <div className='modal-header justify-content-center'>
            <h1 className='modal-title fs-5' id='profileModalLabel'>{profileUser._id === user._id ? 'My Profile' : 'User Info'}</h1>
          </div>
          <div className='modal-body row'>
            <div className='col-12 d-flex justify-content-center mb-2'>
              <UserAvatar userInfo={profileUser} clickAble={false} scale={2}></UserAvatar>
            </div>
            <div className=' d-flex justify-content-center'>
              <h2 className='col-5 text-start fs-6'>Username:</h2>
              <h2 className='col-3  p-0 text-start fs-6 card border-0'>{profileUser.name}</h2>
            </div>
            <div className=' d-flex justify-content-center'>
              <h2 className='col-5 text-start fs-6'>Email:</h2>
              <h2 className='col-3  p-0 text-start fs-6 card border-0'>{profileUser.email}</h2>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Dismiss</button>
            {forLoggedInUser && <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => logout()}>Logout</button>}
            {!forLoggedInUser && showMessageButton && <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={() => selectUser(profileUser._id)}>Send Message</button>}
          </div>
        </div>}
      </div>

    </div>
  )
}

export default ProfileModal

