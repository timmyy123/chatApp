import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserAvatar from './UserAvatar'
import UseApi from '../../hooks/UseApi'

const ProfileModal = ({ toggleFetch, setToggleFetch }) => {
  const { user, logout, profileUser, setSelectedChat, createToast } = ChatState()
  const api = UseApi()

  const forLoggedInUser = profileUser._id === user._id
  console.log('modal rendered')

  const selectUser = async () => {
    try {
      console.log(profileUser)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await api.post('/api/chat', { userId: profileUser._id }, config)
      setToggleFetch(!toggleFetch)
      setSelectedChat(data)
    } catch (error) {
      createToast('Failed to select user')
      console.log(error.message)
    }
  }
  return (
    <div className='modal fade' id='profileModal' data-bs-backdrop="static"  tabIndex={'-1'} aria-labelledby='profileModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header justify-content-center'>
            <h1 className='modal-title fs-5' id='profileModalLabel'>{profileUser._id === user._id ? 'My Profile' : 'User Info'}</h1>
          </div>
          <div className='modal-body row d-flex justify-content-center'>
            <div className='col-12 d-flex justify-content-center mb-2'>
              <UserAvatar userInfo={profileUser} clickAble={false} scale={2}></UserAvatar>
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <div className='col-2' id='usernamePlaceholderStart'></div>
              <h2 className='col-5 text-start fs-5'>Username:</h2>
              <h2 className='col-2  p-0 text-start fs-5'>{profileUser.name}</h2>
              <div className='col-3' id='usernamePlaceholderEnd'></div>
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <div className='col-2' id='usernamePlaceholderStart'></div>
              <h2 className='col-5 text-start fs-5'>Email:</h2>
              <h2 className='col-2  p-0 text-start fs-5'>{profileUser.email}</h2>
              <div className='col-3' id='usernamePlaceholderEnd'></div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Dismiss</button>
            <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={forLoggedInUser ? () => {
              console.log('logout')
              logout()
            } : () => {
              console.log('selectuser')
              selectUser()
            }}>{forLoggedInUser ? 'Logout' : 'Send Message'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileModal

