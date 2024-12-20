import './App.css';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import SignupPage from './Pages/SignupPage';
import ChatProvider from './Components/Context/ChatProvider';


function App() {
  return (
    <div className='App'>

          <Routes>
            <Route path='/' Component={LoginPage}></Route>
            <Route path='/signup' Component={SignupPage}></Route>
            <Route path='/chats' Component={ChatPage}></Route>
          </Routes>
    </div>
  );
}

export default App;
