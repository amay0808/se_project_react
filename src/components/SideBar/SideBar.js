import React from "react";
import "./SideBar.css";
import avatar from "../../components/images/avatar.svg"; // Update the path to match your directory structure

function SideBar({ user, openEditProfileModal, onSignOut }) {
  if (!user) {
    return null;
  }

  const { name, avatar: userAvatar } = user;

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__info">
        <img
          src={userAvatar || avatar} // Use userAvatar from database if available, else use local avatar
          alt="User Avatar"
          className="sidebar-profile-avatar"
        />
        <h2 className="profile-sidebar__user-title">{name}</h2>
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
