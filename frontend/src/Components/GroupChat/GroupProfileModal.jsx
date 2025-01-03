import React from 'react'
import GroupChatAvatar from './GroupChatAvatar'
import UserListItem from '../Users/UserListItem'
import { ChatState } from '../Context/ChatProvider'
import UseSelectUser from '../../hooks/UseSelectUser'
import UseLeaveGroup from '../../hooks/UseLeaveGroup'

const GroupProfileModal = () => {
  const { selectedChat, user } = ChatState()
  const selectUser = UseSelectUser()
  const leaveGroup = UseLeaveGroup()

  

  return (
    <div className='modal fade' id='groupProfileModal' data-bs-backdrop='static' tabIndex={'-1'} aria-labelledby='groupProfileModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header justify-content-center'>
            <h1 className='modal-title fs-5' id='groupProfileModalLabel'>Group Info</h1>
          </div>
          <div className='modal-body row'>
            <div className=' d-flex justify-content-center mb-2'>
              <GroupChatAvatar scale={2}></GroupChatAvatar>
            </div>
            <div className=' d-flex justify-content-center'>
              <h2 className='col-5 text-start fs-5'>Group Name:</h2>
              <h2 className='col-2 p-0 text-start fs-5'>{selectedChat.chatName}</h2>
            </div>
            <div className=' d-flex justify-content-center'>
              <h2 className='fs-4'>Users</h2>
            </div>
            <div className='d-flex flex-column overflow-auto list-group' style={{ height: '200px' }}>
              {selectedChat.users.map(u =>
                <UserListItem key={u._id} user={u} handleFunction={() => selectUser(u._id)} dismissTarget='modal'></UserListItem>
              )}
            </div>
          </div>
          <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Dismiss</button>
          {selectedChat.isGroupChat && (selectedChat.Admin._id === user._id ? (
                <button type='button' className='btn btn-warning ms-auto me-2' data-bs-toggle='modal' data-bs-target='#ManageGroupModal'>Manage</button>
              ) : (
                <button className='btn btn-danger ms-auto me-2' onClick={() => leaveGroup()}>Leave</button>
              ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default GroupProfileModal