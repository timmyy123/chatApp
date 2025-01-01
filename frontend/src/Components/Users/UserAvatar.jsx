import React, { useEffect, useRef } from 'react';
import { ChatState } from '../Context/ChatProvider';

const UserAvatar = ({ userInfo, clickAble = false, scale = 1 }) => {
  const { profileUser, setProfileUser } = ChatState();
  const avatarRef = useRef(null);

  const handleClick = () => {
    console.log('clicked');
    if (clickAble) {
      setProfileUser(userInfo);
    }
  };

  useEffect(() => {
    console.log(!avatarRef.current, avatarRef.current.getAttribute('data-bs-toggle'), avatarRef.current.getAttribute('data-bs-target'), !profileUser, userInfo.email)
    if (clickAble && profileUser && !avatarRef.current.getAttribute('data-bs-toggle') && !avatarRef.current.getAttribute('data-bs-target')) {
      if (profileUser._id === userInfo._id) {
        avatarRef.current.setAttribute('data-bs-toggle', 'modal');
        avatarRef.current.setAttribute('data-bs-target', '#profileModal');
        avatarRef.current.click(); // Programmatically click the avatar to open the modal
        console.log('reclicked', !profileUser)
      }
    } else if (avatarRef.current && !profileUser) {
      avatarRef.current.removeAttribute('data-bs-toggle');
      avatarRef.current.removeAttribute('data-bs-target');
    }

    return () => {
      setProfileUser(undefined)
    }
  }, [profileUser, clickAble, userInfo]);

  return (
    <div
      ref={avatarRef}
      type={clickAble ? 'button' : undefined}
      className='mx-2 justify-content-center align-items-center d-flex bg-dark-subtle'
      style={{ width: `${40*scale}px`, height: `${40*scale}px`, borderRadius: '50%' }}
      onClick={handleClick}
    >
      {userInfo.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;