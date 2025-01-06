import { ChatState } from '../Components/Context/ChatProvider'
import UseApi from './UseApi'

const UseSelectUser = () => {

  const { user, createToast, setSelectedChat, toggleFetch, setToggleFetch } = ChatState()
  const api = UseApi()
  const selectUser = async (userId) => {
    if (user._id === userId) {
      createToast("Can't chat with yourself")
      return
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await api.post('/api/chat', { userId }, config)
      setToggleFetch(!toggleFetch)
      setSelectedChat(data)
    } catch (error) {
      createToast('Failed to select user')
      console.log(error.message)
    }
  }
  return (
    selectUser
  )
}

export default UseSelectUser