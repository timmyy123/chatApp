import { ChatState } from '../Components/Context/ChatProvider'
import UseApi from './UseApi'

const UseLeaveGroup = () => {
  const api = UseApi()
  const { selectedChat, setSelectedChat, user, createToast, toggleFetch, setToggleFetch } = ChatState()

  const leaveGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await api.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user._id
        },
        config
      );
      setSelectedChat(null)
      createToast(`You left the group ${data.chatName}`, 'success')
      setToggleFetch(!toggleFetch)

    } catch (error) {
      createToast('Failed to leave group')
      console.error(error.message)
    }
  }
  return leaveGroup
}

export default UseLeaveGroup