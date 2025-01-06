import axios from 'axios'
import { ChatState } from '../Components/Context/ChatProvider'

const UseApi = () => {
  const api = axios.create()
  const { createToast, logout } = ChatState()
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Interceptor error:', error.response)
      console.log(error.response.data)
      if ((error.response.data === 'Invalid token or user' || 
        error.response.data === 'Not authorized, no token')
        && error.response.status === 401) {
      logout()
      createToast(`${error.response.data}, please login again`)
      }
      return Promise.reject(error)
    }
  )
  return api
}

export default UseApi