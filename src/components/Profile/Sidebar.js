// Sidebar.js
import React from "react";

function Sidebar({ user }) {
  const { username, avatar } = user;

  return (
    <div>
      <h2>{username}</h2>
      <img src={avatar} alt="User Avatar" />
    </div>
  );
}

export default Sidebar;
