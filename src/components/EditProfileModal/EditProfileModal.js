import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api"; // Ensure this is the correct path

// Accept handleSubmit as a new prop
export default function EditProfileModal({ isOpen, onClose, handleSubmit }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [editedName, setEditedName] = useState(
    currentUser ? currentUser.name : ""
  );
  const [editedAvatarUrl, setEditedAvatarUrl] = useState(
    currentUser ? currentUser.avatar : ""
  );

  useEffect(() => {
    setEditedName(currentUser ? currentUser.name : "");
    setEditedAvatarUrl(currentUser ? currentUser.avatar : "");
  }, [currentUser]);

  const handleNameChange = (e) => setEditedName(e.target.value);
  const handleAvatarUrlChange = (e) => setEditedAvatarUrl(e.target.value);

  const customHandleSubmit = async (e) => {
    e.preventDefault();

    // Use passed handleSubmit function to wrap existing logic
    handleSubmit(async () => {
      try {
        const updatedUser = await api.updateProfile({
          name: editedName,
          avatarUrl: editedAvatarUrl,
        });

        setCurrentUser(updatedUser); // Update the context with the new user data
        onClose(); // Close the modal
      } catch (error) {
        console.log("Error updating profile:", error);
      }
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={customHandleSubmit} // Use customHandleSubmit instead
    >
      <div className="input__group">
        <label className="input__label">Name*</label>
        <input
          className="form__input"
          type="text"
          value={editedName}
          onChange={handleNameChange}
        />
      </div>
      <div className="input__group">
        <label className="input__label">Avatar</label>
        <input
          className="form__input"
          type="text"
          value={editedAvatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </div>
    </ModalWithForm>
  );
}
