import React from "react";
import "./SideBar.css";
import avatar from "../../components/images/avatar.svg"; // Update the path to match your directory structure

function SideBar({ user }) {
  if (!user) {
    return null;
  }

  const { username } = user;

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__info">
        <h2 className="profile-sidebar__user-title">{username}</h2>
        <img
          src={avatar}
          alt="User Avatar"
          className="profile-sidebar__user-avatar"
        />
      </div>
    </div>
  );
}

export default SideBar;
