import React, { useState } from "react";
import ChatsMenu from "../Components/ChatsMenu";
import SearchUser from "../Components/SearchUser";
import TopBar from "../Components/TopBar";
import { ChatState } from "../Components/Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  const { user } = ChatState();

  return (
    <main style={{ width: "100%" }}>
      <TopBar />
      {/* Always render SearchUser */}
      {user && <SearchUser />}
      <div className="row">
        <div className="col-4">
          {user&&<ChatsMenu fetchAgain={fetchAgain}></ChatsMenu>}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
