import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(JSON.parse(sessionStorage.getItem('selectedChat'))||undefined);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo'))||undefined);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [toasts, setToasts] = useState([]); // For managing toasts
  const [profileUser, setProfileUser] = useState()
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'))||undefined;
  //   setUser(userInfo);
  //   if (!userInfo) navigate('/');
  // }, [navigate]);

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(undefined);
    navigate('/');
    setSelectedChat(undefined);
    setProfileUser(undefined)
    setNotification([]);
    setChats([]);
  
    // Clear user data from localStorage
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('selectedChat');
  
    // Redirect to login page
  };
  
  useEffect(() => {
    if (selectedChat) {
      sessionStorage.setItem('selectedChat', JSON.stringify(selectedChat))
    } else {
      sessionStorage.removeItem('selectedChat')
    }
  }, [selectedChat])

  // Function to create a toast
  const createToast = (message, type = 'danger') => {
    const id = Date.now(); // Unique ID for each toast

    const toast = (
      <div
        key={id}
        className={`toast show align-items-center text-bg-${type} border-0 mb-2`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          zIndex: 1051,
        }}
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={() => removeToast(id)}
          ></button>
        </div>
      </div>
    );

    // Add toast to the state
    setToasts((prevToasts) => [...prevToasts, { id, toast }]);

    // Auto-remove the toast after 3 seconds
    setTimeout(() => removeToast(id), 3000);
  };

  // Function to remove a specific toast
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        profileUser,
        setProfileUser,
        notification,
        setNotification,
        chats,
        setChats,
        createToast, // Expose the toast creation function
        logout
      }}
    >
      {children}

      {/* Toast container positioned at the top */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{
          zIndex: 1051,
          maxWidth: '400px',
        }}
      >
        {toasts.map((t) => t.toast)}
      </div>
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
