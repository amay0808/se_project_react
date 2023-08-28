import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await onLogin({ email, password });
      onClose();
      history.push("/profile");
    } catch (error) {
      console.error("Failed to login", error);
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
