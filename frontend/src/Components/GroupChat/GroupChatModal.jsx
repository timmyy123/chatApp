import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UseApi from '../../hooks/UseApi'
import UserListItem from '../Users/UserListItem'
import UserBadgeItem from '../Users/UserBadgeItem'

const GroupChatModal = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState('')

  const api = UseApi()
  const { user } = ChatState()
  const handleSearch = async () => {
    if (!search.trim()) return

    try {
      setLoading(true)
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const { data } = await api.get(`/api/user?search=${search}`, config)
      setSearchResults(data)
      setLoading(false)
    } catch (error) {
      console.error(error.message)
      setLoading(false)

    }
  }

  const addUser = (user) => {
    if (!selectedUsers.some(u => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user))
  }

  useEffect(() => {
    if (search.trim()) {
      handleSearch()
    } else {
      setSearchResults([])
    }
  }, [search])
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
                {selectedUsers.map(u => <UserBadgeItem key={u._id} user={u} handleClick={() => removeUser(u)}></UserBadgeItem>)}
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
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  )
}

export default GroupChatModal