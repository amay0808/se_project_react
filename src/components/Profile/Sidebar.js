import "../Profile/sidebar.css";
import React from "react";

function Sidebar({ user }) {
  const { username, avatar } = user;

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <h2 className="sidebar__user-title">{username}</h2>
        <img className="sidebar__user-avatar" src={avatar} alt="User Avatar" />
      </div>
    </div>
  );
}
export default Sidebar;
