import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UseApi from '../../hooks/UseApi'

const GroupChatModal = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])

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

  const addUser = (userId) => {
    setSelectedUsers([...selectedUsers, userId])
  }

  const removeUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== userId))
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
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Find Users to Add</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>

          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  )
}

export default GroupChatModal