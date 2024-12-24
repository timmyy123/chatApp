import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from 'react-router-dom'
import ChatPage from './Pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignupPage from './Pages/SignupPage';
import { ChatState } from './Components/Context/ChatProvider';


function App() {
  const { error, setError} = ChatState()
  return (
    <div className='App'>
      {error && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1051 }}
        >
          <div
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{error}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setError(null)} // Dismiss the toast
              ></button>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path='/' Component={LoginPage}></Route>
        <Route path='/signup' Component={SignupPage}></Route>
        <Route path='/chats' Component={ChatPage}></Route>
      </Routes>
    </div>
  );
}

export default App;
