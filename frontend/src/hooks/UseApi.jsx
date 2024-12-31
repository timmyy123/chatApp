import axios from 'axios'
import { ChatState } from '../Components/Context/ChatProvider'

const UseApi = () => {
  const api = axios.create()
  const { createToast, logout } = ChatState()
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Interceptor error:', error.response)
      if ((error.message === 'Invalid token or user' || 
        error.message === 'Not authorized, no token')
        && error.response.status === 401) {
      logout()
      createToast(`${error.message}, please login again`)
      }
      return Promise.reject(error)
    }
  )
  return api
}

export default UseApi