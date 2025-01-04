import React, { useEffect, useRef } from 'react';
import { ChatState } from '../Context/ChatProvider';

const UserAvatar = ({ userInfo, clickAble = false, scale = 1 }) => {
  const { setProfileUser } = ChatState();
  const avatarRef = useRef(null);

  const handleClick = () => {
    if (clickAble) {
      setProfileUser(userInfo);
    }
  };

  return (
    <div
      ref={avatarRef}
      type={clickAble ? 'button' : undefined}
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      data-bs-toggle={clickAble ? 'modal' : undefined}
      data-bs-target={clickAble ? '#profileModal' : undefined}
      style={{ width: `${40 * scale}px`, height: `${40 * scale}px`, borderRadius: '50%', fontSize: `${18 * scale}px` }}
      onClick={handleClick}
    >
      {userInfo.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;