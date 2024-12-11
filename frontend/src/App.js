import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatPage from './Pages/ChatPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage}></Route>
        <Route path='/chats' Component={ChatPage}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
