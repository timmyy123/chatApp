import React, { useState } from "react";
import ChatsMenu from "../Components/Chats/ChatsMenu";
import SearchUser from "../Components/Users/SearchUser";
import TopBar from "../Components/TopBar";
import { ChatState } from "../Components/Context/ChatProvider";
import ChatWindow from "../Components/Chats/ChatWindow";
import GroupChatModal from "../Components/GroupChat/GroupChatModal";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  

  const { user, selectedChat } = ChatState();

  return (
    <main className="w-100 container-fluid vh-100 d-flex flex-column justify-content-center ">
      <TopBar />
      {/* Always render SearchUser */}
      {user && <SearchUser />}
      <GroupChatModal></GroupChatModal>
      {user && (
        <div className="row no-gutters">
          <div className={`col-12 col-xl-3 p-0 ${selectedChat ? 'd-none d-xl-block' : ''}`}>
            <ChatsMenu fetchAgain={fetchAgain}></ChatsMenu>
          </div>
          <div className={`col-12 col-xl-9 p-0 ${selectedChat ? '' : 'd-none d-xl-block'}`}>
            <ChatWindow fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}></ChatWindow>
          </div>
        </div>
      )}


    </main>
  );
};

export default ChatPage;
