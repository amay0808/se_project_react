import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Return a new Promise
    return new Promise((resolve, reject) => {
      onSignup({ email, password, name, avatar })
        .then(() => {
          onClose();
          resolve(); // Resolve the Promise when onSignup is successful
        })
        .catch((error) => {
          console.error("Signup failed:", error);
          reject(error); // Reject the Promise when onSignup fails
        });
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleRegister}
      title="Sign Up"
      name="signup"
      buttonText="Next"
    >
      <label className="form__label">
        <strong>Email*</strong>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form__input"
        />
      </label>
      <label className="form__label">
        <strong>Password*</strong>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form__input"
        />
      </label>
      <label className="form__label">
        <strong>Name</strong>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="form__input"
        />
      </label>
      <label className="form__label">
        <strong>Avatar URL</strong>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
          className="form__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
