import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Update the path accordingly

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      onLogin({ email, password });
      onClose();
    } catch (error) {
      console.error("Failed to login", error);
      // Handle error accordingly
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleLogin}
      title="Login"
      name="login"
      buttonText="Login"
    >
      <label className="form__label">
        <strong>Email</strong>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form__input"
        />
      </label>
      <label className="form__label">
        <strong>Password</strong>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
