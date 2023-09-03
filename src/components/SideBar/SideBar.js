import React from "react";
import "./SideBar.css";
import avatar from "../../components/images/avatar.svg";
import { useHistory } from "react-router-dom"; //

function SideBar({ user, openEditProfileModal, onSignOut }) {
  const history = useHistory();

  if (!user) {
    return null;
  }

  const { name, avatar: userAvatar } = user;

  const handleSignOut = () => {
    onSignOut();
    history.push("/"); // <-- Redirect to main page
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__info">
        <img
          src={userAvatar || avatar}
          alt="User Avatar"
          className="sidebar-profile-avatar"
        />
        <h2 className="profile-sidebar__user-title">{name}</h2>
      </div>
      <button className="edit-profile-button" onClick={openEditProfileModal}>
        Change profile data
      </button>
      <button className="sign-out-button" onClick={handleSignOut}>
        {" "}
        {/* Updated */}
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
