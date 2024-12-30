import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UseApi from '../../hooks/UseApi'
import UserListItem from '../Users/UserListItem'
import UserBadgeItem from '../Users/UserBadgeItem'
import useSearchUser from '../../hooks/useSearchUser'

const GroupChatModal = ({ toggleFetch, setToggleFetch }) => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState('')


  const {search, setSearch, searchResults, loading, handleHide} = useSearchUser('/api/user')
  const api = UseApi()
  const { user, createToast, setSelectedChat } = ChatState()

  const addUser = (user) => {
    if (!selectedUsers.some(u => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const removeUser = (userToRemove) => {
    if (userToRemove._id === user._id) return
    setSelectedUsers(selectedUsers.filter(u => u !== userToRemove))
  }

  const CreateGroupChat = async () => {
    console.log('ran')
    let error = []
    if (!groupName) {
      error = [...error, 'Please enter group name']
    }

    if (selectedUsers.length < 3) {
      error = [...error, 'Group needs at least 3 users']
    }
    console.log(1)
    if (error.lengh > 0) {
      error.forEach((e, index) => {
        setTimeout(() => {
          createToast(e); // Create each toast with a delay
        }, index * 100); // Delay each toast by 1000ms (1 second) per index
      });
      return;
    }

    console.log(2)

    try {
      console.log('tried')

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }

      const { data } = await api.post(`/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map(u => u._id)),
        },
        config

      )

      setToggleFetch(!toggleFetch)
      setSelectedChat(data)
      createToast('New group chat created', 'success')
    } catch (error) {
      console.log(error.response.data)
      createToast('Failed to create group chat')
    }
  }

  const clearSelectedUsers = () => setSelectedUsers([user])


  const handleModalHide = () => {
    clearSelectedUsers()
    handleHide()
  }

  useEffect(() => {
    const modalElement = document.getElementById('groupChatModal')

    modalElement.addEventListener(
      'hidden.bs.modal',
      handleModalHide
    )

    return () => {
      modalElement.removeEventListener(
        'hidden.bs.modal',
        handleModalHide
      )
    }
  })


  useEffect(() => {
    setSelectedUsers([user])
  }, [])
  return (
    <div className='modal' id='groupChatModal' data-bs-backdrop='static' tabIndex={'-1'} aria-labelledby='staticBackdropLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Create Group Chat</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div className=' mb-2 row'>
              <div className='col-12 col-xl-6 mb-2 mb-xl-0'>
                <input type="text"
                  className='form-control'
                  placeholder='Search for a user to add'
                  value={search}
                  onChange={e => setSearch(e.target.value)} />
              </div>
              <div className='col-12 col-xl-6'>
                <input type="text"
                  className='form-control'
                  placeholder='Enter group name'
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)} />
              </div>
            </div>
            {selectedUsers && (
              <div className='d-flex flex-wrap'>
                {selectedUsers.map(u => <UserBadgeItem key={u._id} userInfo={u} handleClick={() => removeUser(u)}></UserBadgeItem>)}
              </div>
            )}
            {loading ? (
              <div>
                <i className='bi bi-arrow-clockwise spinner-icon'></i>
              </div>
            ) : (
              <div className='list-group d-flex align-items-center'>
                {searchResults.length > 0 ? (
                  searchResults.map(user => (
                    <UserListItem key={user._id} user={user} handleFunction={() => addUser(user)} forSideBar={false}></UserListItem>
                  ))
                ) : (
                  <div>No users found</div>
                )}
              </div>
            )
            }
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={() => clearSelectedUsers()}>Clear</button>
            <button type='button' className='btn btn-primary' onClick={() => CreateGroupChat()}>Create Group Chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupChatModal