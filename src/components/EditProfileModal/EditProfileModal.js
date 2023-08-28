import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api";

export default function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser ? currentUser.avatarUrl : ""
  );

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await api.updateProfile({ name, avatarUrl });
      setCurrentUser(updatedUser);
      onClose();
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <div className="input-group">
            <label>Name</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div className="input-group">
            <label>Avatar URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={handleAvatarUrlChange}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    )
  );
}
