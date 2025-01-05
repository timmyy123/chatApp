import React from "react";
import UserAvatar from "./Users/UserAvatar";
import { ChatState } from "./Context/ChatProvider";
import styles from './Style.module.css'

const TopBar = () => {
  const { user } = ChatState();
  return (
    <div className={`row navbar p-1 ${styles.topBar}`} >
      <div className="col-3">
        <button 
        type="button"
        className="btn btn-outline-info mx-2"
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
        <h1 className={`text-success ${styles.title}`}>Ti-Talk</h1>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-end">
        {user && <UserAvatar userInfo={user} clickAble={true}/>}
      </div>
    </div>
  );
};

export default TopBar;
