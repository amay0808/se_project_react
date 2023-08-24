import React from "react";

function SideBar({ user }) {
  const { username, avatar } = user;

  // Function to render the avatar or a placeholder
  const renderAvatar = () => {
    if (avatar) {
      return <img src={avatar} alt={`${username}'s avatar`} />;
    } else {
      return (
        <div className="avatar-placeholder">
          {username ? username.charAt(0).toUpperCase() : ""}
        </div>
      );
    }
  };

  return (
    <div className="sidebar">
      <div className="profile-avatar">{renderAvatar()}</div>
      {/* Other sidebar content */}
    </div>
  );
}

export default SideBar;
