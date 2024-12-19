import React from "react";

const SearchUser = ({ onClose }) => {
  return (
    <div className="search-user">
      <div>
        <input type="text" placeholder="Search users..." />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchUser;
