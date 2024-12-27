import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ChatState } from './Context/ChatProvider';

const PrivateRoute = ({ children, requiresAuth = true }) => {
  const { user } = ChatState();
  const location = useLocation(); // Get the current location

  if (requiresAuth && !user) {
    // Redirect to the login page if authentication is required but the user is not logged in
    return <Navigate to="/" replace />;
  }

  if (!requiresAuth && user) {
    // Redirect to the previous page or default to "/chats" if no previous page is stored
    const previousPage = location.state?.from?.pathname || "/chats";
    return <Navigate to={previousPage} replace />;
  }

  // Default: Allow access to the children
  return children;
};

export default PrivateRoute;
