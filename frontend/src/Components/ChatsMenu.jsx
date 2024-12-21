import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "./Context/ChatProvider";
import { getSender } from "./config/ChatLogics";

const ChatsMenu = ({ fetchAgain }) => {
  const [loading, setLoading] = useState(false);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load the chats");
      alert("Error Occurred: Failed to Load the chats");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div
      className={`d-flex flex-column align-items-center p-3 bg-white vh-100`}
      style={{
        width: "100%",
        maxWidth: "400px",
        borderRadius: "0.5rem",
        border: "1px solid #dee2e6",
      }}
    >
      {/* Header */}
      <div
        className="d-flex w-100 justify-content-between align-items-center mb-3"
        style={{ fontSize: "1.5rem", fontFamily: "Work Sans" }}
      >
        <span>My Chats</span>
      </div>

      {/* Chat List */}
      <div
        className="d-flex flex-column p-3"
        style={{
          background: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "0.5rem",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`d-flex flex-column p-2 mb-2 rounded ${
                  selectedChat === chat ? "bg-info text-white" : "bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedChat(chat)}
              >
                <strong>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </strong>
                {chat.latestMessage && (
                  <small className="text-muted">
                    <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                    {chat.latestMessage.content.length > 50
                      ? `${chat.latestMessage.content.substring(0, 51)}...`
                      : chat.latestMessage.content}
                  </small>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">No chats available</div>
        )}
      </div>
    </div>
  );
};

export default ChatsMenu;
