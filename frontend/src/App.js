import './App.css';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
  <div className='App'>

    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage}></Route>
        <Route path='/chats' Component={ChatPage}></Route>
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;
