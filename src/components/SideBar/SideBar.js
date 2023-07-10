import "./SideBar.css";
import React from "react";

function SideBar({ user }) {
  const { username, avatar } = user;

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__info">
        <h2 className="profile-sidebar__user-title">{username}</h2>
        <img
          className="profile-sidebar__user-avatar"
          src={avatar}
          alt="User Avatar"
        />
      </div>
    </div>
  );
}

export default SideBar;
