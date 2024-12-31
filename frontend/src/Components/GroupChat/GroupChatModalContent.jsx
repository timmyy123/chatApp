import React from 'react';
import UserListItem from '../Users/UserListItem';
import UserBadgeItem from '../Users/UserBadgeItem';

const GroupChatModalContent = ({
  search,
  setSearch,
  searchResults,
  loading,
  selectedUsers,
  removeUser,
  addUser,
  groupName,
  setGroupName,
  handleAction,
  handleReset,
  submitActionLabel
}) => {
  return (
    <>
      <div className='mb-2 row'>
        <div className='col-12 col-xl-6 mb-2 mb-xl-0'>
          <input
            type='text'
            className='form-control'
            placeholder='Search for a user to add'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className='col-12 col-xl-6'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter group name'
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
      </div>
      {selectedUsers && (
        <div className='d-flex flex-wrap'>
          {selectedUsers.map(u => (
            <UserBadgeItem key={u._id} userInfo={u} handleClick={() => removeUser(u)} />
          ))}
        </div>
      )}
      {loading ? (
        <div>
          <i className='bi bi-arrow-clockwise spinner-icon'></i>
        </div>
      ) : (
        <div className='list-group d-flex align-items-center'>
          {searchResults.length > 0 ? (
            searchResults.map(user => 
              !selectedUsers.some(u=> u._id === user._id)&&<UserListItem key={user._id} user={user} handleFunction={() => addUser(user)} forSideBar={false} />
            )
          ) : (
            <div>No users found</div>
          )}
        </div>
      )}
      <div className='modal-footer'>
        <button type='button' className='btn btn-secondary' onClick={handleReset}>
          Reset
        </button>
        <button type='button' className='btn btn-primary' onClick={handleAction}>
          {submitActionLabel}
        </button>
      </div>
    </>
  );
};

export default GroupChatModalContent;