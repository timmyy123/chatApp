import React, { useEffect } from 'react'
import { ChatState } from './Context/ChatProvider'
import axios from 'axios'
import UserListItem from './UserListItem'

const SearchUser = () => {
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const { user, chats, setChats, setSelectedChat, createToast } = ChatState()

  const handleSearch = async () => {
    if (!search.trim()) return

    try {
      setLoading(true)
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setSearchResults(data)
      setLoading(false)
    } catch (error) {
      console.error(error.message)
      setLoading(false)

    }
  }

  const selectUser = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.post('/api/chat', {userId}, config)
      if(!chats.find((chat) => chat._id === data._id)) setChats([...chats, data])
      setSelectedChat(data)
    } catch (error) {
      createToast('Failed to select user')
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (search.trim()) {
      handleSearch()
    } else {
      setSearchResults([])
    }
  }, [search])

  const handleOffcanvasHide = () => {
    setSearch('')
    setSearchResults([])
  }
  useEffect(() => {
    const offcanvasElement = document.getElementById('searchUserOffcanvas')
    

    offcanvasElement.addEventListener(
      'hidden.bs.offcanvas',
      handleOffcanvasHide
    )

    return () => {
      offcanvasElement.removeEventListener(
        'hidden.bs.offcanvas',
        handleOffcanvasHide
      )
    }
  })
  return (
    <div
      id='searchUserOffcanvas'
      className='offcanvas offcanvas-start col-4'
      tabIndex={-1}
      aria-labelledby='searchUserOffcanvasLabel'
    >
      <div className='offcanvas-header'>
        <h5 id='searchUserOffcanvasLabel'>Search Users</h5>
        <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
      </div>
      <div className='offcanvas-body'>
        <div className='input-group mb-3'>
          <input type="text"
            className='form-control'
            placeholder='Search by name or email'
            value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? (
          <div>
            <i className='bi bi-arrow-clockwise spinner-icon'></i>
          </div>
        ) : (
          <div className='list-group'>
            {searchResults.length > 0 ? (
              searchResults.map(user => (
                <UserListItem key={user._id} user={user} handleFunction={() => selectUser(user._id)}></UserListItem>
              ))
            ) : (
              <div>No users found</div>
            )}
          </div>
        )
        }
      </div>
    </div>
  )
}

export default SearchUser