import React from "react";
import UserAvatar from "./UserAvatar";

const TopBar = () => {
  return (
    <div className="row navbar" style={{ backgroundColor: "#18bfec" }}>
      <div className="col-3">
        <button 
        type="button"
        className="btn btn-primary mx-2"
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
      <div className="col-3 d-flex align-items-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default TopBar;
