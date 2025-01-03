import React, { useEffect, useRef, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import UseApi from '../../hooks/UseApi';
import useSearchUser from '../../hooks/useSearchUser';
import GroupChatModalContent from './GroupChatModalContent';

const GroupChatModal = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const closeButtonRef = useRef(null); // Ref for the close button

  const { search, setSearch, searchResults, loading, handleHide } = useSearchUser('/api/user');
  const api = UseApi();
  const { user, createToast, setSelectedChat,toggleFetch, setToggleFetch } = ChatState();

  const addUser = (user) => {
    if (!selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (userToRemove) => {
    if (userToRemove._id === user._id) return;
    setSelectedUsers(selectedUsers.filter((u) => u !== userToRemove));
  };

  const createGroupChat = async () => {
    if (!groupName) {
      createToast('Please enter group name');
      return;
    }

    if (selectedUsers.length < 3) {
      createToast('Group needs at least 3 users');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await api.post(
        '/api/chat/group',
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setToggleFetch(!toggleFetch);
      setSelectedChat(data);
      createToast('New group chat created', 'success');

      // Programmatically click the close button
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    } catch (error) {
      createToast('Failed to create group chat');
    }
  };

  const handleReset = () => {
    handleHide();
    setGroupName('');
    setSelectedUsers([user]);
  };

  useEffect(() => {
    const modalElement = document.getElementById('groupChatModal');

    modalElement.addEventListener('hidden.bs.modal', handleReset);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleReset);
    };
  }, [handleReset]);

  useEffect(() => {
    setSelectedUsers([user]);
  }, [user]);

  return (
    <div
      className='modal fade'
      id='groupChatModal'
      data-bs-backdrop='static'
      tabIndex={'-1'}
      aria-labelledby='groupChatLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='groupChatLabel'>
              Create Group Chat
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              ref={closeButtonRef} // Attach the ref to the close button
            ></button>
          </div>
          <div className='modal-body'>
            <GroupChatModalContent
              search={search}
              setSearch={setSearch}
              searchResults={searchResults}
              loading={loading}
              selectedUsers={selectedUsers}
              removeUser={removeUser}
              addUser={addUser}
              groupName={groupName}
              setGroupName={setGroupName}
              handleAction={createGroupChat}
              handleReset={handleReset}
              submitActionLabel='Create Group Chat'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
