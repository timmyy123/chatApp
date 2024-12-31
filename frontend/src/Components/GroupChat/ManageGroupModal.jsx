import React, { useEffect, useState } from 'react'
import useSearchUser from '../../hooks/useSearchUser'
import UseApi from '../../hooks/UseApi'
import UserListItem from '../Users/UserListItem'
import UserBadgeItem from '../Users/UserBadgeItem'
import { ChatState } from '../Context/ChatProvider'

const ManageGroupModal = ({ toggleFetch, setToggleFetch }) => {
  const [existingUsers, setExistingUsers] = useState([])
  const [updateGroupName, setUpdateGroupName] = useState('')

  const { search, setSearch, searchResults, loading, setLoading, handleHide } = useSearchUser('/api/user')
  const { user, selectedChat, setSelectedChat, createToast } = ChatState()
  const api = UseApi()

  const addUser = async (userToAdd) => {
    if (existingUsers.some(u => u._id === userToAdd._id)) {
      return createToast('User already exist')
    }
    try {
      setLoading(true)
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const { data } = await api.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id
        },
        config
      )
      setSelectedChat(data)
      setToggleFetch(!toggleFetch)
      setLoading(false)
    } catch (error) {
      createToast('Failed to add user')
      console.log(error.message)
    }
  }

  const removeUser = async (userToRemove) => {
    if (existingUsers.length < 4) {
      return createToast("Group needs at least 3 users, can't remove more user")
    }

    if (userToRemove._id === user._id) {
      return createToast("Admin can't be removed")
    }

    if (!existingUsers.some(u => u._id === userToRemove._id)) {
      return createToast("User doesn't exist in group")
    }
    try {
      setLoading(true)
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const { data } = await api.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id
        },
        config
      )
      setSelectedChat(data)
      setToggleFetch(!toggleFetch)
      setLoading(false)
    } catch (error) {
      createToast('Failed to remove user')
      console.log(error.message)
    }
  }

  const renameGroup = async () => {
    if (!updateGroupName) return

    if (updateGroupName === selectedChat.chatName) {
      return createToast('Choose a different name')
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }

      const { data } = await api.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: updateGroupName
        },
        config
      )

      setSelectedChat(data)
      setToggleFetch(!toggleFetch)
    } catch (error) {
      createToast('Failed to rename group')
      console.error(error.message)
    }
  }

  useEffect(() => {
    setExistingUsers(selectedChat.users)
  }, [selectedChat])

  return (
    <div className='modal' id='ManageGroupModal' data-bs-backdrop='static' tabIndex={'-1'} aria-labelledby='manageGroupLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='groupChatLabel'>Manage Group Chat</h1>
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
                  value={updateGroupName}
                  onChange={e => setUpdateGroupName(e.target.value)} />
              </div>
            </div>
            {existingUsers && (
              <div className='d-flex flex-wrap'>
                {existingUsers.map(u => <UserBadgeItem key={u._id} userInfo={u} handleClick={() => removeUser(u)}></UserBadgeItem>)}
              </div>
            )}
            {loading ? (
              <div>
                <i className='bi bi-arrow-clockwise spinner-icon'></i>
              </div>
            ) : (
              <div className='list-group d-flex align-items-center'>
                {searchResults.length > 0 ? (
                  searchResults.map(user => {!existingUsers.some(u => u._id === user._id)&&(
                    <UserListItem key={user._id} user={user} handleFunction={() => addUser(user)} forSideBar={false}></UserListItem>
                  )})
                ) : (
                  <div>No users found</div>
                )}
              </div>
            )
            }
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={() => renameGroup()}>Update Group Name</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageGroupModal