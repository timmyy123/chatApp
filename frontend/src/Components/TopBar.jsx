import React from "react";
import UserAvatar from "./UserAvatar";
import { ChatState } from "./Context/ChatProvider";

const TopBar = () => {
  const { user } = ChatState();
  return (
    <div className="row navbar p-1" style={{ backgroundColor: "#edbee8", height: '8vh', minHeight: '50px'}}>
      <div className="col-3">
        <button 
        type="button"
        className="btn btn-danger mx-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#searchUserOffcanvas"
          aria-controls="searchUserOffcanvas"
        >
          <i
            className="bi bi-search"

            style={{ cursor: "pointer" }}
          ></i>
        </button>
      </div>
      <div className="col-6 text-center">
        <h3>TiTalk</h3>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-end">
        {user && <UserAvatar userInfo={user}/>}
      </div>
    </div>
  );
};

export default TopBar;
