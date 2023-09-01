import React from "react";
import "./SideBar.css";
import avatar from "../../components/images/avatar.svg"; // Update the path to match your directory structure

function SideBar({ user, openEditProfileModal, onSignOut }) {
  if (!user) {
    return null;
  }

  const { username } = user;

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__info">
        <img
          src={avatar}
          alt="User Avatar"
          className="profile-sidebar__user-avatar"
        />
        <h2 className="profile-sidebar__user-title">{username}</h2>
      </div>
      <button className="edit-profile-button" onClick={openEditProfileModal}>
        Change profile data
      </button>
      <button className="sign-out-button" onClick={onSignOut}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
