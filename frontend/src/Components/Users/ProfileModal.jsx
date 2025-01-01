import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserAvatar from './UserAvatar'
import UseApi from '../../hooks/UseApi'

const ProfileModal = ({ toggleFetch, setToggleFetch }) => {
  const { user, logout, profileUser, setSelectedChat, createToast } = ChatState()
  const api = UseApi()

  const forLoggedInUser = profileUser._id === user._id

  const selectUser = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await api.post('/api/chat', { userId }, config)
      setToggleFetch(!toggleFetch)
      setSelectedChat(data)
    } catch (error) {
      createToast('Failed to select user')
      console.log(error.message)
    }
  }
  return (
    <div className='modal fade' id='profileModal' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={'-1'} aria-labelledby='profileModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='profileModalLabel'>User Profile</h1>
          </div>
          <div className='modal-body'>
            <UserAvatar userInfo={profileUser}></UserAvatar>
            <h3>{profileUser.name}</h3>
            <h3>{profileUser.email}</h3>

          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss = 'modal'>Dismiss</button>
            <button type='button' className='btn btn-primary' onClick={forLoggedInUser? () => logout(): () => selectUser()}>{forLoggedInUser ? 'Logout' : 'Send Message'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileModal