import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Components/Context/ChatProvider';

const useAuthNavigate = () => {
  const { user } = ChatState()
  const navigate = useNavigate();

  const authNavigate = useCallback(
    (path, options = {}) => {
      if (path === '/' || path === '/signup') {
        // Allow navigation to login or signup only if not logged in
        if (!user) {
          navigate(path, options);
        } else {
          navigate('/chats', { replace: true }); // Redirect logged-in users to chats
        }
      } else if (path === '/chats') {
        // Allow navigation to chats only if logged in
        if (user) {
          navigate(path, options);
        } else {
          navigate('/', { replace: true }); // Redirect unauthenticated users to login
        }
      } else {
        // For other paths, fallback to normal navigation
        navigate(path, options);
      }
    },
    [user, navigate]
  );

  return { user, isAuthenticated: !!user, authNavigate };
};

export default useAuthNavigate;
