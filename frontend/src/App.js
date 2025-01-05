import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router'
import ChatPage from './Pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignupPage from './Pages/SignupPage';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/chats" element={<PrivateRoute requiresAuth={true}><ChatPage /></PrivateRoute>} />
        <Route path="/signup" element={<PrivateRoute requiresAuth={false}><SignupPage /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute requiresAuth={false}><LoginPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
