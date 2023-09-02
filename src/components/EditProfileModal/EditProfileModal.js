import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="input__group">
        <label className="input__label">Name*</label>
        <input
          className="form__input"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="input__group">
        <label className="input__label">Avatar</label>
        <input
          className="form__input"
          type="text"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </div>
    </ModalWithForm>
  );
}
