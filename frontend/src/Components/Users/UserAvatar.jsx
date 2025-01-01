import React, { useEffect, useRef } from 'react';
import { ChatState } from '../Context/ChatProvider';

const UserAvatar = ({ userInfo, clickAble = true }) => {
  const { profileUser, setProfileUser } = ChatState();
  const avatarRef = useRef(null);

  const handleClick = () => {
    console.log('clicked');
    if (clickAble) {
      setProfileUser(userInfo);
    }
  };

  useEffect(() => {
    if (clickAble && profileUser && avatarRef.current) {
      if (profileUser._id === userInfo._id) {
        avatarRef.current.setAttribute('data-bs-toggle', 'modal');
        avatarRef.current.setAttribute('data-bs-target', '#profileModal');
        avatarRef.current.click(); // Programmatically click the avatar to open the modal
      }
    } else if (avatarRef.current && !profileUser) {
      avatarRef.current.removeAttribute('data-bs-toggle');
      avatarRef.current.removeAttribute('data-bs-target');
    }
  }, [profileUser, clickAble, userInfo]);

  return (
    <div
      ref={avatarRef}
      type={clickAble ? 'button' : undefined}
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      onClick={handleClick}
    >
      {userInfo.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;