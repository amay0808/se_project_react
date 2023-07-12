import React from "react";
import "./SideBar.css";

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
          className="profile-sidebar__user-avatar"
          src={require("../images/avatar.svg").default}
          alt="User Avatar"
        />
      </div>
    </div>
  );
}

export default SideBar;
