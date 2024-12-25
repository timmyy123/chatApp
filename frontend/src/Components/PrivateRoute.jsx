import React from 'react';
import { Navigate } from 'react-router-dom';
import { ChatState } from './Context/ChatProvider';

const PrivateRoute = ({ children }) => {
  console.log(children)
  const { user } = ChatState();

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;