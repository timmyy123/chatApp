import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router-dom'
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
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/chats'
          element=
          {
            <PrivateRoute>
              <ChatPage></ChatPage>
            </PrivateRoute>
          }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
