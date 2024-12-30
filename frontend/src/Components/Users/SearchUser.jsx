import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserListItem from './UserListItem'
import useSearchUser from '../../hooks/useSearchUser'
import UseApi from '../../hooks/UseApi'

const SearchUser = ({toggleFetch, setToggleFetch}) => {
  const {search, setSearch, searchResults, loading, handleHide} = useSearchUser('/api/user')
  const { user, chats, setSelectedChat, createToast } = ChatState()
  const api = UseApi()

  const selectUser = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await api.post('/api/chat', {userId}, config)
      if(!chats.find((chat) => chat._id === data._id)) setToggleFetch(!toggleFetch)
      setSelectedChat(data)
    } catch (error) {
      createToast('Failed to select user')
      console.log(error.message)
    }
  }

  useEffect(() => {
    const offcanvasElement = document.getElementById('searchUserOffcanvas')
    

    offcanvasElement.addEventListener(
      'hidden.bs.offcanvas',
      handleHide
    )

    return () => {
      offcanvasElement.removeEventListener(
        'hidden.bs.offcanvas',
        handleHide
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
                <UserListItem key={user._id} user={user} handleFunction={() => selectUser(user._id)} forSideBar={true}></UserListItem>
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