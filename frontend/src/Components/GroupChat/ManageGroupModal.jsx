import React, { useEffect, useState } from 'react';
import useSearchUser from '../../hooks/useSearchUser';
import UseApi from '../../hooks/UseApi';
import { ChatState } from '../Context/ChatProvider';
import GroupChatModalContent from './GroupChatModalContent';

const ManageGroupModal = () => {
  const [existingUsers, setExistingUsers] = useState([]);
  const [updateGroupName, setUpdateGroupName] = useState('');

  const { search, setSearch, searchResults, loading, setLoading, handleHide } = useSearchUser('/api/user');
  const { user, selectedChat, setSelectedChat, createToast, toggleFetch, setToggleFetch } = ChatState();
  const api = UseApi();

  const addUser = async (userToAdd) => {
    if (existingUsers.some(u => u._id === userToAdd._id)) {
      return createToast('User already exist');
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await api.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id
        },
        config
      );
      setSelectedChat(data);
      setToggleFetch(!toggleFetch);
      setLoading(false);
    } catch (error) {
      createToast('Failed to add user');
      console.log(error.response.data.message||'Unexpected Error');
      setLoading(false);
    }
  };

  const removeUser = async (userToRemove) => {
    if (existingUsers.length < 4) {
      return createToast("Group needs at least 3 users, can't remove more user");
    }

    if (userToRemove._id === user._id) {
      return createToast("You are admin, can't remove yourself");
    }

    if (!existingUsers.some(u => u._id === userToRemove._id)) {
      return createToast("User doesn't exist in group");
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await api.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id
        },
        config
      );
      setSelectedChat(data);
      setToggleFetch(!toggleFetch);
      setLoading(false);
    } catch (error) {
      createToast('Failed to remove user');
      console.log(error.response.data.message||'Unexpected Error');
      setLoading(false);
    }
  };

  const renameGroup = async () => {
    if (!updateGroupName) return;

    if (updateGroupName === selectedChat.chatName) {
      return createToast('Choose a different name');
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const { data } = await api.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: updateGroupName
        },
        config
      );

      setSelectedChat(data);
      setUpdateGroupName('')
      setToggleFetch(!toggleFetch);
    } catch (error) {
      createToast('Failed to rename group');
      console.error(error.response.data.message||'Unexpected Error');
    }
  };

  const handleReset = () => {
    handleHide()
    setUpdateGroupName('')
  };

  useEffect(() => {
    const modalElement = document.getElementById('ManageGroupModal');


    modalElement.addEventListener('hidden.bs.modal', handleReset);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleReset);
    };
  }, [handleHide, selectedChat, setUpdateGroupName, setExistingUsers]);

  useEffect(() => {
    setExistingUsers(selectedChat.users);
  }, [selectedChat]);

  return (
    <div className='modal fade' id='ManageGroupModal' data-bs-backdrop='static' tabIndex={'-1'} aria-labelledby='manageGroupLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='manageGroupLabel'>Manage Group Chat</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <GroupChatModalContent
              search={search}
              setSearch={setSearch}
              searchResults={searchResults}
              loading={loading}
              selectedUsers={existingUsers}
              removeUser={removeUser}
              addUser={addUser}
              groupName={updateGroupName}
              setGroupName={setUpdateGroupName}
              handleAction={renameGroup}
              handleReset={handleReset}
              submitActionLabel='Update Group Name'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGroupModal;