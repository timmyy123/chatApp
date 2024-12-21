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
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        id="toastContainer"
        style={{ zIndex: 1055 }}
      >
        <div
          className="toast"
          id="errorToast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Error</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body" id="toastBody">
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/' Component={LoginPage}></Route>
        <Route path='/signup' Component={SignupPage}></Route>
        <Route path='/chats' Component={ChatPage}></Route>
      </Routes>
    </div>
  );
}

export default App;
