import './App.css';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import SignupPage from './Pages/SignupPage';
import ChatProvider from './Components/Context/ChatProvider';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path='/' Component={LoginPage}></Route>
            <Route path='/signup' Component={SignupPage}></Route>
            <Route path='/chats' Component={ChatPage}></Route>
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
